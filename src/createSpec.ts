import * as fs from 'fs';
import * as path from 'path';
import * as format from 'string-template';
const chalk = require('chalk');


export const createSpec = (array: Array<{ type: string, name: string, dir: string, url: string }>) => {
    array.forEach((file: { type: string, name: string, dir: string, url: string }) => {
        // console.log(file);
        // console.log(fs.readFileSync('./template/component.template').toString());
        const targetUrl = path.join(file.dir, `${file.name}.spec.ts`);

        if (!fs.existsSync(targetUrl)) {
            const template = fs.readFileSync(
                path.join(__dirname, `template/${file.type}.template`)).toString();

            const noTypeName = file.name.replace(`.${file.type}`, '');

            // console.log(noTypeName);
            // console.log(camelize(noTypeName));
            const content = format(template, {
                bigName: camelize(noTypeName),
                name: noTypeName
            });
            createFile(targetUrl, content);
            console.log(chalk.green('create ') + targetUrl);
        }
    });
    // console.log();
};


function createFile(url, value) {
    const file = fs.createWriteStream(url);
    file.write(value);
    file.end();
}

// 駝峰式命名
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
