import { createActions } from "../../../../../src/store/modules/polls/createActions";
import types from "../../../../../src/store/modules/polls/types";
import faker from "faker";

const createPolls = () => {
  const polls = [];
  for (let i = 1; i < 21; i++) {
    polls.push({
      id: i,
      question: faker.lorem.sentence(),
      creator: faker.internet.userName(),
      votes: i,
      created_at: faker.date.recent(i)
    });
  }
  return polls;
};

describe("Polls Actions", () => {
  const commit = jest.fn();

  const response = {
    data: {
      collection: createPolls(),
      count: 20
    }
  };

  const state = {
    options: {
      limit: 20,
      offset: 0,
      sort: {
        Relevant: { selected: true, column: null },
        Newest: { selected: false, column: "created_at" },
        Popular: { selected: false, column: "votes" },
        "A-Z": { selected: false, column: "question" }
      },
      order: null,
      filter: ""
    }
  };
  const http = {
    get: jest.fn(() => Promise.resolve(response))
  };

  let actions;

  beforeEach(() => {
    actions = createActions(http);
  });

  afterEach(() => {
    commit.mockRestore();

    http.get.mockClear();
  });

  it("can fetch all polls and commit to store", async () => {
    await actions[types.FETCH_DATA]({ commit, state });
    expect(commit).toHaveBeenCalledTimes(3);
    expect(commit).toHaveBeenNthCalledWith(1, types.IS_NOT_LOADING);
    expect(commit).toHaveBeenNthCalledWith(
      2,
      types.DATA,
      response.data.collection
    );
    expect(commit).toHaveBeenNthCalledWith(3, types.COUNT, response.data.count);
  });
});
