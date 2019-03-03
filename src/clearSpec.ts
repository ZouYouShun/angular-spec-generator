import * as fs from 'fs';
import * as path from 'path';
import { SpecType } from './createSpec';
const chalk = require('chalk');

export function clearSpec(files: SpecType[]) {
  files.forEach(file => {
    // console.log(file);
    // console.log(fs.readFileSync('./template/component.template').toString());
    const targetUrl = path.join(file.dir, `${file.name}.spec.ts`);

    // 刪除所有spec檔案
    if (fs.existsSync(targetUrl)) {
      fs.unlinkSync(targetUrl);
      console.log(chalk.red('delete ') + targetUrl);
    }
  });
}
