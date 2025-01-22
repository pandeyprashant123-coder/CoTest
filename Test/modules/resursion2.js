const chalk = require("chalk");
function detectInfiniteRecursion(node, parentFunction, parentArgs) {
  if (!node) return;

  // Check for function declarations
  if (node.type === "function_declaration") {
    const functionName = node.childForFieldName("name")?.text;
    const parameters = node.childForFieldName("parameters")?.text; // Get function parameters
    detectInfiniteRecursion(
      node.childForFieldName("body"),
      functionName,
      parameters
    );
  }

  // Check for recursive calls
  if (node.type === "call_expression") {
    const callee = node.childForFieldName("function")?.text; // Function being called
    const args = node.childForFieldName("arguments")?.text; // Arguments of the call

    if (callee === parentFunction) {
      if (args === parentArgs) {
        const { startPosition } = node;
        console.log(
          chalk.red(
            `Infinite Recursive call to '${parentFunction}' detected at Line (${
              startPosition.row + 1
            }).`
          )
        );
      }
    }
  }

  // Traverse children recursively
  for (let i = 0; i < node.childCount; i++) {
    detectInfiniteRecursion(node.child(i), parentFunction, parentArgs);
  }
}

module.exports = detectInfiniteRecursion;
