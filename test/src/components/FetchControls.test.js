import { mount } from "@vue/test-utils";
import FetchControls from "../../../src/components/FetchControls";
import SearchBox from "../../../src/components/SearchBox";
import DropDownMenu from "../../../src/components/DropDownMenu";

const createFetchControls = propsData => {
  const options = { propsData };
  return mount(FetchControls, options);
};

describe("FetchControls.vue", () => {
  const sortOptions = ["Relevant", "Popular", "A-Z", "Newest"];

  let sortSelection = "Relevant";

  let searchTerm = "";

  const setSearchTerm = jest.fn();
  const setSort = jest.fn();
  const submit = jest.fn();

  let placeholder = "Search polls";

  const propsData = {
    sortOptions,
    sortSelection,
    searchTerm,
    setSearchTerm,
    setSort,
    submit,
    placeholder
  };

  afterEach(() => {
    setSearchTerm.mockRestore();
    setSort.mockRestore();
    submit.mockRestore();
  });

  it("renders a searchbox with placeholder text", () => {
    const wrapper = createFetchControls(propsData);
    const input = wrapper.find(SearchBox).find("input").element;

    expect(input.placeholder).toContain(propsData.placeholder);
  });

  it("renders a searchbox with placeholder text overwritten by searchTerm", () => {
    let searchTerm = "Searching for something...";
    const wrapper = createFetchControls({ ...propsData, searchTerm });
    const input = wrapper.find(SearchBox).find("input").element;
    expect(input.value).toContain(searchTerm);
  });

  it("renders a dropdownmenu with sortOptions and sortSelection", () => {
    const wrapper = createFetchControls(propsData);
    const dropDownMenuWrapper = wrapper.find(DropDownMenu);
    expect(dropDownMenuWrapper.find(".drop-down__button").text()).toContain(
      propsData.sortSelection
    );
    expect(dropDownMenuWrapper.find(".drop-down__menu").text()).toContain(
      propsData.sortOptions.join("")
    );
  });

  it("can setSort()", () => {
    const wrapper = createFetchControls(propsData);
    const dropDownMenuWrapper = wrapper.find(DropDownMenu);
    dropDownMenuWrapper.find(".drop-down__button").trigger("click");
    dropDownMenuWrapper
      .find(".drop-down__menu")
      .find("button")
      .trigger("click");
    expect(propsData.setSort).toHaveBeenCalledTimes(1);
    expect(propsData.setSort).toHaveBeenCalledWith("Relevant");
  });

  it("can setSearchTerm()", () => {
    const wrapper = createFetchControls(propsData);
    wrapper
      .find(SearchBox)
      .find("input")
      .trigger("input");
    expect(propsData.setSearchTerm).toHaveBeenCalledTimes(1);
  });

  it("can submit()", () => {
    const wrapper = createFetchControls(propsData);
    wrapper.find(".submit").trigger("click");
    expect(propsData.submit).toHaveBeenCalledTimes(1);
  });
});
