const chalk = require("chalk");
function detectRecursiveFunctions(node, functionNames = new Set()) {
  if (node.type === "function_declaration") {
    const functionName = node.childForFieldName("name").text;
    functionNames.add(functionName);

    // Check for recursive calls within the function body
    const bodyNode = node.childForFieldName("body");
    if (bodyNode) {
      const isRecursive = containsRecursiveCall(bodyNode, functionName);
      if (isRecursive) {
        const { startPosition } = node;
        console.log(
          chalk.red(
            `Recursive function '${functionName}' detected at Line ${
              startPosition.row + 1
            }`
          )
        );
      }
    }
  }

  // Traverse child nodes
  for (let child of node.children) {
    detectRecursiveFunctions(child, functionNames);
  }
}

// Helper function to check for recursive calls within a function body
function containsRecursiveCall(node, functionName) {
  if (node.type === "call_expression") {
    const calledFunction = node.childForFieldName("function");
    if (calledFunction && calledFunction.text === functionName) {
      return true;
    }
  }

  // Traverse child nodes
  for (let child of node.children) {
    if (containsRecursiveCall(child, functionName)) {
      return true;
    }
  }

  return false;
}

module.exports = detectRecursiveFunctions;
