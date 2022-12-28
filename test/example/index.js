const path = require('path');
const iconfontHelper = require('../../lib');
const pkg = require('../../package.json');

const rootPath = path.resolve(process.cwd(), 'test', 'example');

iconfontHelper({
  src: path.resolve(rootPath, 'fonts', 'fontagon.css'), // css path
  dist: path.resolve(rootPath, 'dist'), // output path
  fontName: 'iconfont', // font name
  fileName: 'iconfont-helper', // file name
  classNamePrefix: 'iconfont', // prefix
}).then(() => {
  console.log('Example::::done!');
});
