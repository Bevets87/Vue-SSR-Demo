import { mount } from "@vue/test-utils";
import authMixin from "../../../src/mixins/auth";

const createAuthModule = ({ authenticated, error }) => {
  return {
    auth: {
      authenticated,
      error
    }
  };
};

const mountComponent = ({ store, router }) => {
  const Component = {
    render() {},
    mixins: [authMixin]
  };
  const mocks = {
    $store: store,
    $router: router
  };
  return mount(Component, { mocks });
};

describe("Auth Mixin", () => {
  let authenticated = false;
  let error = null;
  const dispatch = jest.fn();
  const commit = jest.fn();
  const push = jest.fn();
  const router = {
    push
  };

  const store = {
    dispatch,
    commit,
    state: createAuthModule({ authenticated, error })
  };

  afterEach(() => {
    dispatch.mockRestore();
    commit.mockRestore();
    push.mockRestore();
  });

  it("can compute authenticated state from store", () => {
    const wrapper = mountComponent({ router, store });
    expect(wrapper.vm.authenticated).toBeFalsy();
  });

  it("can compute authError from store", () => {
    const thisStore = {
      ...store,
      state: createAuthModule({
        authenticated,
        error: { message: "There is an error" }
      })
    };
    const wrapper = mountComponent({ router, store: thisStore });
    expect(wrapper.vm.authError).toBeTruthy();
    expect(wrapper.vm.authError.message).toContain("There is an error");
  });

  it("can redirectToLogin()", () => {
    const wrapper = mountComponent({ store, router });
    wrapper.vm.redirectToLogin();
    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith("/login");
  });

  it("can redirectToLanding()", () => {
    const wrapper = mountComponent({ store, router });
    wrapper.vm.redirectToLanding();
    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith("/");
  });

  it("can register()", () => {
    const wrapper = mountComponent({ store, router });
    const payload = {};
    const redirect = wrapper.vm.redirectToLanding;
    wrapper.vm.register(payload);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith("register", {
      payload,
      redirect
    });
  });

  it("can login()", () => {
    const wrapper = mountComponent({ store, router });
    const payload = {};
    const redirect = wrapper.vm.redirectToLanding;
    wrapper.vm.login(payload);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith("login", { payload, redirect });
  });

  it("can logout()", () => {
    const wrapper = mountComponent({ store, router });
    const redirect = wrapper.vm.redirectToLogin;
    wrapper.vm.logout();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith("logout", { redirect });
  });

  it("can clearAuthError()", () => {
    const wrapper = mountComponent({ store, router });
    wrapper.vm.clearAuthError();
    expect(store.commit).toHaveBeenCalledTimes(1);
    expect(store.commit).toHaveBeenCalledWith("clear_auth_error");
  });
});
