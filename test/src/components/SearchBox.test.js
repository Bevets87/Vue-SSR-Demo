import { mount } from "@vue/test-utils";
import SearchBox from "../../../src/components/SearchBox.vue";

const createSearchBox = propsData => {
  const options = {
    propsData
  };
  return mount(SearchBox, options);
};

describe("SearchBox.vue", () => {
  const propsData = {
    searchTerm: "",
    setSearchTerm: jest.fn(),
    placeholder: "Search Polls"
  };

  afterEach(() => {
    propsData.setSearchTerm.mockRestore();
  });

  it("renders properly with no searchTerm", () => {
    const wrapper = createSearchBox(propsData);
    expect(wrapper.find("button").html()).toContain(
      '<button><i class="fas fa-search"></i></button>'
    );
    expect(wrapper.find("input").html()).toContain(
      '<input placeholder="Search Polls" type="text" class="search-box__input">'
    );
  });

  it("renders properly with a searchTerm", () => {
    const wrapper = createSearchBox({ ...propsData, searchTerm: "Testterm" });

    expect(wrapper.find("input").element.value).toContain("Testterm");
  });

  it("calls setSearchTerm on input change", () => {
    const wrapper = createSearchBox(propsData);
    wrapper.find("input").trigger("input");

    expect(propsData.setSearchTerm).toHaveBeenCalledTimes(1);
  });
});
