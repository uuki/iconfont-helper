import path from 'path';
import copy from 'copy-template-dir';
import color from 'colors-cli';
// import del from 'del';
import moveFile from 'move-file';
import { log } from './log';

export type CSSOptions = {
  /**
   * Output the css file to the specified directory
   */
  output?: string;
  /**
   * Set file name
   * https://github.com/jaywcjlove/svgtofont/issues/48#issuecomment-739547189
   */
  fileName?: string;
  /**
   * Set font name
   */
  fontName?: string;
};

export function copyTemplate(
  inDir: string,
  outDir: string,
  { _opts, ...vars }: Record<string, any> & { _opts: CSSOptions }
) {
  // const removeFiles: Array<string> = [];

  return new Promise((resolve, reject) => {
    copy(
      inDir,
      outDir,
      {
        ...vars,
        filename: _opts.fileName,
        fontname: _opts.fontName,
      },
      async (err, createdFiles) => {
        if (err) reject(err);
        // createdFiles = createdFiles
        //   .map((filePath: string) => {
        //     if ((_opts.include && new RegExp(_opts.include).test(filePath)) || !_opts.include) {
        //       return filePath;
        //     } else {
        //       removeFiles.push(filePath);
        //     }
        //   })
        //   .filter(Boolean);
        // if (removeFiles.length > 0) {
        //   await del([...removeFiles]);
        // }
        createdFiles = await Promise.all(
          createdFiles.map(async (file) => {
            if (!file.endsWith('.template')) {
              return file;
            }

            const changedFile = file.replace('.template', '');
            await moveFile(file, changedFile);
            return changedFile;
          })
        );
        if (_opts.output) {
          const output = path.join(process.cwd(), _opts.output);
          await Promise.all(
            createdFiles.map(async (file) => {
              await moveFile(file, path.join(output, path.basename(file)));
              return null;
            })
          );
        }
        createdFiles.forEach((filePath) => log.log(`${color.green('SUCCESS')} Created ${filePath} `));
        resolve(createdFiles);
      }
    );
  });
}
