const path = require("path");
const { createBundleRenderer } = require("vue-server-renderer");
const resolve = file => path.resolve(__dirname, "../../", file);

function createRenderer(bundle, options) {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      basedir: resolve("./dist"),

      runInNewContext: false
    })
  );
}

module.exports = createRenderer;
