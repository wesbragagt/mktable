#! /usr/bin/env node

import fs from 'fs';
import { TableContent } from './table-content';
import path from 'path';

function main(){
  const filetarget = process.argv[2] || 'README.md';
  const contentRead = fs.readFileSync(path.join(process.cwd(), filetarget), 'utf8');
  const tableContent = new TableContent(contentRead).make();
  process.stdout.write(tableContent.join('\n'));
}

main();
