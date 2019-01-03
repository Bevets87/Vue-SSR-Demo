const path = require("path");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

let __root = process.cwd();
let isProd = process.env.NODE_ENV === "production";

const styleLoader = {
  loader: "vue-style-loader"
};

const cssLoader = { loader: "css-loader" };

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer")]
  }
};

const sassLoader = {
  loader: "sass-loader",
  options: {
    includePaths: [path.join(__root, "src", "client", "styles")]
  }
};

module.exports = {
  test: /\.scss$/,
  use: [styleLoader, cssLoader, postcssLoader, sassLoader]
};
