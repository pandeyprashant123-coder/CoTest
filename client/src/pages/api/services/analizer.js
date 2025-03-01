import analyzeCode from "../modules/customanalizer";
import lintCode from "../modules/esanalizer";

export async function test(code) {
  const msg1 = await analyzeCode(code);
  // const msg2 = await lintCode(code);
  // const message = msg1.concat(msg2);
  const msg = filter(msg1);
  const finalmsg = msg.sort((a, b) => b.line - a.line);
  return finalmsg;
}

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
