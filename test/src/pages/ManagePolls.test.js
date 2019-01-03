import ManagePollsPage from "../../../src/pages/ManagePolls.vue";
import InfiniteScroll from "../../../src/components/InfiniteScroll.vue";
import PollItem from "../../../src/components/PollItem.vue";
import FetchControls from "../../../src/components/FetchControls.vue";
import Vuex from "vuex";
import { createMyPollsModule } from "../../../src/store/modules/my-polls";
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

describe("ManagePolls Page", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  axios.get.mockResolvedValue();
  axios.post.mockResolvedValue();
  axios.delete.mockResolvedValue();

  const store = new Vuex.Store({
    modules: {
      myPolls: createMyPollsModule(axios)
    }
  });

  const mountManagePollsPage = () => {
    const propsData = {
      data: store.state.myPolls.data
    };
    return mount(ManagePollsPage, { store, localVue, propsData });
  };

  afterEach(() => {
    axios.get.mockClear();
    axios.post.mockClear();
    axios.delete.mockClear();
    store.commit("myPolls/reset_state");
  });

  it("render my polls correctly", () => {
    const myPolls = createPolls();
    store.commit("myPolls/data", myPolls);
    store.commit("myPolls/count", myPolls.length);
    const wrapper = mountManagePollsPage().find(".manage-polls-page");
    expect(wrapper.find(FetchControls).exists()).toBeTruthy();
    expect(wrapper.find(InfiniteScroll).exists()).toBeTruthy();
    expect(wrapper.find(InfiniteScroll).findAll(PollItem).length).toEqual(20);
  });

  it("can reset and re-fetch my polls when Submit is clicked", () => {
    jest.spyOn(store, "commit");
    jest.spyOn(store, "dispatch");
    const wrapper = mountManagePollsPage().find(".manage-polls-page");
    wrapper
      .find(FetchControls)
      .find(".submit")
      .trigger("click");
    jest.advanceTimersByTime(300);
    expect(store.commit).toHaveBeenCalledTimes(4);
    expect(store.commit).toHaveBeenNthCalledWith(1, "myPolls/clear_data");
    expect(store.commit).toHaveBeenNthCalledWith(2, "myPolls/reset_count");
    expect(store.commit).toHaveBeenNthCalledWith(3, "myPolls/reset_offset");
    expect(store.commit).toHaveBeenNthCalledWith(4, "myPolls/is_loading");
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith("myPolls/fetch_data");

    jest.restoreAllMocks();
  });

  it("can dispatch a delete my poll action when a poll is clicked", () => {
    jest.spyOn(store, "dispatch");
    const myPolls = createPolls();
    store.commit("myPolls/data", myPolls);
    store.commit("myPolls/count", myPolls.length);
    const wrapper = mountManagePollsPage();
    wrapper
      .find(InfiniteScroll)
      .findAll(PollItem)
      .at(0)
      .trigger("click");
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith("myPolls/delete", { id: 1 });
    jest.restoreAllMocks();
  });
});
