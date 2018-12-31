const factory = require("./factory");
const bcrypt = require("bcrypt");

const seed = options => {
  const users = factory.createFakeUsers(options.users);
  const polls = factory.createFakePolls(users, options.polls);
  const choices = factory.createFakeChoices(polls);
  const votes = factory.createFakeVotes(users, choices);

  const removeIds = collection => {
    collection.splice(0, 1);
    return collection;
  };
  const hashPasswords = user => {
    const passwordHash = bcrypt.hashSync(user[1], 10);
    user.splice(1, 1, passwordHash);
    return user;
  };

  return {
    users: users.map(removeIds).map(hashPasswords),
    polls: polls.map(removeIds),
    choices: choices.map(c => c.map(removeIds)),
    votes
  };
};

module.exports = seed;
