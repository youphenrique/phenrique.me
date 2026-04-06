import globals from "globals";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default defineConfig(
  // 1. Global ignores (replaces .eslintignore or not having it)
  {
    ignores: ["node_modules/**", "dist/**", ".astro/**", "styled-system/**", ".agents/**"],
  },

  // 2. Base recommended rules (replaces "eslint:recommended")
  js.configs.recommended,

  // 3. TypeScript recommended (replaces "plugin:@typescript-eslint/recommended")
  // ...tseslint.configs.recommended,

  tseslint.configs.strict,
  tseslint.configs.stylistic,

  // 4. Astro recommended (replaces "plugin:astro/recommended")
  astro.configs.recommended,

  // 5. Global settings (replaces top-level env + parserOptions)
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // replaces env: { node, browser, es2024 }
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double", { allowTemplateLiterals: true }],
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
);
