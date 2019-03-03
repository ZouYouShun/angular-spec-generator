import * as fs from 'fs';
import * as path from 'path';
import * as format from 'string-template';
const chalk = require('chalk');

export interface SpecType {
  type: string;
  name: string;
  dir: string;
  url: string;
}

export const createSpec = async (array: SpecType[], isforce: boolean) => {
  for (const file of array) {
    // console.log(file);
    // console.log(fs.readFileSync('./template/component.template').toString());
    const targetUrl = path.join(file.dir, `${file.name}.spec.ts`);

    if (!fs.existsSync(targetUrl) || isforce) {
      const template = fs.readFileSync(
        path.join(__dirname, `template/${file.type}.template`)).toString();

      const noTypeName = file.name.replace(`.${file.type}`, '');

      // console.log(noTypeName);
      // console.log(camelize(noTypeName));
      const content = format(template, {
        bigName: camelize(noTypeName),
        name: noTypeName
      });
      await createFile(targetUrl, content);
      console.log(chalk.green('create ') + targetUrl);
    }
  }
};


function createFile(url, value) {
  return new Promise(async (resolve, reject) => {
    try {
      const file = fs.createWriteStream(url);
      file.write(value);
      file.end();
      file.on('close', () => {
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}

// camelize Name
function camelize(str) {
  str = ' ' + str;
  str = clearString(str);
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}
function clearString(s) {
  const pattern = new RegExp(/[.\-_]/);
  let rs = '';
  for (let i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, ' ');
  }
  return rs;
}
