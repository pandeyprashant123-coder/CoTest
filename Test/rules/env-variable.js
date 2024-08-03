const regex = /^[A-Z_][A-Z0-9_]*$/;

module.exports = {
  create(context) {
    return {
      VariableDeclarator(node) {
        if (node.parent.kind === "const") {
          if (node.id.type === "Identifier" && regex.test(node.id.name)) {
            context.report({
              node: node,
              message: "These type of deceleration should be done in .env file",
            });
          }
        }
      },
    };
  },
};
