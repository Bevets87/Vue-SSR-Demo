import types from "./types";

export default {
  [types.RESET_STORE]({ commit }) {
    commit("unauth");
    commit("pollDetails/reset_state");
    commit("myPolls/reset_state");
    commit("polls/reset_state");
  }
};
