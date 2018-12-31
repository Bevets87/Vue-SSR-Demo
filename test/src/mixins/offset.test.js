import { mount } from "@vue/test-utils";
import offsetMixin from "../../../src/mixins/offset";

const mountComponent = ({ store, router }) => {
  const Component = {
    render() {},
    mixins: [offsetMixin],
    computed: {
      module() {
        return "test";
      }
    }
  };
  const mocks = {
    $store: store,
    $router: router
  };
  return mount(Component, { mocks });
};

describe("Offset Mixin", () => {
  jest.useFakeTimers();
  const dispatch = jest.fn();
  const commit = jest.fn();
  const push = jest.fn();
  const router = {
    push
  };

  const store = {
    dispatch,
    commit,
    state: {
      test: {
        loading_next: false,
        count: 50,
        options: {
          limit: 10,
          offset: 0
        }
      }
    }
  };

  afterEach(() => {
    dispatch.mockRestore();
    commit.mockRestore();
    push.mockRestore();
  });

  it("can compute count from store module", () => {
    const wrapper = mountComponent({ router, store });
    expect(wrapper.vm.count).toEqual(50);
  });

  it("can compute limit from store module", () => {
    const wrapper = mountComponent({ router, store });
    expect(wrapper.vm.limit).toEqual(10);
  });

  it("can compute offset from store module", () => {
    const wrapper = mountComponent({ router, store });
    expect(wrapper.vm.offset).toEqual(0);
  });

  it("can compute isLoadingNext from store module", () => {
    const wrapper = mountComponent({ router, store });
    expect(wrapper.vm.isLoadingNext).toBeFalsy();
  });

  it("can fetchNext()", () => {
    const wrapper = mountComponent({ store, router });

    wrapper.vm.fetchNext();
    expect(store.commit).toHaveBeenCalledTimes(2);
    expect(store.commit).toHaveBeenNthCalledWith(1, "test/offset", 10);
    expect(store.commit).toHaveBeenNthCalledWith(2, "test/is_loading_next");
    expect(setTimeout).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith("test/fetch_data");
  });
});
