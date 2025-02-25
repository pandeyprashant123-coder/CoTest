// eslint.config.js
import js from "@eslint/js";
import airbnb from "eslint-config-airbnb-base";
import securityPlugin from "eslint-plugin-security";
import sonarjsPlugin from "eslint-plugin-sonarjs";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: undefined, // Use default Espree parser for JavaScript
    },
    plugins: {
      security: securityPlugin,
      sonarjs: sonarjsPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...securityPlugin.configs.recommended.rules,
      ...sonarjsPlugin.configs.recommended.rules,
      complexity: ["error", 5],
      "max-depth": ["error", 3],
      "no-unsafe-optional-chaining": "error",
      "security/detect-object-injection": "error",
      "no-await-in-loop": "error",
      "no-promise-executor-return": "error",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
    },
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    rules: {
      ...airbnb.rules,
      indent: ["error", 2, { SwitchCase: 1 }],
      quotes: ["error", "single", { avoidEscape: true }],
      "arrow-body-style": "off",
      "no-underscore-dangle": "off",
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
      "no-debugger": "error",
    },
  },
];
