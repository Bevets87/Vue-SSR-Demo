const express = require("express");
const middleware = require("./middleware");
const serveStatic = require("./serveStatic");
const routes = require("./routes");
const renderer = require("./renderer");
const errorware = require("./errorware");

const app = express();

middleware(app);
serveStatic(app);
routes(app);
renderer(app);
errorware(app);

module.exports = app;
