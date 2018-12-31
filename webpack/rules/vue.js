const isProd = process.env.NODE_ENV === "production";

const vueLoader = {
  loader: "vue-loader",
  options: {
    extractCSS: isProd
  }
};

module.exports = {
  test: /\.vue$/,
  use: [vueLoader]
};
