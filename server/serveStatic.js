const express = require("express");
const path = require("path");

module.exports = app => {
  if (process.env.NODE_ENV === "production") {
    app.use(
      "/public",
      express.static(path.join(process.cwd(), "dist", "client"))
    );
  }
};
