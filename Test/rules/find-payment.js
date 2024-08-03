module.exports = {
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.name == "getPayments") {
          context.report({
            node: node,
            message: "getPayments is depricated. Use getLatestPayment instead",
          });
        }
      },
    };
  },
};
