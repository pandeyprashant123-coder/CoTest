const chalk = require("chalk");

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
    for (let pattern of credentialPatterns) {
      const value = node.childForFieldName("name")?.text;
      if (pattern.test(value)) {
        const { startPosition } = node;
        message.line = startPosition.row + 1;
        message.column = startPosition.column + 1;
        messages.push(message);
        console.log(
          chalk.red(
            `Possible hardcoded credential detected at Line ${
              startPosition ? startPosition.row + 1 : "unknown"
            }`
          )
        );
      }
    }
  }

  for (let child of node.children) {
    traverse(child);
  }
}
function detectHardcodedCredentials(node) {
  traverse(node);
  return messages;
}

module.exports = detectHardcodedCredentials;
