const babelLoader = {
  loader: "babel-loader"
};

module.exports = {
  test: /\.js$/,
  use: [babelLoader],
  exclude: /node_modules/
};
