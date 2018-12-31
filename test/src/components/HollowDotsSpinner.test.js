import { mount } from "@vue/test-utils";
import HollowDotsSpinner from "../../../src/components/HollowDotsSpinner.vue";

describe("HollowDotsSpinner.vue", () => {
  const wrapper = mount(HollowDotsSpinner);

  it("renders properly", () => {
    expect(wrapper.find(".hollow-dots-spinner").exists()).toBeTruthy();
    expect(wrapper.find(".hollow-dots-spinner__dot").exists()).toBeTruthy();
  });
});
