// Function to detect deeply nested loops
const chalk = require("chalk");
function detectDeeplyNestedLoops(node, depth = 0, maxDepth = 2) {
  // console.log(node);
  const loopTypes = ["for_statement", "while_statement", "do_statement"];

  if (loopTypes.includes(node.type)) {
    depth += 1;
    if (depth > maxDepth) {
      const { startPosition } = node;
      console.log(
        chalk.red(
          `Deeply nested loop detected at Line ${
            startPosition.row + 1
          }, Depth: ${depth}`
        )
      );
    }
  }

  for (let child of node.children) {
    detectDeeplyNestedLoops(child, depth, maxDepth);
  }
}

module.exports = detectDeeplyNestedLoops;
