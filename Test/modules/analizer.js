const Parser = require("tree-sitter");
const JavaScript = require("tree-sitter-javascript");
const fs = require("fs");
const chalk = require("chalk");

const detectDeeplyNestedLoops = require("./nestedloop");
const detectRecursiveFunctions = require("./recursion");
const detectInfiniteRecursion = require("./resursion2");
// Initialize the parser
const parser = new Parser();
parser.setLanguage(JavaScript);
const rules = JSON.parse(fs.readFileSync("./rules/jsrule.json", "utf8"));

let totalMatches = 0;
let totalErrors = 0;

function analyzeCode(code) {
  const tree = parser.parse(code);

  console.log(chalk.bold.blue("\n===== Code Analysis Report =====\n"));

  // Apply predefined rules
  rules.forEach((rule, index) => {
    try {
      const queryObj = new Parser.Query(JavaScript, rule.query);
      const captures = queryObj.captures(tree.rootNode);

      if (captures.length > 0) {
        captures.forEach((capture) => {
          const { startPosition, endPosition } = capture.node;
          console.log(chalk.bold.yellow(`Rule: ${rule.name}`));
          console.log(`  Description: ${rule.description}`);
          console.log(
            chalk.red(
              `  Severity: ${rule.severity.toUpperCase()} at Line ${
                startPosition.row + 1
              }`
            )
          );
          console.log(
            `  Node: ${capture.name}, Start: Line ${
              startPosition.row + 1
            }, Column ${startPosition.column + 1}, End: Line ${
              endPosition.row + 1
            }, Column ${endPosition.column + 1}`
          );
          console.log(chalk.gray("  -------------------------------------\n"));
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
  detectDeeplyNestedLoops(tree.rootNode);

  //recursions
  // detectRecursiveFunctions(tree.rootNode);
  detectInfiniteRecursion(tree.rootNode);

  console.log(chalk.bold.blue("\n===== Analysis Summary ====="));
  console.log(`  Total Rules Applied: ${rules.length}`);
  console.log(`  Total Matches Found: ${chalk.green(totalMatches)}`);
  console.log(`  Total Errors Encountered: ${chalk.red(totalErrors)}\n`);
}

module.exports = analyzeCode;
