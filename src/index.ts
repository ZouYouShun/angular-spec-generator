import * as fs from 'fs';
import * as path from 'path';
import { createSpec } from './createSpec';

const chalk = require('chalk');


export class App {

  constructor() {
    this.app();
  }

  async app() {
    try {

      const sourceDir = this.getSource();
      console.log(chalk.green(`from Url:  ${sourceDir}`));

      const handlerFile = this.getSholudSpec(this.getFileTree(sourceDir));

      createSpec(handlerFile);


      console.log(chalk.green('completed!'));
    } catch (err) {
      console.log(chalk.red(err));
    }
  }

  private getSource() {
    const args = process.argv.slice(2);
    return args[0];
  }

  private getFileTree(sourceUrl: string) {

    const returnObj = [];
    const files = fs.readdirSync(sourceUrl);

    files.forEach((file) => {
      const url = path.join(sourceUrl, file);

      if (fs.lstatSync(url).isDirectory()) {
        returnObj.push(...this.getFileTree(url));
      }
      returnObj.push(url);
    });

    return returnObj;
  }

  private getSholudSpec(array: Array<string>) {
    const newArray = [];
    array.forEach((url) => {
      const file = path.parse(url);
      if (file.ext === '.ts' && !url.includes('.spec')) {

        if (url.includes('guard')) {
          newArray.push({
            type: 'guard',
            name: file.name,
            dir: file.dir,
            url: url
          });
        } else if (url.includes('component')) {
          newArray.push({
            type: 'component',
            name: file.name,
            dir: file.dir,
            url: url
          });
        } else if (url.includes('service')) {
          newArray.push({
            type: 'service',
            name: file.name,
            dir: file.dir,
            url: url
          });
        } else if (url.includes('directive')) {
          newArray.push({
            type: 'directive',
            name: file.name,
            dir: file.dir,
            url: url
          });
        } else if (url.includes('pipe')) {
          newArray.push({
            type: 'pipe',
            name: file.name,
            dir: file.dir,
            url: url
          });
        }
      }
    });

    return newArray;
  }

}

module.exports = new App();

