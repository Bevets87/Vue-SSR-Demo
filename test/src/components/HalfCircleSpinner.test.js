import { mount } from "@vue/test-utils";
import HalfCircleSpinner from "../../../src/components/HalfCircleSpinner.vue";

describe("HalfCircleSpinner.vue", () => {
  const wrapper = mount(HalfCircleSpinner);

  it("renders properly", () => {
    expect(wrapper.find(".half-circle-spinner").exists()).toBeTruthy();
    expect(
      wrapper.find(".half-circle-spinner__container").exists()
    ).toBeTruthy();
    expect(wrapper.find(".circle").exists()).toBeTruthy();
    expect(wrapper.find(".circle-top").exists()).toBeTruthy();
    expect(wrapper.find(".circle-bottom").exists()).toBeTruthy();
  });
});
