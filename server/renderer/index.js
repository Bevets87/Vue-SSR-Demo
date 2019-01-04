const createRenderer = require("./createRenderer");
const path = require("path");
const render = require("./render");
const templatePath = path.join(process.cwd(), "src", "index.template.html");

let isProd = process.env.NODE_ENV === "production";
let isTest = process.env.NODE_ENV === "testing";

module.exports = app => {
  if (isTest) return;
  let renderer, readyPromise;

  if (isProd) {
    const fs = require("fs");
    const template = fs.readFileSync(templatePath, "utf-8");
    const bundle = require("../../dist/vue-ssr-server-bundle.json");

    const clientManifest = require("../../dist/vue-ssr-client-manifest.json");
    renderer = createRenderer(bundle, {
      template,
      clientManifest
    });
  } else {
    const WebpackSSRDevServer = require("../../webpack/SSRDevServer");
    const ssrDevServer = new WebpackSSRDevServer();
    ssrDevServer.setApp(app);
    ssrDevServer.setTemplatePath(templatePath);
    ssrDevServer.onUpdate(({ bundle, template, clientManifest }) => {
      renderer = createRenderer(bundle, {
        template,
        clientManifest
      });
    });
    readyPromise = ssrDevServer.setup();
  }

  app.get(
    "*",
    isProd
      ? (req, res) => {
          render(renderer)(req, res);
        }
      : (req, res) => readyPromise.then(() => render(renderer)(req, res))
  );
};
