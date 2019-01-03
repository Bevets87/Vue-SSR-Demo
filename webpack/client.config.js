const path = require("path");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./base.config");
const UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

let __root = process.cwd();
let isProd = process.env.NODE_ENV === "production";

const plugins = isProd
  ? [
      new VueSSRClientPlugin(),
      new CompressionWebpackPlugin({ algorithm: "gzip" }),
      new WebpackBundleAnalyzer()
    ]
  : [new VueSSRClientPlugin()];

const clientConfig = {
  name: "client",
  entry: path.join(__root, "src", "entry-client.js"),
  devtool: isProd ? false : "eval-source-map",
  output: {
    filename: "[name].[chunkhash].js",
    path: path.join(__root, "dist", "client"),
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
        }
      }
    },
    runtimeChunk: {
      name: "manifest"
    }
  },
  plugins
};

module.exports = webpackMerge(baseConfig, clientConfig);
