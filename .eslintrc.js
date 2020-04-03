module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ["airbnb", "plugin:prettier/recommended"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": [0],
    "react/destructuring-assignment": [0, "always"],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "no-param-reassign": [0],
    "jsx-a11y/click-events-have-key-events": [0],
    "jsx-a11y/interactive-supports-focus": [0],
    "react/jsx-closing-bracket-location": [0],
    "react/jsx-props-no-spreading": [0],
    "react/jsx-wrap-multilines": [0],
    "no-underscore-dangle": [0],
    "react/jsx-one-expression-per-line": [0]
  }
};
