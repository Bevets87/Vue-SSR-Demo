import types from "./types";
import { createState } from "./createState";

export default {
  [types.AUTH](state) {
    state.authenticated = true;
  },
  [types.UNAUTH](state) {
    const newState = createState();
    state = Object.assign(state, newState);
  },
  [types.AUTH_ERROR](state, error) {
    state.error = error;
  },
  [types.CLEAR_AUTH_ERROR](state) {
    state.error = null;
  }
};
