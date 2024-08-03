"use strict";

import globals from "globals";
import pluginJs from "@eslint/js";

// Import the ESLint plugin locally
import eslintPluginExample from "./plugin-example.js";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    plugins: { example: eslintPluginExample },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "no-console": "warn",
      "example/find-payment": "error",
      "example/env-variable": "warn",
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
          message: "Unexpected property on console object was called",
        },
      ],
    },
  },
];
