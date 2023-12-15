import fs from 'fs';

function main(){

}

main();

function parseReadFileContent(content: string){
  const matches = {
    h1(line: string){
      return line.match(/^(#)(w|d)/);
    } ,
    h2(line: string){
      return line.match(/^(##)(w|d)/);
    },
  }
  const lines = content.split('\n');
}
