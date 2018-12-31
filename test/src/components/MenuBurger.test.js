import MenuBurger from "../../../src/components/MenuBurger.vue";
import { mount } from "@vue/test-utils";

function createMenuBurger(propsData) {
  return mount(MenuBurger, { propsData });
}

describe("MenuBurger.vue", () => {
  const propsData = {
    sideBarStyles: {
      display: "block",
      width: "20rem"
    },
    isSideBarOpen: false
  };

  it("renders correctly when isSideBarOpen is false", () => {
    const wrapper = createMenuBurger(propsData);
    expect(wrapper.find(".menu-burger__sidebar").isVisible()).toBeFalsy();
    expect(wrapper.find(".menu-burger__button").exists()).toBeTruthy();
  });

  it("renders correctly when isSideBarOpen is true", () => {
    const wrapper = createMenuBurger({ ...propsData, isSideBarOpen: true });
    expect(wrapper.find(".menu-burger__sidebar").isVisible()).toBeTruthy();
  });
});
