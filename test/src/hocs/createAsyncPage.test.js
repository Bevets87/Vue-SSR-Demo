import { mount } from "@vue/test-utils";
import createAsyncPage from "../../../src/hocs/createAsyncPage";
import HalfCircleSpinner from "../../../src/components/HalfCircleSpinner";
import ErrorMessage from "../../../src/components/ErrorMessage";
import Polls from "../../../src/pages/Polls";
import faker from "faker";

const createPolls = () => {
  const polls = [];
  for (let i = 1; i < 11; i++) {
    polls.push({
      id: i,
      created_at: "2018-12-25T17:05:47",
      creator: `test-${i}@test.com`,
      question: faker.lorem.sentence(),
      votes: 10
    });
  }
  return polls;
};

const createMockRouter = config => {
  const router = {};

  router.push = config.push;
  return router;
};

const createMockStore = config => {
  const store = {
    state: {
      polls: {
        data: [],
        error: null,
        loading: false,
        loading_next: false,
        count: 0,
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
      }
    },
    commit: config.commit,
    dispatch: config.dispatch
  };

  if (config.mode === "success") {
    store.state.polls.loading = false;
    store.state.polls.data = createPolls();
    store.state.polls.error = null;
  } else if (config.mode === "failure") {
    store.state.polls.loading = false;
    store.state.polls.data = null;
    store.state.polls.error = { message: "Failed..." };
  } else if (config.mode === "loading") {
    store.state.polls.loading = true;
    store.state.polls.data = null;
    store.state.polls.error = null;
  } else {
    store.state.polls.loading = false;
    store.state.polls.data = createPolls();
    store.state.polls.error = null;
  }

  return store;
};

const mountAsyncPolls = config => {
  const { module, fetchData, store, router } = config;
  const Page = createAsyncPage({ module, fetchData })(Polls);
  const wrapper = mount(Page, {
    mocks: {
      $store: store,
      $router: router
    }
  });
  wrapper.asyncData = Page.asyncData;
  return wrapper;
};

describe("createAsyncPage HOC", () => {
  const module = "polls";
  const fetchData = jest.fn();
  const commit = jest.fn();
  const dispatch = jest.fn();
  const push = jest.fn();

  afterEach(() => {
    fetchData.mockRestore();
    commit.mockRestore();
    dispatch.mockRestore();
    push.mockRestore();
  });

  it("renders a loading mode when loading is true", () => {
    const mode = "loading";
    const router = createMockRouter({ push });
    const store = createMockStore({ mode, commit, dispatch });
    const wrapper = mountAsyncPolls({ fetchData, module, store, router });
    const loading = wrapper.find(HalfCircleSpinner);

    expect(loading.exists()).toBeTruthy();
  });

  it("renders a failure mode when an error exits", () => {
    const mode = "failure";
    const router = createMockRouter({ push });
    const store = createMockStore({ mode, commit, dispatch });
    const wrapper = mountAsyncPolls({ fetchData, module, store, router });
    const failure = wrapper.find(ErrorMessage);

    expect(failure.exists()).toBeTruthy();
  });

  it("renders a success mode when data exists", () => {
    const mode = "success";
    const router = createMockRouter({ push });
    const store = createMockStore({ mode, commit, dispatch });
    const wrapper = mountAsyncPolls({ fetchData, module, store, router });
    const success = wrapper.find(Polls);

    expect(success.exists()).toBeTruthy();
    expect(success.find(".infinite-scroll").element.children.length).toEqual(
      10
    );
  });

  it("has a static asyncData method that calls an internal fetchData method", () => {
    const mode = "loading";
    const router = createMockRouter({ push });
    const store = createMockStore({ mode, commit, dispatch });
    const wrapper = mountAsyncPolls({ fetchData, module, store, router });

    wrapper.asyncData({ store, route: "/" });
    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith({ store, route: "/" });
  });
});
