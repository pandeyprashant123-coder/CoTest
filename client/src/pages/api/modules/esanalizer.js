import { ESLint } from "eslint";

const eslint = new ESLint({ fix: true });

async function lintCode(code, filename) {
  const results = await eslint.lintText(code, { filePath: filename });
  await ESLint.outputFixes(results);
  const formatter = await eslint.loadFormatter("stylish");
  return results[0].messages;
}

export default lintCode;
