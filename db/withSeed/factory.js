const faker = require("faker");

exports.createFakeUsers = amount => {
  const fakeUsers = [];
  let count = 0;
  while (amount > 0) {
    let id = count + 1;
    let password = `password-${id}`;
    let username = `test-${id}@test.com`;
    fakeUsers.push([id, username, password]);
    count++;
    amount--;
  }
  return fakeUsers;
};

exports.createFakeVotes = (users, choices) => {
  const fakeVotes = [];
  const getRandom = choices => {
    let randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const getRandomUsers = amount => {
    const copyOfUsers = users.slice();
    const randomUsers = [];
    while (amount > 0) {
      let totalUsers = copyOfUsers.length;
      let randomIndex = Math.floor(Math.random() * totalUsers);
      let [removed] = copyOfUsers.splice(randomIndex, 1);
      randomUsers.push(removed);
      amount--;
    }
    return randomUsers;
  };

  choices.forEach((c, pIndex) => {
    getRandomUsers(getRandom([10, 20, 5])).forEach(u => {
      let choice = getRandom(c);
      fakeVotes.push([choice[0], choice[2], u[0]]);
    });
  });
  return fakeVotes;
};

exports.createFakeChoices = polls => {
  const fakeChoices = [];
  polls.forEach((p, i) => {
    let multiplier = i * 3;
    let idOne = multiplier + 1;
    let idTwo = multiplier + 2;
    let idThree = multiplier + 3;
    fakeChoices.push([
      [idOne, faker.lorem.word(), p[0]],
      [idTwo, faker.lorem.word(), p[0]],
      [idThree, faker.lorem.word(), p[0]]
    ]);
  });
  return fakeChoices;
};

exports.createFakePolls = (users, amount) => {
  const fakePolls = [];
  let totalUsers = users.length;
  let totalRemainingPolls = amount % totalUsers;
  let totalPollsPerUser = Math.floor(amount / totalUsers);
  let id = 1;
  users.forEach((u, i) => {
    let pollCount = totalPollsPerUser;
    while (pollCount > 0) {
      fakePolls.push([id, faker.lorem.sentence(), u[0]]);
      id++;
      pollCount--;
    }
    if (totalRemainingPolls > 0) {
      fakePolls.push([id, faker.lorem.sentence(), u[0]]);
      totalRemainingPolls--;
      id++;
    }
  });
  return fakePolls;
};
