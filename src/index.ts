#! /usr/bin/env node

import fs from 'fs';
import { TableContent } from './table-content';
import { Commander } from './commander';
import path from 'path';
import { version } from '../package.json';

const commander = new Commander({ version });
const args = process.argv.slice(2);
const isHelp = args.find((value) => value === '--help' || value === '-h');
const isVersion = args.find((value) => value === '--version' || value === '-v');

if (isHelp) {
  process.stdout.write(commander.help);
  process.exit(0);
}

if (isVersion) {
  process.stdout.write(commander.version);
  process.exit(0);
}

const filetarget = args[0] || 'README.md';
const fileTargetPath = path.isAbsolute(filetarget) ? filetarget : path.join(process.cwd(), filetarget);

if (!fs.existsSync(fileTargetPath)) {
  process.stdout.write(`File ${fileTargetPath} not found\n`);
  process.stdout.write(commander.help);
  process.exit(1);
}

const filetargetSplit = fileTargetPath.split('.');
const filetargetExtension = filetargetSplit[filetargetSplit.length - 1];
if (filetargetExtension !== 'md') {
  throw new Error('File target must be md');
}
const contentRead = fs.readFileSync(fileTargetPath, 'utf8');
const newReadme = new TableContent(contentRead).markdown;
fs.writeFileSync(fileTargetPath, newReadme);
console.log(`Modified markdown ${fileTargetPath}`);
