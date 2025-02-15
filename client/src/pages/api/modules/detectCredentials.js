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

  // A stricter pattern for identifying actual credentials (e.g., API keys, passwords)
  const valuePatterns = [
    /^[a-zA-Z0-9-_]{32,}$/i, // Matches long alphanumeric strings (API keys, tokens)
    /[\d]{8,}/, // Matches numbers like 12345678 (potentially a weak password)
  ];

  if (!node) {
    return;
  }
  let message = {
    severity: 2,
    message: "Hard coded credentials detected",
    line: 0,
    column: 0,
  };

  if (node.type === "variable_declarator") {
    const variableName = node.childForFieldName("name")?.text;
    const variableValue = node.childForFieldName("init")?.text; // Assuming the value is in 'init'

    // Skip checking if there's no value assigned
    if (variableValue) {
      // Check for patterns in both name and value
      for (let pattern of credentialPatterns) {
        if (pattern.test(variableName) || pattern.test(variableValue)) {
          const { startPosition } = node;
          message.line = startPosition.row + 1;
          message.column = startPosition.column + 1;
          messages.push(message);
        }
      }

      // Now check if the variable's value itself matches a credential-like pattern (like a key or password)
      for (let valuePattern of valuePatterns) {
        if (valuePattern.test(variableValue)) {
          const { startPosition } = node;
          message.line = startPosition.row + 1;
          message.column = startPosition.column + 1;
          message.message = "Possible hardcoded credential detected in value";
          messages.push(message);
        }
      }
    }
  }

  for (let child of node.children) {
    traverse(child);
  }
}

function detectHardcodedCredentials(node) {
  messages = []; // Clear previous results
  traverse(node);
  return messages;
}

export default detectHardcodedCredentials;
