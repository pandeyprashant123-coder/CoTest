function calculateELOC(node) {
  if (!node || typeof node !== "object") return 0;

  if (
    node.type === "function_declaration" ||
    node.type === "function_expression" ||
    node.type === "arrow_function"
  ) {
    const startLine = node.startPosition.row;
    const endLine = node.endPosition.row;
    return endLine - startLine + 1;
  }

  let totalELOC = 0;
  for (let child of node.namedChildren) {
    totalELOC += calculateELOC(child);
  }

  return totalELOC;
}
export default calculateELOC;
