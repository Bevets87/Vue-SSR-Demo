const apiRouter = require("./api");
const authRouter = require("./auth");

module.exports = app => {
  app.use("/auth", authRouter);
  app.use("/api", apiRouter);
};
