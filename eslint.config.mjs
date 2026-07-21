import js from "@eslint/js";
import tseslint from "typescript-eslint";
import securityPlugin from "eslint-plugin-security";
import noSecretsPlugin from "eslint-plugin-no-secrets";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...securityPlugin.configs.recommended,
  },
  {
    plugins: { "no-secrets": noSecretsPlugin },
    rules: {
      "no-secrets/no-secrets": "warn",
    },
  },
  {
    rules: {
      "no-eval": "error",
      "no-implied-eval": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  }
);
