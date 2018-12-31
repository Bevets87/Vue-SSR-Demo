import types from "./types";
import { createState } from "./createState";

export default {
  [types.DATA](state, data) {
    state.data = data;
  },
  [types.CLEAR_DATA](state) {
    state.data = null;
  },
  [types.IS_LOADING](state) {
    state.loading = true;
  },
  [types.IS_NOT_LOADING](state) {
    state.loading = false;
  },
  [types.ERROR](state, error) {
    state.error = error;
  },
  [types.CLEAR_ERROR](state) {
    state.error = null;
  },
  [types.INCREMENT_VOTE_COUNT](state, choiceId) {
    state.data.choices = state.data.choices.map(c => {
      if (c.id === choiceId) {
        c.votes++;
      }
      return c;
    });
  },
  [types.DECREMENT_VOTE_COUNT](state, choiceId) {
    state.data.choices = state.data.choices.map(c => {
      if (c.id === choiceId) {
        c.votes--;
      }
      return c;
    });
  },
  [types.RESET_STATE](state) {
    const newState = createState();
    state = Object.assign(state, newState);
  }
};
