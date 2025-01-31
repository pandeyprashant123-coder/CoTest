const chalk = require("chalk");

function detectHardcodedCredentials(node) {
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

  if (node.type === "variable_declarator") {
    for (let pattern of credentialPatterns) {
      const value = node.childForFieldName("name")?.text;
      if (pattern.test(value)) {
        const { startPosition } = node;
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
    detectHardcodedCredentials(child);
  }
}

module.exports = detectHardcodedCredentials;
