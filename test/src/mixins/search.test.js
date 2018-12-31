import { mount } from "@vue/test-utils";
import searchMixin from "../../../src/mixins/search";

const mountComponent = ({ store }) => {
  const Component = {
    render() {},
    mixins: [searchMixin],
    computed: {
      module() {
        return "test";
      }
    }
  };
  const mocks = {
    $store: store
  };
  return mount(Component, { mocks });
};

describe("Search Mixin", () => {
  const commit = jest.fn();

  const store = {
    commit,
    state: {
      test: {
        options: {
          filter: "test"
        }
      }
    }
  };

  afterEach(() => {
    commit.mockRestore();
  });

  it("can compute searchTerm from store module", () => {
    const wrapper = mountComponent({ store });
    expect(wrapper.vm.searchTerm).toContain("test");
  });

  it("can setSearchTerm()", () => {
    const wrapper = mountComponent({ store });
    wrapper.vm.setSearchTerm("search term");
    expect(store.commit).toHaveBeenCalledTimes(1);
    expect(store.commit).toHaveBeenCalledWith("test/filter", "search term");
  });
  it("can clearSearchTerm()", () => {
    const wrapper = mountComponent({ store });
    wrapper.vm.clearSearchTerm();
    expect(store.commit).toHaveBeenCalledTimes(1);
    expect(store.commit).toHaveBeenCalledWith("test/clear_filter");
  });
});
