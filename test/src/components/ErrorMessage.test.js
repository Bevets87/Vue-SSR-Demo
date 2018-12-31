import { mount } from "@vue/test-utils";
import ErrorMessage from "../../../src/components/ErrorMessage.vue";

const createErrorMessage = ({ propsData, mocks }) => {
  return mount(ErrorMessage, { propsData, mocks });
};

describe("ErrorMessage.vue", () => {
  const error = {
    message: "There was an error..."
  };
  const clearError = jest.fn();
  const router = {
    push: jest.fn()
  };

  const propsData = {
    error,
    clearError
  };

  const mocks = {
    $router: router
  };

  afterEach(() => {
    clearError.mockRestore();
    router.push.mockRestore();
  });

  it("renders correctly", () => {
    const wrapper = createErrorMessage({ propsData, mocks });
    expect(wrapper.find(".error-message__text").text()).toContain(
      error.message
    );
  });

  it("can navigate to '/' when Got it! is clicked", () => {
    const wrapper = createErrorMessage({ propsData, mocks });
    wrapper.find(".error-message__button").trigger("click");
    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith("/");
  });

  it("can clearError() beforeDestroy", () => {
    const wrapper = createErrorMessage({ propsData, mocks });
    wrapper.destroy();
    expect(clearError).toHaveBeenCalledTimes(1);
  });
});
