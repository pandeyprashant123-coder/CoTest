const { ESLint } = require("eslint");
const js = require("@eslint/js");
const airbnb = require("eslint-config-airbnb-base");
const securityPlugin = require("eslint-plugin-security");
const sonarjsPlugin = require("eslint-plugin-sonarjs");
const typescriptParser = require("@typescript-eslint/parser");
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");

const baseConfig = {
  files: ["**/*.js"],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    globals: {
      node: true,
      browser: true,
    },
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
};

const typescriptConfig = {
  files: ["**/*.ts"],
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
};

const styleConfig = {
  rules: {
    ...airbnb.rules,
    indent: ["error", 2, { SwitchCase: 1 }],
    quotes: ["error", "single", { avoidEscape: true }],
    "arrow-body-style": "off",
    "no-underscore-dangle": "off",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": "error",
  },
};

// Create ESLint instance with flat config
const createLinter = () => {
  return new ESLint({
    fix: true,
    baseConfig: [baseConfig, typescriptConfig, styleConfig], // Correct format
  });
};

// Lint function
async function lintCode(code, filename = "testFile.js") {
  const eslint = createLinter();
  const results = await eslint.lintText(code, {
    filePath: filename,
    warnIgnored: true,
  });

  await ESLint.outputFixes(results);
  const formatter = await eslint.loadFormatter("stylish");
  //   console.log(formatter.format(results));
  console.log(results[0].messages);
  return results;
}

module.exports = lintCode;
