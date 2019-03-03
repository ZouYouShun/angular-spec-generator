import * as fs from 'fs';
import * as path from 'path';
import { createSpec } from './createSpec';
import { clearSpec } from './clearSpec';
import { readlinePromise } from './libs/readLinePromise';

const chalk = require('chalk');


export class App {

  constructor() {
    this.app();
  }

  async app() {
    try {

      const args = process.argv.slice(2);

      const sourceDir = args[0];

      const sourceTypes = this.getTypes(args);

      console.log(chalk.green(`from Url:  ${sourceDir}`));

      const handlerFile = this.getSholudSpec(this.getFileTree(sourceDir), sourceTypes);

      const isClear = args.find((arg) => {
        return arg.includes('--clear');
      });

      if (isClear) {
        if ((<string>await readlinePromise('this command will delete specs with you select, continue ? (y/n)'))
          .toLocaleLowerCase() === 'n') {
          process.exit(0);
          return null;
        }
        clearSpec(handlerFile);
      } else {

        const isforce = args.some((arg) => {
          return arg.includes('--force');
        });

        await createSpec(handlerFile, isforce);
      }

      console.log(chalk.green('completed!'));
    } catch (err) {
      console.log(chalk.red(err));
    }
    process.exit(0);
  }

  private getTypes(args: string[]) {

    for (let i = 1; i < args.length; i++) {
      const arg = args[i];

      if (arg.includes('--type=')) {
        const types = arg.replace('--type=', '');

        const typeArray = types.split(',');

        return typeArray.map(t => {
          switch (t) {
            case 'g':
            case 'guard':
              return 'guard';
            case 'c':
            case 'component':
              return 'component';
            case 's':
            case 'service':
              return 'service';
            case 'd':
            case 'directive':
              return 'directive';
            case 'p':
            case 'pipe':
              return 'pipe';
            default:
              const str = `
Configuration has error text, example: ${chalk.blue('--type=guard,component,service')}
options must be: ${chalk.green('guard ,component ,service ,directive ,pipe')} or
using alias: ${chalk.green('g, c, s, d, p')}
`;
              console.log(str);
              throw new Error('error occur, see above');
          }
        });
      }
    }
    return ['guard', 'component', 'service', 'directive', 'pipe'];
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

  private getSholudSpec(array: Array<string>, checkArr: string[] = []) {

    const newArray = [];

    array.forEach((url) => {
      const file = path.parse(url);
      if (file.ext === '.ts' && !url.includes('.spec')) {

        const type = checkArr.find(t => url.includes(t));

        if (type) {
          newArray.push({
            type,
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

