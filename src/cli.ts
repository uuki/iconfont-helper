#!/usr/bin/env node

import FS from 'fs-extra';
import yargs, { Arguments } from 'yargs';
import path from 'path';
import iconfontStyleHelper from '.';
import { log } from './utils/log';

type ArgvResult = Arguments<{
  sources: string;
  output: string;
  fontName: string;
}>;

const argv = yargs
  .alias('s', 'sources')
  .describe('s', 'The root from which all sources are relative.')
  .alias('o', 'output')
  .describe('o', 'Output directory.')
  .alias('f', 'fontName')
  .describe('f', 'Font Name.')
  .demandOption(['output', 'sources'])
  .help('h')
  .alias('h', 'help')
  .epilog('copyright 2022').argv as ArgvResult;

const sourcesPath = path.resolve(process.cwd(), argv.sources);
const outputPath = path.resolve(process.cwd(), argv.output);

if (!FS.pathExistsSync(sourcesPath)) {
  log.error('The directory does not exist!', sourcesPath);
  process.exit();
}

if (!FS.pathExistsSync(outputPath)) {
  FS.mkdirpSync(outputPath);
}

iconfontStyleHelper({
  src: sourcesPath, // svg path
  dist: outputPath, // output path
  fontName: argv.fontName || 'iconfont', // font name
})
  .then(() => {
    log.log('done!');
  })
  .catch((err) => {
    log.log('iconfontStyleHelper:ERR:', err);
  });
