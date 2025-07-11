import js from "@eslint/js";
import globals from "globals";
import pluginReact, { rules } from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig([
  reactHooks.configs["recommended-latest"],
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js, "react-hooks": reactHooks },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
  },
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
]);
