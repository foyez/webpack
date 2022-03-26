"use strict";

const path = require("path");
const fs = require("fs");

// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  // Source files
  src: resolveApp("src"),

  // Production build files
  build: resolveApp("build"),

  // Static files that get copied to build folder
  public: resolveApp("public"),
};
