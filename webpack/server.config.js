const path = require("path");
const webpack = require("webpack");
const WebpackNodeExternals = require("webpack-node-externals");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./base.config.js");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");

let __root = process.cwd();

const serverConfig = {
  name: "server",
  target: "node",
  devtool: "source-map",
  entry: path.join(__root, "src", "entry-server.js"),
  output: {
    filename: "server-bundle.js",
    libraryTarget: "commonjs2"
  },
  externals: new WebpackNodeExternals({
    whitelist: [/\.scss$/, /\.vue$/, /@babel\/polyfill/]
  }),
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new VueSSRServerPlugin()
  ]
};

module.exports = webpackMerge(baseConfig, serverConfig);
