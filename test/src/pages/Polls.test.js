import PollsPage from "../../../src/pages/Polls.vue";
import InfiniteScroll from "../../../src/components/InfiniteScroll.vue";
import PollItem from "../../../src/components/PollItem.vue";
import FetchControls from "../../../src/components/FetchControls.vue";
import Vuex from "vuex";
import { createPollsModule } from "../../../src/store/modules/polls";
import { mount, createLocalVue } from "@vue/test-utils";
import axios from "axios";
import faker from "faker";

jest.mock("axios");
jest.useFakeTimers();

const createPolls = () => {
  const polls = [];
  let count = 0;
  while (count < 20) {
    polls.push({
      id: ++count,
      question: faker.lorem.sentence(),
      creator: faker.internet.userName(),
      created_at: "2018-12-25T17:05:47",
      votes: count
    });
  }
  return polls;
};

describe("Polls Page", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  axios.get.mockResolvedValue();

  const mocks = {
    $router: {
      push: jest.fn()
    }
  };
  const store = new Vuex.Store({
    modules: {
      polls: createPollsModule(axios)
    }
  });

  const mountPollsPage = () => {
    const propsData = {
      data: store.state.polls.data
    };
    return mount(PollsPage, { store, localVue, propsData, mocks });
  };

  afterEach(() => {
    axios.get.mockClear();
    mocks.$router.push.mockReset();
    store.commit("polls/reset_state");
  });

  it("renders polls correctly", () => {
    const polls = createPolls();
    store.commit("polls/data", polls);
    store.commit("polls/count", polls.length);
    const wrapper = mountPollsPage().find(".polls-page");
    expect(wrapper.find(FetchControls).exists()).toBeTruthy();
    expect(wrapper.find(InfiniteScroll).exists()).toBeTruthy();
    expect(wrapper.find(InfiniteScroll).findAll(PollItem).length).toEqual(20);
  });

  it("can reset and re-fetch my polls when Submit is clicked", () => {
    jest.spyOn(store, "commit");
    jest.spyOn(store, "dispatch");
    const wrapper = mountPollsPage().find(".polls-page");
    wrapper
      .find(FetchControls)
      .find(".submit")
      .trigger("click");
    jest.advanceTimersByTime(300);
    expect(store.commit).toHaveBeenCalledTimes(4);
    expect(store.commit).toHaveBeenNthCalledWith(1, "polls/clear_data");
    expect(store.commit).toHaveBeenNthCalledWith(2, "polls/reset_count");
    expect(store.commit).toHaveBeenNthCalledWith(3, "polls/reset_offset");
    expect(store.commit).toHaveBeenNthCalledWith(4, "polls/is_loading");
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith("polls/fetch_data");

    jest.restoreAllMocks();
  });

  it("can navigate to /poll-details/:id when poll is clicked", () => {
    const polls = createPolls();
    store.commit("polls/data", polls);
    store.commit("polls/count", polls.length);
    const wrapper = mountPollsPage();
    wrapper
      .find(InfiniteScroll)
      .findAll(PollItem)
      .at(0)
      .trigger("click");
    expect(mocks.$router.push).toHaveBeenCalledTimes(1);
    expect(mocks.$router.push).toHaveBeenCalledWith("/poll-details/1");
  });
});
