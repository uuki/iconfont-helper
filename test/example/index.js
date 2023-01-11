const path = require("path");
const iconfontHelper = require("../../lib");
const pkg = require("../../package.json");

const rootPath = path.resolve(process.cwd(), "test", "example");

iconfontHelper({
  src: path.resolve(rootPath, "fonts", "fontagon.css"), // css path
  dist: path.resolve(rootPath, "dist"), // output path
  fontName: "fontagon", // font name
  fileName: "fontagon-helper", // file name
  classNamePrefix: "ft", // prefix
}).then(() => {
  console.log("Example::::done!");
});

iconfontHelper({
  src: path.resolve(rootPath, "fonts", "icomoon.css"), // css path
  dist: path.resolve(rootPath, "dist"), // output path
  fontName: "icomoon", // font name
  fileName: "icomoon-helper", // file name
  classNamePrefix: "icon", // prefix
}).then(() => {
  console.log("Example::::done!");
});

iconfontHelper({
  src: path.resolve(rootPath, "fonts", "svgtofont.css"), // css path
  dist: path.resolve(rootPath, "dist"), // output path
  fontName: "iconfont", // font name
  fileName: "iconfont-helper", // file name
  classNamePrefix: "iconfont", // prefix
}).then(() => {
  console.log("Example::::done!");
});
