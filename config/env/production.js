const db = {
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
};

const port = process.env.HOST;

const session = {
  key: process.env.SESSION_KEY,
  secret: process.env.SESSION_SECRET
};

const base = {
  url: process.env.BASE_URL
};

module.exports = {
  db,
  port,

  base,
  session
};
