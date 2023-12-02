#!/usr/bin/env node

import fs from 'fs';
import yargs from 'yargs';
import generateIconSetFromCss from '../generate-icon-set-from-css';
import { omit } from '../object-utils';

const argv = yargs
  .options({
    p: {
      alias: 'prefix',
      type: 'string',
      default: '.icon-',
      describe: 'CSS selector prefix',
    },
    o: {
      alias: 'output',
      type: 'string',
      describe: 'Save output to file, defaults to STDOUT',
    },
    g: {
      alias: 'glyphmap',
      type: 'string',
      describe: 'Save glyphmap JSON to file',
    },
    m: {
      alias: 'mode',
      type: 'string',
      describe: 'Create from css or codepoints',
      choices: ['css', 'codepoints'],
      default: 'css',
    },
  })
  .usage(
    'Usage: $0 [options] path/to/styles.css \nFor default template please provide --componentName and --fontFamily'
  )
  .demand(1)
  .parseSync();

const data = omit(
  argv,
  ...'_ $0 o output p prefix t template g glyphmap'.split(' ')
);

const content = generateIconSetFromCss(
  argv._ as string[],
  argv.p,
  argv.m as 'css' | 'codepoints',
  template,
  data
);

if (argv.o) {
  fs.writeFileSync(argv.o, content);
} else {
  console.log(content);
}

if (argv.g) {
  fs.writeFileSync(argv.g, generateIconSetFromCss(argv._ as string[], argv.p, argv.m as 'css' | 'codepoints'));
}
