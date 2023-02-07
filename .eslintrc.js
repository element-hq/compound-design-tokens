module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "prettier", "plugin:storybook/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};
