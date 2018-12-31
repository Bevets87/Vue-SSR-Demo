const seed = require("../../../db/withSeed/seed");

const { users, polls, choices, votes } = seed({ users: 10, polls: 10 });

test("it has 10 users with id of index removed", () => {
  expect(users.length).toEqual(10);
});

test("it has 10 polls with id of index removed", () => {
  expect(polls.length).toEqual(10);
});

test("it has 3 choices per poll with id of index removed", () => {
  const totalChoices = [];
  choices.forEach(c => {
    c.forEach(choice => {
      totalChoices.push(choice);
    });
  });
  expect(totalChoices.length).toEqual(30);
});

test("it has 100 votes 10 per poll", () => {
  expect(votes.length).toEqual(100);
});
