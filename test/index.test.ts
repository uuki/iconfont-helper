import fs from "fs-extra";
import path from "path";
import svgtofont from "../src";
import pkg from "../package.json";

console.log = jest.fn();

it("fontagon style example test case.", async () => {
  const dist = path.resolve(process.cwd(), "test", "example", "dist");
  await fs.emptyDir(dist);
  await svgtofont({
    src: path.resolve(
      process.cwd(),
      "test",
      "example",
      "fonts",
      "fontagon.css"
    ),
    dist: dist,
    fontName: "iconfont", // font name
    fileName: "iconfont-helper", // file name
    classNamePrefix: "iconfont", // prefix
  });
  const fileNames = await fs.readdir(dist);
  expect(fileNames).toEqual([
    "iconfont-helper.css",
    "iconfont-helper.postcss.css",
    "iconfont-helper.scss",
  ]);
  await fs.emptyDir(dist);
});

it("svgtofont style example test case.", async () => {
  const dist = path.resolve(process.cwd(), "test", "example", "dist");
  await fs.emptyDir(dist);
  await svgtofont({
    src: path.resolve(
      process.cwd(),
      "test",
      "example",
      "fonts",
      "svgtofont.css"
    ),
    dist: dist,
    fontName: "iconfont", // font name
    fileName: "iconfont-helper", // file name
    classNamePrefix: "ft-icon", // prefix
  });
  const fileNames = await fs.readdir(dist);
  expect(fileNames).toEqual([
    "iconfont-helper.css",
    "iconfont-helper.postcss.css",
    "iconfont-helper.scss",
  ]);
  await fs.emptyDir(dist);
});

it("icomoon style example test case.", async () => {
  const dist = path.resolve(process.cwd(), "test", "example", "dist");
  await fs.emptyDir(dist);
  await svgtofont({
    src: path.resolve(process.cwd(), "test", "example", "fonts", "icomoon.css"),
    dist: dist,
    fontName: "icomoon", // font name
    fileName: "iconfont-helper", // file name
    classNamePrefix: "icon", // prefix
  });
  const fileNames = await fs.readdir(dist);
  expect(fileNames).toEqual([
    "iconfont-helper.css",
    "iconfont-helper.postcss.css",
    "iconfont-helper.scss",
  ]);
  await fs.emptyDir(dist);
});

it("templates simple test case.", async () => {
  const dist = path.resolve(process.cwd(), "test", "templates", "dist");
  await fs.emptyDir(dist);
  await svgtofont({
    src: path.resolve(
      process.cwd(),
      "test",
      "example",
      "fonts",
      "svgtofont.css"
    ),
    dist: dist,
    styleTemplates: path.resolve(process.cwd(), "test", "templates"),
    fontName: "iconfont-helper",
  });
  const fileNames = await fs.readdir(dist);
  expect(fileNames).toEqual([
    "iconfont-helper.css",
    "iconfont-helper.postcss.css",
    "iconfont-helper.scss",
  ]);
  const css = await fs.readFile(path.resolve(dist, "iconfont-helper.css"));
  expect(css.toString().indexOf("Hello CSS!") > -1).toBeTruthy();
  await fs.emptyDir(dist);
});
