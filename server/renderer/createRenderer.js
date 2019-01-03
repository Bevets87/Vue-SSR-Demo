const path = require("path");
const { createBundleRenderer } = require("vue-server-renderer");

function createRenderer(bundle, options) {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      basedir: path.join(process.cwd(), "dist"),

      runInNewContext: false
    })
  );
}

module.exports = createRenderer;
