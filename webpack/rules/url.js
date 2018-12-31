const urlLoader = {
  loader: "url-loader",
  options: {
    limit: 10000
  }
};

module.exports = {
  test: /\.(png|jpg|gif|svg)$/,
  use: [urlLoader]
};
