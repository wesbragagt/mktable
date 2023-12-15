#! /usr/bin/env node

import fs from 'fs';
import { TableContent } from './table-content';
import path from 'path';

function main(){
  const filetarget = process.argv[2] || 'README.md';
  if(!filetarget){
    throw new Error('File target not found. Make sure to call with file target. Ex: mktable README.md');
  }

  if(!fs.existsSync(filetarget)){
    throw new Error('File target not found');
  }
  
  const filetargetSplit = filetarget.split('.');
  const filetargetExtension = filetargetSplit[filetargetSplit.length - 1];
  if(filetargetExtension !== 'md'){
    throw new Error('File target must be md');
  }

  const contentRead = fs.readFileSync(path.join(process.cwd(), filetarget), 'utf8');
  const tableContent = new TableContent(contentRead).make();
  process.stdout.write(tableContent.join('\n'));
}

main();
