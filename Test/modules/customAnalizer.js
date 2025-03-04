const Parser = require("tree-sitter");
const JavaScript = require("tree-sitter-javascript");
const fs = require("fs");
const chalk = require("chalk");

const detectDeeplyNestedLoops = require("./nestedloop");
const detectInfiniteRecursion = require("./infiniteResursion");
const detectHardcodedCredentials = require("./detectCredentials");
// Initialize the parser
const parser = new Parser();
parser.setLanguage(JavaScript);
const rules = JSON.parse(fs.readFileSync("./rules/jsrule.json", "utf8"));

let totalMatches = 0;
let totalErrors = 0;
function calculateELOC(node) {
  if (!node || typeof node !== "object") return 0;

  if (
    node.type === "function_declaration" ||
    node.type === "function_expression" ||
    node.type === "arrow_function"
  ) {
    const startLine = node.startPosition.row;
    const endLine = node.endPosition.row;
    return endLine - startLine + 1;
  }

  let totalELOC = 0;
  for (let child of node.namedChildren) {
    totalELOC += calculateELOC(child);
  }

  return totalELOC;
}

function analyzeCode(code) {
  const tree = parser.parse(code);

  const loc = calculateELOC(tree.rootNode);
  console.log("loc: ", loc);

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
          console.log(startPosition, "hell", endPosition);
          message.severity = rule.severity === "warning" ? 1 : 2;
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

module.exports = analyzeCode;
