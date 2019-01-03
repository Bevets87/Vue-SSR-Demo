import { createActions } from "../../../../../src/store/modules/poll-details/createActions";
import types from "../../../../../src/store/modules/poll-details/types";

describe("PollDetails Actions", () => {
  const commit = jest.fn();
  const response = { data: {} };
  const http = {
    get: jest.fn(() => Promise.resolve(response)),
    put: jest.fn(() => Promise.resolve())
  };

  let actions;

  beforeEach(() => {
    actions = createActions(http);
  });

  afterEach(() => {
    commit.mockRestore();

    http.get.mockClear();
    http.put.mockClear();
  });

  it("can fetch poll details data and commit to store", async () => {
    const id = 1;
    await actions[types.FETCH_DATA]({ commit }, { id });
    expect(commit).toHaveBeenCalledTimes(2);
    expect(commit).toHaveBeenNthCalledWith(1, types.IS_NOT_LOADING);
    expect(commit).toHaveBeenNthCalledWith(2, types.DATA, response.data);
  });

  it("can update poll details data and commit to store", async () => {
    const pollId = 1;
    const choiceId = 1;
    await actions[types.UPDATE]({ commit }, { pollId, choiceId });
    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith(types.INCREMENT_VOTE_COUNT, choiceId);
  });
});
