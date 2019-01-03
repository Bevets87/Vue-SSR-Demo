import mutations from "../../../../../src/store/modules/my-polls/mutations";
import { createState } from "../../../../../src/store/modules/my-polls/createState";
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

describe("MyPolls Mutations", () => {
  const error = { message: "failed" };

  it("can set data", () => {
    const data = createPolls();
    const state = { data: [] };
    mutations[types.DATA](state, data);
    expect(state.data).toMatchObject(data);
  });
  it("can set loading to true", () => {
    const state = { loading: false };
    mutations[types.IS_LOADING](state);
    expect(state.loading).toBeTruthy();
  });
  it("can set loading_next to true", () => {
    const state = { loading_next: false };
    mutations[types.IS_LOADING_NEXT](state);
    expect(state.loading_next).toBeTruthy();
  });
  it("can set error", () => {
    const state = { error: null };
    mutations[types.ERROR](state, error);
    expect(state.error).toMatchObject(error);
  });
  it("can set count", () => {
    const state = { count: 0 };
    mutations[types.COUNT](state, 20);
    expect(state.count).toEqual(20);
  });
  it("can set filter", () => {
    const state = { options: { filter: "" } };
    mutations[types.FILTER](state, "search term");
    expect(state.options.filter).toContain("search term");
  });
  it("can set sort", () => {
    const state = createState();
    mutations[types.SORT](state, "Relevant");
    expect(state.options.sort.Newest.selected).toBeFalsy();
    expect(state.options.sort.Relevant.selected).toBeTruthy();
  });
  it("can set order", () => {
    const state = { options: { order: null } };
    mutations[types.ORDER](state, "desc");
    expect(state.options.order).toContain("desc");
  });
  it("can set offset", () => {
    const state = { options: { offset: 0 } };
    mutations[types.OFFSET](state, 10);
    expect(state.options.offset).toEqual(10);
  });

  it("can clear data ", () => {
    const state = { data: createPolls() };
    mutations[types.CLEAR_DATA](state);
    expect(state.data).toMatchObject([]);
  });
  it("can set loading and loading_next to false", () => {
    const state = { loading: true, loading_next: true };
    mutations[types.IS_NOT_LOADING](state);
    expect(state.loading).toBeFalsy();
    expect(state.loading_next).toBeFalsy();
  });

  it("can clear error", () => {
    const state = { error };
    mutations[types.CLEAR_ERROR](state);
    expect(state.error).toBeNull();
  });
  it("can reset count", () => {
    const state = { count: 20 };
    mutations[types.RESET_COUNT](state);
    expect(state.count).toEqual(0);
  });
  it("can clear filter", () => {
    const state = { options: { filter: "search term" } };
    mutations[types.CLEAR_FILTER](state);
    expect(state.options.filter).toContain("");
  });
  it("can reset sort", () => {
    const state = createState();
    state.options.sort.Relevant.selected = true;
    state.options.sort.Newest.selected = false;
    mutations[types.RESET_SORT](state);
    expect(state.options.sort.Relevant.selected).toBeFalsy();
    expect(state.options.sort.Newest.selected).toBeTruthy();
  });
  it("can clear order", () => {
    const state = { options: { order: "desc" } };
    mutations[types.CLEAR_ORDER](state);
    expect(state.options.order).toBeNull();
  });
  it("can reset offset", () => {
    const state = { options: { offset: 10 } };
    mutations[types.RESET_OFFSET](state);
    expect(state.options.offset).toEqual(0);
  });

  it("can remove a poll by id", () => {
    const id = 1;
    const state = { data: createPolls() };
    mutations[types.REMOVE_ONE](state, id);
    expect(state.data.length).toEqual(19);
  });

  it("can reset state", () => {
    const state = createState();
    state.count = 20;
    state.loading = true;
    state.loading_next = true;
    state.data = createPolls();
    mutations[types.RESET_STATE](state);
    expect(state).toMatchObject(createState());
  });
});
