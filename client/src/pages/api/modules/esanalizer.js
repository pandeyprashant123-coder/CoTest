import { ESLint } from "eslint";

const eslint = new ESLint({ fix: true });

async function lintCode(code, filename = "temp.js") {
  try {
    const results = await eslint.lintText(code, { filePath: filename });
    await ESLint.outputFixes(results);
    const messages = results[0].messages.map((msg) => ({
      ...msg,
      stringSeverity: msg.severity === 2 ? 8 : 4,
    }));
    return messages;
  } catch (error) {
    console.error("ESLint Error:", error);
    return [];
  }
}

export default lintCode;
