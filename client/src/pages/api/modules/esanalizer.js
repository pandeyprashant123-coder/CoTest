import { ESLint } from "eslint";

const eslint = new ESLint({ fix: true });

async function lintCode(code, filename = "temp.js") {
  try {
    const results = await eslint.lintText(code, { filePath: filename });
    await ESLint.outputFixes(results);
    const msg =
      results.length > 0
        ? results[0].messages.filter((msg) => msg.ruleId !== null)
        : [];

    console.log("Lint Messages:", msg);
    return msg;
  } catch (error) {
    console.error("ESLint Error:", error);
    return [];
  }
}

export default lintCode;
