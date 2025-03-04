function traverse(node, depth = 0, maxDepth = 3) {
  // console.log(node);
  const loopTypes = ["for_statement", "while_statement", "do_statement"];
  let message = {
    severity: 4,
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
    }
  }

  for (let child of node.children) {
    traverse(child, depth, maxDepth);
  }
}

function detectDeeplyNestedLoops(node) {
  let messages = [];
  traverse(node);
  return messages;
}

export default detectDeeplyNestedLoops;
