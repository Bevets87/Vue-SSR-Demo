module.exports = {
  env: {
    development: {
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false
          }
        ]
      ],
      plugins: ["@babel/plugin-syntax-dynamic-import"]
    },
    production: {
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false
          }
        ]
      ],
      plugins: ["@babel/plugin-syntax-dynamic-import"]
    },
    testing: {
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false
          }
        ]
      ],
      plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-transform-modules-commonjs"
      ]
    }
  }
};
