import mutations from "../../../../../src/store/modules/poll-details/mutations";
import types from "../../../../../src/store/modules/poll-details/types";

describe("PollDetails Mutations", () => {
  const fakePollDetails = {
    id: 1,
    question: "Is this a test?",
    choices: [
      { id: 1, value: "yes", votes: 0 },
      { id: 2, value: "no", votes: 0 }
    ]
  };

  const fakeError = {
    message: "failed"
  };

  it("can set poll details data", () => {
    const state = { data: null };
    mutations[types.DATA](state, fakePollDetails);
    expect(state.data).toMatchObject(fakePollDetails);
  });

  it("can clear poll details data", () => {
    const state = { data: fakePollDetails };
    mutations[types.CLEAR_DATA](state);
    expect(state.data).toBeNull();
  });

  it("can set error", () => {
    const state = { error: null };
    mutations[types.ERROR](state, fakeError);
    expect(state.error).toMatchObject(fakeError);
  });

  it("can clear error", () => {
    const state = { error: fakeError };
    mutations[types.CLEAR_ERROR](state);
    expect(state.error).toBeNull();
  });

  it("can set loading to true", () => {
    const state = { loading: false };
    mutations[types.IS_LOADING](state);
    expect(state.loading).toBeTruthy();
  });

  it("can set loading to false", () => {
    const state = { loading: true };
    mutations[types.IS_NOT_LOADING](state);
    expect(state.loading).toBeFalsy();
  });

  it("can increment choice vote count", () => {
    const state = { data: fakePollDetails };
    mutations[types.INCREMENT_VOTE_COUNT](state, 1);
    expect(state.data.choices[0].votes).toEqual(1);
  });

  it("can reset state", () => {
    const state = { data: fakePollDetails, loading: true, error: fakeError };
    mutations[types.RESET_STATE](state);
    expect(state.data).toBeNull();
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });
});
