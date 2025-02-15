let messages = [];
function traverse(node, parentFunction, parentArgs) {
  if (!node) return;
  let message = {
    severity: 2,
    message: "Infinite Resursin detected",
    line: 0,
    column: 0,
  };
  // Check for function declarations
  if (node.type === "function_declaration") {
    const functionName = node.childForFieldName("name")?.text;
    const parameters = node.childForFieldName("parameters")?.text; // Get function parameters
    traverse(node.childForFieldName("body"), functionName, parameters);
  }

  // Check for recursive calls
  if (node.type === "call_expression") {
    const callee = node.childForFieldName("function")?.text; // Function being called
    const args = node.childForFieldName("arguments")?.text; // Arguments of the call

    if (callee === parentFunction) {
      if (args === parentArgs) {
        const { startPosition } = node;
        message.line = startPosition.row + 1;
        message.column = startPosition.column + 1;
        messages.push(message);
      }
    }
  }

  // Traverse children recursively
  for (let i = 0; i < node.childCount; i++) {
    traverse(node.child(i), parentFunction, parentArgs);
  }
}

function detectInfiniteRecursion(node) {
  let messages = [];
  traverse(node);
  return messages;
}

export default detectInfiniteRecursion;
