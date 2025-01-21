const fs = require("fs");
const analyzeCode = require("./modules/analizer");

// Load code and rules
const code = fs.readFileSync("./code/testFile.js", "utf8");

// Run the analyzer
analyzeCode(code);
