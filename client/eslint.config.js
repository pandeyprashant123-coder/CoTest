import js from "@eslint/js";
import airbnb from "eslint-config-airbnb-base";
import securityPlugin from "eslint-plugin-security";
import sonarjsPlugin from "eslint-plugin-sonarjs";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  {
    files: ["**/*.js", "**/*.jsx", "**/*.cjs"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      //1
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      security: securityPlugin,
      sonarjs: sonarjsPlugin,
      react,
      "react-hooks": reactHooks,
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
      "react/jsx-uses-react": "warn",
      "react/react-in-jsx-scope": "warn",
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": "off",
      "max-lines": ["warn", 500],
      "max-nested-callbacks": ["error", 3],
      "max-params": ["error", 3],
      "max-depth": ["warn", 3],
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
      "arrow-body-style": "off",
      "no-underscore-dangle": "off",
      "no-debugger": "error",
    },
  },
];
