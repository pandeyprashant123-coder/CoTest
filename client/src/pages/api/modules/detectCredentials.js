let messages = [];

function traverse(node) {
  const credentialPatterns = [
    /password/i,
    /passphrase/i,
    /secret/i,
    /api[_-]?key/i,
    /token/i,
    /auth/i,
    /credential/i,
    /(access|private|public|secret|master)[_-]?(key|token|password)/i,
  ];

  const valuePatterns = [/^[a-zA-Z0-9-_]{32,}$/i, /[\d]{8,}/];

  if (!node) return;

  // Check variable declarations
  if (node.type === "variable_declarator") {
    // Get variable name - handle different AST structures
    let variableName = "";
    let variableValue = "";

    // Try different accessor methods for name
    const nameNode =
      node.childForFieldName?.("name") ||
      node.children?.find((c) => c.type === "identifier") ||
      node.name;

    if (nameNode) {
      variableName = nameNode.text || nameNode.value || nameNode.toString();
    }

    // Try different accessor methods for value/init
    const valueNode =
      node.childForFieldName?.("init") ||
      node.children?.find(
        (c) => c.type.includes("literal") || c.type.includes("expression")
      ) ||
      node.value ||
      node.init;

    if (valueNode) {
      variableValue = valueNode.text || valueNode.value || valueNode.toString();
    }

    // Only proceed if we have both name and value
    if (variableName && variableValue) {
      // Check for credential patterns in variable name
      for (let pattern of credentialPatterns) {
        if (pattern.test(variableName)) {
          const startPosition = node.startPosition ||
            node.location?.start || { row: 0, column: 0 };
          messages.push({
            severity: 8,
            message: "Hard coded credentials detected in variable name",
            line: (startPosition.row || startPosition.line) + 1,
            column: (startPosition.column || startPosition.col) + 1,
            endColumn: 0,
          });
          break; // Avoid duplicate messages for the same variable
        }
      }

      // Check for suspicious values
      for (let valuePattern of valuePatterns) {
        if (valuePattern.test(variableValue)) {
          const startPosition = node.startPosition ||
            node.location?.start || { row: 0, column: 0 };
          const endPosition = node.endPosition ||
            node.location?.end || { row: 0, column: 0 };

          messages.push({
            severity: 8,
            message: "Possible hardcoded credential detected in value",
            line: (startPosition.row || startPosition.line) + 1,
            column: (startPosition.column || startPosition.col) + 1,
            endColumn: (endPosition.column || endPosition.col) + 1,
          });
          break; // Avoid duplicate messages for the same value
        }
      }
    }
  }

  // Also check for string literals in other contexts (e.g., function parameters)
  if (node.type?.includes("string") || node.type?.includes("literal")) {
    const value = node.text || node.value || node.toString();

    // Check if it looks like a credential
    for (let valuePattern of valuePatterns) {
      if (valuePattern.test(value)) {
        const startPosition = node.startPosition ||
          node.location?.start || { row: 0, column: 0 };

        messages.push({
          severity: 8,
          message: "Possible hardcoded credential detected in string literal",
          line: (startPosition.row || startPosition.line) + 1,
          column: (startPosition.column || startPosition.col) + 1,
          endColumn: 0,
        });
        break;
      }
    }
  }

  // Traverse children
  if (node.children && Array.isArray(node.children)) {
    for (let child of node.children) {
      traverse(child);
    }
  } else if (typeof node.forEachChild === "function") {
    // Handle TypeScript AST nodes which might use forEachChild
    node.forEachChild((child) => traverse(child));
  }
}

function detectHardcodedCredentials(node) {
  messages = []; // Clear previous results
  traverse(node);
  return messages;
}

export default detectHardcodedCredentials;
