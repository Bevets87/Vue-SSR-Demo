import { mount, RouterLinkStub } from "@vue/test-utils";
import RouterHeader from "../../../src/components/RouterHeader";

import auth from "../../../src/mixins/auth";

jest.mock("../../../src/mixins/auth");

describe("RouterHeader.vue", () => {
  const push = jest.fn();
  const createStore = state => ({
    state: {
      auth: state
    }
  });

  const createRouterHeader = state => {
    const options = {
      mocks: {
        $store: createStore(state),
        $router: {
          push
        }
      },
      stubs: { RouterLink: RouterLinkStub }
    };

    return mount(RouterHeader, options);
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders properly when !authenticated", () => {
    const state = { authenticated: false };
    const wrapper = createRouterHeader(state);
    expect(wrapper.text()).toContain("PollIt");
    expect(wrapper.text()).toContain("Login");
  });

  it("renders properly when authenticated", () => {
    const state = { authenticated: true };
    const wrapper = createRouterHeader(state);

    expect(wrapper.text()).toContain("PollIt");
    expect(wrapper.text()).toContain("Create Poll");
    expect(wrapper.text()).toContain("Manage Polls");
    expect(wrapper.text()).toContain("Logout");
  });

  it("can logout() and go from authenticated to !authenticated", () => {
    const state = { authenticated: true };
    const wrapper = createRouterHeader(state);
    wrapper.find(".logout").trigger("click");
    expect(auth.methods.logout).toHaveBeenCalledTimes(1);
    expect(state.authenticated).toBeFalsy();
    expect(wrapper.text()).toContain("PollIt");
    expect(wrapper.text()).toContain("Login");
  });
});
