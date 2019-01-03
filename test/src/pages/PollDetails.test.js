import PollDetailsPage from "../../../src/pages/PollDetails.vue";
import { shallowMount } from "@vue/test-utils";

describe("PollDetails Page", () => {
  const data = {
    id: 1,
    question: "Is this a mock?",
    choices: [
      { id: 1, value: "Yes", votes: 0 },
      { id: 2, value: "No", votes: 0 }
    ]
  };

  const propsData = {
    data
  };

  const store = {
    dispatch: jest.fn()
  };

  const mocks = {
    $store: store
  };

  const mountPollDetailsPage = () => {
    return shallowMount(PollDetailsPage, { propsData, mocks });
  };

  it("can dispatch an update poll action when Submit is clicked", () => {
    const wrapper = mountPollDetailsPage().find(".poll-details-page");
    wrapper.find("button").trigger("click");
    const payload = {
      choiceId: 1,
      pollId: 1
    };
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith("pollDetails/update", payload);
  });
});
