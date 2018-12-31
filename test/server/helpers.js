const db = require("../../db");
const faker = require("faker");
const users = require("../../server/data/users");
const polls = require("../../server/data/polls");
const votes = require("../../server/data/votes");
const choices = require("../../server/data/choices");

const setupDB = () => {
  return db.connect().then(() => db.setupTables());
};

const cleanupDB = () => {
  return db.dropTables().then(() => db.disconnect());
};

const getPollIds = () => {
  const pollIds = [];
  for (let i = 0; i < 10; i++) {
    pollIds.push(i);
  }
  return pollIds;
};

const getUserIds = () => {
  const userIds = [];
  for (let i = 0; i < 100; i++) {
    userIds.push(i);
  }
  return userIds;
};

const getChoiceIds = () => {
  const choiceIds = [];
  let count = 0;
  for (let i = 0; i < 10; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      row.push(count++);
    }
    choiceIds.push(row);
  }

  return choiceIds;
};

const createQuestion = () => {
  return faker.lorem.sentence();
};

const createChoice = () => {
  return faker.lorem.word();
};

const insertUsers = () => {
  const data = [];
  getUserIds().forEach(() => {
    data.push([faker.internet.userName(), faker.internet.password()]);
  });
  return users.createMany(data);
};

const fakeAsync = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

const insertPolls = () => {
  const data = [];
  getPollIds().forEach((id, i) => {
    data.push([createQuestion(), (i + 1) * 10]);
  });
  const first = data.shift();
  const last = data.pop();
  return polls
    .createMany([first])
    .then(() => fakeAsync())
    .then(() => polls.createMany(data))
    .then(() => fakeAsync())
    .then(() => {
      return polls.createMany([last]);
    });
};

const insertChoices = () => {
  const data = [];
  getChoiceIds().forEach((poll, pollIndex) => {
    poll.forEach(() => {
      data.push([createChoice(), pollIndex + 1]);
    });
  });
  return choices.createMany(data);
};

const insertVotes = () => {
  const data = [];

  getPollIds().forEach(pollId => {
    let userIds = getUserIds();
    let count = [5, 0, 15, 10];
    let choices = getChoiceIds()[pollId];
    let thisCount = count[Math.floor(Math.random() * count.length)];
    while (thisCount > 0) {
      let [userId] = userIds.splice(
        Math.floor(Math.random() * userIds.length),
        1
      );
      let choiceId = choices[Math.floor(Math.random() * choices.length)];
      data.push([choiceId + 1, pollId + 1, userId + 1]);
      thisCount--;
    }
  });
  return votes.createMany(data);
};

const seedDB = () => {
  return insertUsers()
    .then(insertPolls)
    .then(insertChoices)
    .then(insertVotes);
};

module.exports = {
  setupDB,
  cleanupDB,
  seedDB
};
