"use strict";
const fs = require("fs");
const pathHelper = require("path");
const colors = require("colors");

module.exports = class Tracer {
  constructor() {
    try {
      fs.writeFileSync("list.txt", "");
    } catch (error) {}
  }
  trace(path, haystack) {
    let items = fs.readdirSync(path);
    items.forEach(item => {
      let newPath = path + "\\" + item;
      if (fs.existsSync(newPath)) {
        if (fs.lstatSync(newPath).isDirectory()) {
          this.trace(newPath, haystack);
        } else if (fs.lstatSync(newPath).isFile()) {
          if (haystack.includes(pathHelper.extname(item))) {
            console.log(newPath.green);
            try {
              fs.appendFileSync("list.txt", newPath + "\n");
            } catch (e) {
              console.log(("Could not save file - " + newPath).red);
            }
          }
        }
      }
    });
  }
};
