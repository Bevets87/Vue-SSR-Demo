import PollItem from "../../../src/components/PollItem.vue";
import { mount } from "@vue/test-utils";

function createPollItem(options) {
  return mount(PollItem, options);
}

describe("PollItem.vue", () => {
  const propsData = {
    id: 1,
    created_at: "2018-12-25T17:05:47",
    creator: "test@test.com",
    question: "What is the best programming language?",
    votes: 10,
    type: "selectable"
  };

  it("renders correctly", () => {
    const wrapper = createPollItem({ propsData });
    expect(wrapper.element.className).toContain("poll-item selectable");
    expect(wrapper.text()).toContain(propsData.question);
    expect(wrapper.text()).toContain("12-25-2018");
    expect(wrapper.text()).toContain(propsData.creator);
    expect(wrapper.text()).toContain("10 Votes");
  });

  it("can $emit('select', id) when clicked", () => {
    const wrapper = createPollItem({ propsData });
    wrapper.trigger("click");
    expect(wrapper.emitted().select[0][0]).toEqual(propsData.id);
  });
});
