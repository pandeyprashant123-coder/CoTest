const fs = require("fs");

const analyzeCode = require("./modules/customAnalizer");
const lintCode = require("./modules/eslintAnalyzer");

// Load code
const code = fs.readFileSync("./code/testFile.js", "utf8");

async function test() {
  const msg1 = analyzeCode(code);
  // const msg2 = await lintCode(code);

  
  console.log(msg1);
  // const message = msg1.concat(msg2);
  // const finalmsg = filter(message);
  // console.log(finalmsg.sort((a, b) => b.line - a.line));
}
test();

function filter(msg) {
  for (let i = 0; i < msg.lenght; i++) {
    for (let j = 1; j < i; j++) {
      if (msg[i].line === msg[j].line && msg[i].column === msg[j].column) {
        msg.pop(msg[j]);
      }
    }
  }
  return msg;
}
