import Parser from "tree-sitter";
import JavaScript from "tree-sitter-javascript";
import fs from "fs";
import chalk from "chalk";

import detectDeeplyNestedLoops from "./nestedloop.js";
import detectInfiniteRecursion from "./infiniteRecursion.js";
import detectHardcodedCredentials from "./detectCredentials.js";

// Initialize the parser
const parser = new Parser();
parser.setLanguage(JavaScript);
const rules = JSON.parse(
  fs.readFileSync("src/pages/api/rules/jsrules.json", "utf8")
);

let totalMatches = 0;
let totalErrors = 0;

function analyzeCode(code, fileName) {
  const tree = parser.parse(code);
  // console.log(tree);

  let messages = [];
  rules.forEach((rule, index) => {
    try {
      const queryObj = new Parser.Query(JavaScript, rule.query);
      const captures = queryObj.captures(tree.rootNode);
      if (captures.length > 0) {
        captures.forEach((capture) => {
          let message = {
            severity: 0,
            message: "",
            line: 0,
            column: 0,
          };
          const { startPosition, endPosition } = capture.node;
          message.severity =
            rule.severity === "warning" || "info" || "low" ? 1 : 2;
          message.message = rule.description;
          message.line = startPosition.row + 1;
          message.column = startPosition.column + 1;
          messages.push(message);
        });
        totalMatches += captures.length;
      }
    } catch (error) {
      totalErrors++;
    }
  });

  const mainMessage = messages.concat(
    detectDeeplyNestedLoops(tree.rootNode),
    detectInfiniteRecursion(tree.rootNode),
    detectHardcodedCredentials(tree.rootNode)
  );
  return mainMessage;
}

export default analyzeCode;
