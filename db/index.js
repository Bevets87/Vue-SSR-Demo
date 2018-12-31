const mysql = require("mysql");
const config = require("../config/env");
const Database = require("./Database");
const withSetup = require("./withSetup");
const withSeed = require("./withSeed");

const connection = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
});

const DecoratedDatabase = withSetup(withSeed(Database));

module.exports = new DecoratedDatabase(connection);
