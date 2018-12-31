const webpack = require("webpack");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const vueRules = require("./rules/vue");
const jsRules = require("./rules/js");
const scssRules = require("./rules/scss");
const urlRules = require("./rules/url");

let isProd = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProd ? "production" : "development",
  module: {
    rules: [vueRules, jsRules, scssRules, urlRules]
  },
  plugins: isProd
    ? [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
          proccess: {
            env: {
              NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
          }
        })
      ]
    : [new VueLoaderPlugin(), new FriendlyErrorsPlugin()]
};
