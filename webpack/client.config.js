const path = require("path");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./base.config");
const UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

let __root = process.cwd();
let isProd = process.env.NODE_ENV === "production";

const clientConfig = {
  name: "client",
  entry: path.join(__root, "src", "entry-client.js"),
  devtool: isProd ? false : "eval-source-map",
  output: {
    filename: "js/[name].[chunkhash].js",
    path: path.join(__root, "dist"),
    publicPath: "/public/"
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial"
        },
        styles: {
          name: "styles",
          test: /\.scss$/,
          chunks: "all",
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: "manifest"
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProd ? "[name].[hash].css" : "[name].css"
    }),
    new VueSSRClientPlugin()
  ]
};

module.exports = webpackMerge(baseConfig, clientConfig);
