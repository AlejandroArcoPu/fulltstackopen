import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["node_modules, dist, eslint.config.js, vite.config.js"] },
  {
    env: {
      browser: true,
      es2020: true,
      "vitest-globals/env": true,
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/prop-types": 0,
      "react/jsx-no-target-blank": "off",
      "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx"] }],
      "react/jsx-pascal-case": [2],
      "react/no-multi-comp": [2, { ignoreStateless: true }],
      "react/jsx-closing-bracket-location": [2, "tag-aligned"],
      "react/jsx-closing-tag-location": [2, "tag-aligned"],
      quotes: ["error", "single"],
      "linebreak-style": ["error", "unix"],
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
