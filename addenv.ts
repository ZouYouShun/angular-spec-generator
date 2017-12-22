import * as path from 'path';
import * as fs from 'fs';

export class AddEnv {
  fromUrl = 'dist/index.js';

  constructor() {
    this.writeFile(this.fromUrl);
  }

  writeFile(fromUrl) {
    const oriString = this.getFile(fromUrl);
    const file = fs.createWriteStream(fromUrl);
    file.write(`#!/usr/bin/env node\n`);
    file.write(oriString);
    console.log('complete');
  }

  getFile(fromUrl) {
    if (fs.existsSync(path.resolve(fromUrl))) {
      return fs.readFileSync(fromUrl).toString();
    }
  }
}
module.exports = new AddEnv();
