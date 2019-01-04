const seed = require("./seed");
const queries = require("./queries");

module.exports = Database => {
  if (process.env.NODE_ENV === "development") {
    Database.prototype.seed = function(options) {
      const { users, polls, choices, votes } = seed(options);
      return this.query(queries.users(), [users])
        .then(() => this.query(queries.polls(), [polls]))
        .then(() =>
          Promise.all(choices.map(c => this.query(queries.choices(), [c])))
        )
        .then(() => this.query(queries.votes(), [votes]));
    };
  } else {
    Database.prototype.seed = function(options) {
      return Promise.resolve(options);
    };
  }

  return Database;
};
