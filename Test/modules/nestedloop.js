// Function to detect deeply nested loops
const chalk = require("chalk");
let messages = [];
function traverse(node, depth = 0, maxDepth = 3) {
  // console.log(node);
  const loopTypes = ["for_statement", "while_statement", "do_statement"];
  let message = {
    severity: 2,
    message: "Deeply nested loop",
    line: 0,
    column: 0,
  };

  if (loopTypes.includes(node.type)) {
    depth += 1;
    if (depth > maxDepth) {
      const { startPosition } = node;
      message.line = startPosition.row + 1;
      message.column = startPosition.column + 1;
      messages.push(message);
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
    traverse(child, depth, maxDepth);
  }
}

function detectDeeplyNestedLoops(node) {
  traverse(node);
  return messages;
}

module.exports = detectDeeplyNestedLoops;
