const fs = require("fs");

const analyzeCode = require("./modules/customAnalizer");
const lintCode = require("./modules/eslintAnalyzer");

// Load code
const code = fs.readFileSync("./code/testFile.js", "utf8");

analyzeCode(code);

// lintCode(code, "testFile.js");
