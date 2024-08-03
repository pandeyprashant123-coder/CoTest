const findPayment = require("./rules/find-payment");
const envVariable = require("./rules/env-variable");

const plugin = {
  rules: {
    "find-payment": findPayment,
    "env-variable": envVariable,
  },
};
module.exports = plugin;
