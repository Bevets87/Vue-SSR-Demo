const db = require("./db");
const server = require("./server");
const config = require("./config/env");

const initDB = () => {
  return db
    .dropTables()
    .then(() => db.setupTables())
    .then(() => db.seed({ users: 100, polls: 100 }));
};

db.connect()
  .then(() => initDB())
  .then(() => {
    server.listen(config.port, () => {
      console.log(`listening on port: ${config.port}`);
    });
  })
  .catch(error => {
    console.error(error.stack);
    process.exit(1);
  });
