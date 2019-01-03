const fs = require("fs");
const chokidar = require("chokidar");
const MemoryFs = require("memory-fs");
const path = require("path");
const Observable = require("./utils/Observable");
const clientConfig = require("./client.config");
const serverConfig = require("./server.config");
const webpack = require("webpack");

class SSRDevServer extends Observable {
  constructor() {
    super();
    this.app = null;
    this.templatePath = null;
    this.template = null;
    this.bundle = null;
    this.ready = null;
    this.clientManifest = null;
    this.clientCompiler = null;
    this.serverCompiler = null;
    this.devMiddleware = null;
    this.hotMiddleware = null;
  }
  setTemplatePath(templatePath) {
    this.templatePath = templatePath;
  }
  setApp(app) {
    this.app = app;
  }
  setup() {
    const readyPromise = new Promise(resolve => {
      this.ready = resolve;
    });
    this.build();
    this.watch();
    return readyPromise;
  }
  build() {
    if (this.app && this.templatePath) {
      this.createTemplate();
      this.createClientCompiler();
      this.createServerCompiler();
      this.createDevMiddlware();
      this.createHotMiddleware();
      this.applyMiddleware();
    }
  }
  watch() {
    if (this.app && this.templatePath) {
      this.watchTemplate();
      this.watchClientManifest();
      this.watchBundle();
    }
  }
  readFile(fs, file) {
    try {
      return fs.readFileSync(
        path.join(clientConfig.output.path, file),
        "utf-8"
      );
    } catch (error) {
      console.error(error);
    }
  }
  onUpdate(handler) {
    this.subscribe("update", handler);
  }
  getUpdateData() {
    const bundle = this.bundle;
    const template = this.template;
    const clientManifest = this.clientManifest;
    return { bundle, template, clientManifest };
  }
  update() {
    if (this.bundle && this.clientManifest) {
      this.ready();
      this.notify("update", this.getUpdateData());
    }
  }
  createDevMiddlware() {
    const clientCompiler = this.clientCompiler;
    const devMiddleware = require("webpack-dev-middleware")(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
      noInfo: true
    });
    this.devMiddleware = devMiddleware;
  }
  createHotMiddleware() {
    const clientCompiler = this.clientCompiler;
    const hotMiddleware = require("webpack-hot-middleware")(clientCompiler);
    this.hotMiddleware = hotMiddleware;
  }
  applyMiddleware() {
    const devMiddleware = this.devMiddleware;
    const hotMiddleware = this.hotMiddleware;
    this.app.use(devMiddleware);
    this.app.use(hotMiddleware);
  }
  createTemplate() {
    if (this.templatePath) {
      this.template = fs.readFileSync(this.templatePath, "utf-8");
    }
  }
  createClientCompiler() {
    clientConfig.entry = ["webpack-hot-middleware/client", clientConfig.entry];
    clientConfig.output.path = path.join(process.cwd(), "dist");
    clientConfig.output.filename = "[name].js";
    clientConfig.output.publicPath = "/public/";
    clientConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    );
    this.clientCompiler = webpack(clientConfig);
  }
  createServerCompiler() {
    const serverCompiler = webpack(serverConfig);
    const memoryFs = new MemoryFs();

    serverCompiler.outputFileSystem = memoryFs;
    this.serverCompiler = serverCompiler;
  }
  watchTemplate() {
    const templatePath = this.templatePath;
    chokidar.watch(templatePath).on("change", () => {
      this.template = fs.readFileSync(templatePath, "utf-8");
      console.log("index.html template updated.");
      this.update();
    });
  }
  watchClientManifest() {
    this.clientCompiler.plugin("done", stats => {
      stats = stats.toJson();
      stats.errors.forEach(err => console.error(err));
      stats.warnings.forEach(err => console.warn(err));
      if (stats.errors.length) return;
      this.clientManifest = JSON.parse(
        this.readFile(
          this.devMiddleware.fileSystem,
          "vue-ssr-client-manifest.json"
        )
      );
      this.update();
    });
  }
  watchBundle() {
    this.serverCompiler.watch({}, (error, stats) => {
      if (error) throw error;
      const { errors } = stats.toJson();
      if (errors.length) return;
      this.bundle = JSON.parse(
        this.readFile(
          this.serverCompiler.outputFileSystem,
          "vue-ssr-server-bundle.json"
        )
      );
      console.log(stats.toString({ colors: true }));
      this.update();
    });
  }
}

module.exports = SSRDevServer;
