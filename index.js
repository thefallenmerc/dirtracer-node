"use strict";
const fs = require("fs");
const color = require("colors");

const Tracer = require("./src/tracer");

const tracer = new Tracer();

if (process.argv.length < 3) {
  console.log("Too few arguments passed!".red);
  return;
}

let dir = process.argv[2];
console.log(("Search directory is " + dir).yellow);
let whiteList = [];
for (let i = 3; i < process.argv.length; i++) {
  whiteList.push("." + process.argv[i]);
}
console.log(("Allowed extensions are " + JSON.stringify(whiteList)).yellow);
tracer.trace(dir, whiteList);
