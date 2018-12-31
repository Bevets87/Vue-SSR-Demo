import { shallowMount } from "@vue/test-utils";
import BubbleMenu from "../../../src/components/BubbleMenu.vue";

const createBubbleMenu = propsData => {
  return shallowMount(BubbleMenu, { propsData });
};

describe("BubbleMenu.vue", () => {
  let message = "";
  const propsData = { message };

  it("renders correctly", () => {
    const wrapper = createBubbleMenu(propsData);
    expect(wrapper.find(".bubble-menu").exists()).toBeTruthy();
  });

  it("can pass a 'close menu' message that will cause isSideBarOpened to be false", () => {
    const wrapper = createBubbleMenu({ message: "close menu" });
    expect(wrapper.vm.$data.isSideBarOpened).toBeFalsy();
  });
});
