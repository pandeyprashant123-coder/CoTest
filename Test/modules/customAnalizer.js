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

function analyzeCode(code) {
  const tree = parser.parse(code);

  let messages = [];
  // console.log(chalk.bold.blue("\n===== Code Analysis Report =====\n"));

  // Apply predefined rules
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
          console.log(startPosition,"hell",endPosition)
          message.severity = rule.severity === "warning" ? 1 : 2;
          message.message = rule.description;
          message.line = startPosition.row + 1;
          message.column = startPosition.column + 1;
          messages.push(message);
          // console.log(chalk.bold.yellow(`Rule: ${rule.name}`));
          // console.log(`  Description: ${rule.description}`);
          // console.log(
          //   chalk.red(
          //     `  Severity: ${rule.severity.toUpperCase()} at Line ${
          //       startPosition.row + 1
          //     }`
          //   )
          // );
          // console.log(
          //   `  Node: ${capture.name}, Start: Line ${
          //     startPosition.row + 1
          //   }, Column ${startPosition.column + 1}, End: Line ${
          //     endPosition.row + 1
          //   }, Column ${endPosition.column + 1}`
          // );
          // console.log(chalk.gray("  -------------------------------------\n"));
        });
        totalMatches += captures.length;
      }
    } catch (error) {
      totalErrors++;
      // console.error(chalk.red(`Error with Rule ${index + 1}: ${rule.name}`));
      // console.error(chalk.red(`  ${error.message}\n`));
    }
  });

  // Detect deeply nested loops
  // messages.push(detectDeeplyNestedLoops(tree.rootNode));

  // //recursions
  // messages.push(detectInfiniteRecursion(tree.rootNode));

  // // messages.concat(detectHardcodedCredentials(tree.rootNode));
  // console.log(detectHardcodedCredentials(tree.rootNode));
  const mainMessage = messages.concat(
    detectDeeplyNestedLoops(tree.rootNode),
    detectInfiniteRecursion(tree.rootNode),
    detectHardcodedCredentials(tree.rootNode)
  );
  return mainMessage;

  console.log(chalk.bold.blue("\n===== Analysis Summary ====="));
  console.log(`  Total Rules Applied: ${rules.length}`);
  console.log(`  Total Matches Found: ${chalk.green(totalMatches)}`);
  console.log(`  Total Errors Encountered: ${chalk.red(totalErrors)}\n`);
}

module.exports = analyzeCode;
