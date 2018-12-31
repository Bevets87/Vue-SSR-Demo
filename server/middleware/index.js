const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const noFavicon = require("no-favicon");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const config = require("../../config/env");

const sessionStore = new MySQLStore({
  host: config.db.host,
  port: config.db.port,
  password: config.db.password,
  user: config.db.user,
  database: config.db.database
});

module.exports = app => {
  app.use(noFavicon());
  app.use(compression());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(helmet());
  app.use(
    session({
      secret: config.session.secret,
      store: sessionStore,
      saveUninitialized: false,
      resave: false
    })
  );
};
