/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: [
    "react", "react-hooks", "@typescript-eslint", "prettier"
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "camelcase": "error",
    "spaced-comment": "error",
    "quotes": ["error", "double"],
    "no-duplicate-imports": "error",
    "@typescript-eslint/ban-ts-comment": "off",
    "react/display-name": "off",
  },
  settings: {
    "import/resolver": {
      "typescript": {}
    }
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __UPLOADS__: true,
  }
}