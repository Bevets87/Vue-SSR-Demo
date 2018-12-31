import InfiniteScroll from "../../../src/components/InfiniteScroll.vue";
import { mount } from "@vue/test-utils";
import faker from "faker";

function createInfiniteScroll(propsData) {
  return mount(InfiniteScroll, { propsData });
}

function createItems() {
  const items = [];
  for (let i = 1; i < 11; i++) {
    items.push({ id: i, question: faker.lorem.sentence() });
  }
  return items;
}

describe("InfiniteScroll.vue", () => {
  const propsData = {
    loading: false,
    loadNext: jest.fn(),
    items: createItems()
  };

  afterEach(() => {
    propsData.loadNext.mockRestore();
  });

  it("renders correctly when loading is false", () => {
    const wrapper = createInfiniteScroll(propsData);

    expect(wrapper.find(".infinite-scroll").element.children.length).toEqual(
      10
    );
    expect(wrapper.find(".infinite-scroll__spinner").exists()).toBeFalsy();
  });

  it("renders spinner when loading is true", () => {
    const wrapper = createInfiniteScroll({ ...propsData, loading: true });

    expect(wrapper.find(".infinite-scroll__spinner").exists()).toBeTruthy();
  });

  it("calls loadNext when the bottom of the page is reached", () => {
    const wrapper = createInfiniteScroll(propsData);
    wrapper.setData({ isBottom: true });
    expect(propsData.loadNext).toHaveBeenCalledTimes(1);
  });
});
