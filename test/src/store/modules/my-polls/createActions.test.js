import { createActions } from "../../../../../src/store/modules/my-polls/createActions";
import types from "../../../../../src/store/modules/my-polls/types";
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

describe("MyPolls Actions", () => {
  const commit = jest.fn();
  const redirect = jest.fn();
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
        Relevant: { selected: false, column: null },
        Newest: { selected: true, column: "created_at" },
        Popular: { selected: false, column: "votes" },
        "A-Z": { selected: false, column: "question" }
      },
      order: null,
      filter: ""
    }
  };
  const http = {
    get: jest.fn(() => Promise.resolve(response)),
    post: jest.fn(() => Promise.resolve()),
    delete: jest.fn(() => Promise.resolve())
  };

  let actions;

  beforeEach(() => {
    actions = createActions(http);
  });

  afterEach(() => {
    commit.mockRestore();
    redirect.mockRestore();
    http.get.mockClear();
    http.post.mockClear();
    http.delete.mockClear();
  });

  it("can fetch my polls and commit to store", async () => {
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

  it("can create a poll and redirect", async () => {
    const payload = {};
    await actions[types.CREATE]({ commit }, { payload, redirect });
    expect(redirect).toHaveBeenCalledTimes(1);
  });

  it("can delete a poll", async () => {
    const id = 1;
    await actions[types.DELETE]({ commit }, { id });
    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith(types.REMOVE_ONE, id);
  });
});
