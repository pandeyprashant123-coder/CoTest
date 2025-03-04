
import rules from "../rules/jsrules.json";

import detectDeeplyNestedLoops from "./nestedloop.js";
import detectInfiniteRecursion from "./infiniteRecursion.js";
import detectHardcodedCredentials from "./detectCredentials.js";
import calculateELOC from "./calculateELOC";
import parser from "../config/parser";
// Initialize the parser
// const parser = new Parser();
// parser.setLanguage(JavaScript);
let totalMatches = 0;
let totalErrors = 0;
const errorSeverity = {
  warning: 4,
  info: 1,
  low: 1,
  high: 8,
  mendium: 4,
  critical: 8,
};

function analyzeCode(tree, fileName) {

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
            endColumn: 0,
          };
          const { startPosition, endPosition } = capture.node;
          message.severity = errorSeverity[rule.severity];
          message.message = rule.description;
          message.line = startPosition.row + 1;
          message.column = startPosition.column + 1;
          message.endColumn = endPosition.column + 1;
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
