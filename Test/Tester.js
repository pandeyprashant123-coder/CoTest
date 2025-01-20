const Parser = require("tree-sitter");
const JavaScript = require("tree-sitter-javascript");
const fs = require("fs");
const chalk = require("chalk");

// Initialize the parser
const parser = new Parser();
parser.setLanguage(JavaScript);

// Load code and rules
const code = fs.readFileSync("./testFile.js", "utf8");
const rules = JSON.parse(fs.readFileSync("./jsrule.json", "utf8"));

let totalMatches = 0;
let totalErrors = 0;

// Analyze code snippet against all rules
function analyzeCode(code) {
  const tree = parser.parse(code);

  console.log(chalk.bold.blue("\n===== Code Analysis Report =====\n"));

  rules.forEach((rule, index) => {
    try {
      const { Query } = require("tree-sitter");
      const queryObj = new Query(JavaScript, rule.query);
      const matches = queryObj.matches(tree.rootNode);

      if (matches.length > 0) {
        matches.forEach((match) => {
          match.captures.forEach((capture) => {
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
            console.log(
              chalk.gray("  -------------------------------------\n")
            );
          });
        });
        totalMatches += matches.length;
      }
    } catch (error) {
      totalErrors++;
      // console.error(chalk.red(`Error with Rule ${index + 1}: ${rule.name}`));
      // console.error(chalk.red(`  ${error.message}\n`));
    }
  });

  console.log(chalk.bold.blue("\n===== Analysis Summary ====="));
  console.log(`  Total Rules Applied: ${rules.length}`);
  console.log(`  Total Matches Found: ${chalk.green(totalMatches)}`);
  console.log(`  Total Errors Encountered: ${chalk.red(totalErrors)}\n`);
}

// Run the analyzer
analyzeCode(code);
