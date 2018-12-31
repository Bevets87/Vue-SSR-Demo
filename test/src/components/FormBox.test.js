import { mount } from "@vue/test-utils";
import FormBox from "../../../src/components/FormBox.vue";

describe("FormBox.vue", () => {
  const wrapper = mount(FormBox);

  it("renders correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
