import { mount } from "@vue/test-utils";
import sortMixin from "../../../src/mixins/sort";

const mountComponent = ({ store }) => {
  const Component = {
    render() {},
    mixins: [sortMixin],
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

describe("Sort Mixin", () => {
  const commit = jest.fn();

  const store = {
    commit,
    state: {
      test: {
        options: {
          sort: {
            Relevant: { selected: true, column: null },
            Newest: { selected: false, column: "created_at" },
            Popular: { selected: false, column: "votes" },
            "A-Z": { selected: false, column: "question" }
          },
          order: "desc"
        }
      }
    }
  };

  afterEach(() => {
    commit.mockRestore();
  });

  it("can compute sort from store module", () => {
    const wrapper = mountComponent({ store });
    expect(wrapper.vm.sort).toMatchObject(store.state.test.options.sort);
  });

  it("can compute order from store module", () => {
    const wrapper = mountComponent({ store });
    expect(wrapper.vm.order).toContain("desc");
  });
  it("can compute sortOptions from store module", () => {
    const wrapper = mountComponent({ store });
    expect(wrapper.vm.sortOptions.join(", ")).toContain(
      "Relevant, Newest, Popular, A-Z"
    );
  });
  it("can compute sortSelection from store module", () => {
    const wrapper = mountComponent({ store });
    expect(wrapper.vm.sortSelection).toContain("Relevant");
  });

  it("can setSort()", () => {
    const wrapper = mountComponent({ store });
    wrapper.vm.setSort("Relevant");
    expect(store.commit).toHaveBeenCalledTimes(2);
    expect(store.commit).toHaveBeenNthCalledWith(1, "test/sort", "Relevant");
    expect(store.commit).toHaveBeenNthCalledWith(2, "test/order", null);
  });
});
