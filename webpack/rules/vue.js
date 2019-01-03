const isProd = process.env.NODE_ENV === "production";

const vueLoader = {
  loader: "vue-loader"
};

module.exports = {
  test: /\.vue$/,
  use: [vueLoader]
};
