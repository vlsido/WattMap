import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import pluginQuery from "@tanstack/eslint-plugin-query";
import eslintConfigPrettierFlat from "eslint-config-prettier/flat";
import testingLibrary from "eslint-plugin-testing-library";

export default [
  ...pluginQuery.configs["flat/recommended"],
  ...tseslint.configs.recommended,
  eslintConfigPrettierFlat,
  {
    files: ["**/*.{jsx,ts,tsx}"],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "prefer-const": "off",
      "no-async-promise-executor": ["error"],
      "no-await-in-loop": ["error"],
      "no-fallthrough": ["warn"],
      "no-promise-executor-return": ["error", { allowVoid: true }],
      "no-obj-calls": ["error"],
      "no-unreachable-loop": ["warn"],
      "no-invalid-regexp": ["error"],
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    plugins: {
      "testing-library": testingLibrary,
    },
    rules: {
      ...testingLibrary.configs.react.rules,
    },
  },
];
