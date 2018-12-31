module.exports = app => {
  app.use((error, req, res, next) => {
    console.error(error.stack);

    res.status(500).send("Internal Server Error");
  });
};
