const createUsersTable = require('./createUsersTable')
const createPollsTable = require('./createPollsTable')
const createVotesTable = require('./createVotesTable')
const createChoicesTable = require('./createChoicesTable')
const dropTable = require('./dropTable')

const withSetup = (Database) => {
  Database.prototype.setupTables = function() {
    return Promise.all([
      this.query(createUsersTable()),
      this.query(createPollsTable()),
      this.query(createChoicesTable()),
      this.query(createVotesTable())
    ])
  }
  Database.prototype.dropTables = function() {
    return this.query(dropTable('votes'))
    .then(() => this.query(dropTable('choices')))
    .then(() => this.query(dropTable('polls')))
    .then(() => this.query(dropTable('users')))
  }
  return Database
}

module.exports = withSetup