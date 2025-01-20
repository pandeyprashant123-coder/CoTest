const Parser = require("tree-sitter");
const JavaScript = require("tree-sitter-javascript");
const fs = require("fs");
const chalk = require("chalk");

const parser = new Parser();
parser.setLanguage(JavaScript);

const code = fs.readFileSync("./testFile.js", "utf8");
const rules = JSON.parse(fs.readFileSync("./jsrule.json", "utf8"));

let totalMatches = 0;
let totalErrors = 0;
let totalSeverityScore = 0;
let totalIssues = 0;
let totalEffortMinutes = 0;

// Function to calculate cyclomatic complexity (mocked for simplicity)
function calculateCyclomaticComplexity(code) {
  const edges = 6; // Example count from manual calculation
  const nodes = 7;
  const connectedComponents = 1;
  return edges - nodes + 2 * connectedComponents;
}

// Function to calculate maintainability index
function calculateMaintainabilityIndex(
  linesOfCode,
  halsteadVolume,
  cyclomaticComplexity
) {
  return (
    171 -
    5.2 * Math.log(halsteadVolume) -
    0.23 * cyclomaticComplexity -
    16.2 * Math.log(linesOfCode)
  );
}

function analyzeCode(code) {
  const tree = parser.parse(code);
  console.log(chalk.bold.blue("\n===== Code Analysis Report =====\n"));

  rules.forEach((rule, index) => {
    try {
      console.log(chalk.bold.yellow(`Rule ${index + 1}: ${rule.name}`));
      console.log(`  Description: ${rule.description}`);
      console.log(`  Severity: ${chalk.bold(rule.severity.toUpperCase())}`);
      console.log("  -------------------------------------");

      const Query = require("tree-sitter").Query;
      const queryObj = new Query(JavaScript, rule.query);
      const matches = queryObj.matches(tree.rootNode);
      if (matches.length === 0) {
        console.log(chalk.gray("  No matches found for this rule.\n"));
        return;
      }
      console.log(chalk.green(`  Matches Found: ${matches.length}`));

      matches.forEach((match, matchIndex) => {
        console.log(`    Match ${matchIndex + 1}:`);
        match.captures.forEach((capture) => {
          const {
            startPosition: { column: startColumn, row: startRow },
            endPosition: { column: endColumn, row: endRow },
          } = capture.node;
          console.log(
            `      Node: ${capture.name}, Start: Line ${startRow + 1}, Column ${
              startColumn + 1
            }, End: Line ${endRow + 1}, Column ${endColumn + 1}`
          );
          console.log(
            chalk.red(
              `      Severity: ${rule.severity.toUpperCase()} at Line ${
                startRow + 1
              }`
            )
          );
        });
      });

      totalMatches += matches.length;
      totalIssues += matches.length;
      totalSeverityScore += matches.length * rule.severityScore;
      totalEffortMinutes += matches.length * rule.effortMinutes;
    } catch (error) {
      totalErrors++;
      console.error(chalk.red(`  Error with Rule ${index + 1}: ${rule.name}`));
      console.error(chalk.red(`    ${error.message}`));
      console.error("\n");
    }
    console.log(chalk.gray("  -------------------------------------\n"));
  });

  const cyclomaticComplexity = calculateCyclomaticComplexity(code);
  const maintainabilityIndex = calculateMaintainabilityIndex(
    10,
    30,
    cyclomaticComplexity
  ); // Example values
  const rating = totalIssues ? totalSeverityScore / totalIssues : 0;

  console.log(chalk.bold.blue("\n===== Code Analysis Summary ====="));
  console.log(`  Total Rules Applied: ${rules.length}`);
  console.log(`  Total Matches Found: ${chalk.green(totalMatches)}`);
  console.log(`  Total Errors Encountered: ${chalk.red(totalErrors)}`);
  console.log(`  Cyclomatic Complexity: ${chalk.yellow(cyclomaticComplexity)}`);
  console.log(
    `  Maintainability Index: ${chalk.cyan(maintainabilityIndex.toFixed(2))}`
  );
  console.log(`  Total Severity Score: ${chalk.magenta(totalSeverityScore)}`);
  console.log(`  Technical Debt: ${chalk.red(totalEffortMinutes)} minutes`);
  console.log(`  Rating: ${chalk.bold(rating.toFixed(2))} (Medium)\n`);
}

// Run the analyzer
analyzeCode(code);
