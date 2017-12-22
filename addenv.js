"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
class AddEnv {
    constructor() {
        this.fromUrl = 'dist/index.js';
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
exports.AddEnv = AddEnv;
module.exports = new AddEnv();
//# sourceMappingURL=addenv.js.map