import actions from "../../../src/store/actions";
import types from "../../../src/store/types";

test("it can reset store", () => {
  const commit = jest.fn();
  actions[types.RESET_STORE]({ commit });
  expect(commit).toHaveBeenCalledTimes(4);
  expect(commit).toHaveBeenNthCalledWith(1, "unauth");
  expect(commit).toHaveBeenNthCalledWith(2, "pollDetails/reset_state");
  expect(commit).toHaveBeenNthCalledWith(3, "myPolls/reset_state");
  expect(commit).toHaveBeenNthCalledWith(4, "polls/reset_state");
});
