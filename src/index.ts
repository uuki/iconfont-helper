import path from "path";
import fs from "fs-extra";
import * as YAML from "yaml";
import { copyTemplate } from "./utils";
import { log } from "./utils/log";

export type IconfontHelperOptions = {
  /** A value of `false` disables logging */
  log?: boolean;

  /** log callback function  */
  logger?: (message: string) => void;

  /**
   * The output directory.
   * @default ./
   * @example
   * ```
   * path.join(process.cwd(), 'fonts')
   * ```
   */
  dist?: string;

  /**
   * style path
   * @default ./
   * @example
   * ```
   * path.join(process.cwd(), 'path/to/css')
   * ```
   */
  src?: string;

  /**
   * The font family name you want.
   * @default iconfont
   */
  fontName?: string;

  /**
   * file name you want.
   * @default iconfont-helper
   */
  fileName?: string;

  /**
   * Create font class name prefix, default value font name.
   * @default fontName
   */
  classNamePrefix?: IconfontHelperOptions["fontName"];

  /**
   * Symbol Name Delimiter, @default `-`
   */
  symbolNameDelimiter?: string;

  /**
   * Directory of custom templates.
   */
  styleTemplates?: string;
};

export default async (options: IconfontHelperOptions = {}) => {
  const confPath = path.join(process.cwd(), ".iconfonthelperrc");

  if (fs.pathExistsSync(confPath)) {
    const conf = await fs.readJson(confPath);
    options = { ...options, ...conf };
  } else {
    // load yaml config
    const confPath = path.join(process.cwd(), ".iconfonthelperrc.yaml");
    if (fs.pathExistsSync(confPath)) {
      const conf = await YAML.parse(fs.readFileSync(confPath, "utf-8"));
      options = { ...options, ...conf };
    }
  }

  const pkgPath = path.join(process.cwd(), "package.json");
  if (fs.pathExistsSync(pkgPath)) {
    const pkg = require(pkgPath);
    if (pkg.iconfonthelper) {
      options = { ...options, ...pkg.iconfonthelper };
    }
  }

  if (options.log === undefined) options.log = true;
  log.disabled = !options.log;
  if (options.logger && typeof options.logger === "function")
    log.logger = options.logger;

  options.dist = options.dist || process.cwd();
  options.src = options.src || process.cwd();
  options.fontName = options.fontName || "iconfont";
  options.fileName = options.fileName || "iconfont-helper";
  options.symbolNameDelimiter = options.symbolNameDelimiter || "-";
  options.classNamePrefix = options.classNamePrefix || options.fontName;

  const styleTemplatePath =
    options.styleTemplates || path.resolve(__dirname, "templates");

  const cssData = fs.readFileSync(options.src, "utf-8");
  const cssStr = cssData.toString();
  const selectorPattern = [options.classNamePrefix, "(.*)"].join(
    options.symbolNameDelimiter
  );
  const selectorRegex = new RegExp(`(${selectorPattern}):before`);
  const selectors = cssStr
    .match(/\.([\w-]+:before)/g)
    .map((x) => x.slice(1).replace(selectorRegex, "$1"));
  const values = cssStr
    .match(/\s*{\s*content:\s*("([^"]+)");\s*}/g)
    .map((x) => x.match(/:\s?(.*);/)[1]);

  const result: string[][] = selectors.map((x, i) => [x, values[i]]);

  const withoutPrefix = (str: string) => {
    return str.replace(
      options.classNamePrefix + options.symbolNameDelimiter,
      ""
    );
  };

  try {
    // Ensures that the directory exists.
    await fs.ensureDir(options.dist);
    await copyTemplate(styleTemplatePath, options.dist, {
      sassMap:
        "  " +
        result.map((x) => `${withoutPrefix(x[0])}: ${x[1]}`).join(",\n  "),
      cssVars: "  " + result.map((x) => `--${x[0]}: ${x[1]};`).join("\n  "),
      prefix: options.classNamePrefix,
      _opts: {
        fileName: options.fileName,
        fontName: options.fontName,
      },
    });
  } catch (error) {
    log.log("IconfontHelper:CLI:ERR:", error);
  }
};

/**
 * https://github.com/Microsoft/TypeScript/issues/5565#issuecomment-155226290
 */
module.exports = exports["default"];
