import types from "./types";
import { createState } from "./createState";

export default {
  [types.COUNT](state, count) {
    state.count = count;
  },
  [types.RESET_COUNT](state) {
    state.count = 0;
  },
  [types.FILTER](state, filter) {
    state.options.filter = filter;
  },
  [types.CLEAR_FILTER](state) {
    state.options.filter = "";
  },
  [types.SORT](state, sort) {
    state.options.sort["Relevant"].selected = false;
    state.options.sort["Newest"].selected = false;
    state.options.sort["Popular"].selected = false;
    state.options.sort["A-Z"].selected = false;
    if (state.options.sort[sort]) {
      state.options.sort[sort].selected = true;
    } else {
      state.options.sort["Newest"].selected = true;
    }
  },
  [types.RESET_SORT](state) {
    state.options.sort["Relevant"].selected = false;
    state.options.sort["Newest"].selected = true;
    state.options.sort["Popular"].selected = false;
    state.options.sort["A-Z"].selected = false;
  },
  [types.ORDER](state, order) {
    state.options.order = order;
  },
  [types.CLEAR_ORDER](state) {
    state.options.order = null;
  },
  [types.OFFSET](state, offset) {
    state.options.offset = offset;
  },
  [types.RESET_OFFSET](state) {
    state.options.offset = 0;
  },
  [types.DATA](state, data) {
    data.forEach(d => {
      state.data.push(d);
    });
  },
  [types.CLEAR_DATA](state) {
    state.data.splice(0, state.data.length);
  },
  [types.IS_LOADING](state) {
    state.loading = true;
  },
  [types.IS_NOT_LOADING](state) {
    state.loading = false;
    state.loading_next = false;
  },
  [types.ERROR](state, error) {
    state.error = error;
  },
  [types.CLEAR_ERROR](state) {
    delete state.error;
    state.error = null;
  },
  [types.RESET_STATE](state) {
    const newState = createState();
    state = Object.assign(state, newState);
  },
  [types.IS_LOADING_NEXT](state) {
    state.loading_next = true;
  },
  [types.REMOVE_ONE](state, id) {
    state.data = state.data.filter(poll => poll.id !== id);
  }
};
