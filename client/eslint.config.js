import js from "@eslint/js";
import next from "eslint-config-next";
import airbnb from "eslint-config-airbnb-base";
import securityPlugin from "eslint-plugin-security";
import sonarjsPlugin from "eslint-plugin-sonarjs";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
  next, // ✅ Next.js rules

  {
    files: ["**/*.js", "**/*.jsx", "**/*.cjs"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    plugins: {
      security: securityPlugin,
      sonarjs: sonarjsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    settings: {
      react: {
        version: "detect", // ✅ Auto-detect React version
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...securityPlugin.configs.recommended.rules,
      ...sonarjsPlugin.configs.recommended.rules,
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      complexity: ["error", 5],
      "max-depth": ["error", 3],
      "no-unsafe-optional-chaining": "error",
      "security/detect-object-injection": "error",
      "no-await-in-loop": "error",
      "no-promise-executor-return": "error",
    },
  },

  {
    files: ["**/*.cjs"], // CommonJS files
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
    },
    rules: {
      "no-var": "off",
      "prefer-const": "warn",
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
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx", "**/*.cjs"],
    rules: {
      ...airbnb.rules,
      indent: ["error", 2, { SwitchCase: 1 }],
      quotes: ["error", "single", { avoidEscape: true }],
      "arrow-body-style": "off",
      "no-underscore-dangle": "off",
      "no-debugger": "error",
    },
  },
];
