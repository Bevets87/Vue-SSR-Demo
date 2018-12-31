import { mount } from "@vue/test-utils";
import DropDownMenu from "../../../src/components/DropDownMenu.vue";

describe("DropDownMenu.vue", () => {
  const selections = ["One", "Two", "Three"];
  const selected = "One";

  const propsData = { selections, selected };
  const wrapper = mount(DropDownMenu, { propsData });

  it("renders correctly", () => {
    expect(wrapper.find(".drop-down__button").text()).toContain(selected);
    expect(wrapper.find(".drop-down__menu").text()).toContain(
      selections.join("")
    );
  });

  it("$emit('select', selected) when a selection is clicked", () => {
    wrapper.find(".drop-down__button").trigger("click");
    const buttons = wrapper.find(".drop-down__menu").findAll("button");
    buttons.at(1).trigger("click");
    expect(wrapper.emitted()).toMatchObject({ select: [["Two"]] });
  });
});
