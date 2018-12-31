const factory = require("../../../db/withSeed/factory.js");

const users = factory.createFakeUsers(20);
const polls = factory.createFakePolls(users, 25);
const choices = factory.createFakeChoices(polls);
const votes = factory.createFakeVotes(users, choices);

test("it can create fake users", () => {
  expect(users.length).toEqual(20);
});

test("it can create fake polls", () => {
  expect(polls.length).toEqual(25);
});

test("it can create fake choices", () => {
  expect(choices.length).toEqual(25);
});

test("it can create fake votes", () => {
  expect(votes.length).toEqual(250);
});
