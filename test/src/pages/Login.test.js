import LoginPage from "../../../src/pages/Login.vue";
import Vuex from "vuex";
import { createAuthModule } from "../../../src/store/modules/auth";
import { mount, createLocalVue } from "@vue/test-utils";
import axios from "axios";

jest.mock("axios");

const mountLoginPage = ({ store, mocks, localVue }) => {
  return mount(LoginPage, { mocks, localVue, store });
};

const createStore = http => {
  return new Vuex.Store({
    modules: {
      auth: createAuthModule(http)
    }
  });
};

describe("Login Page", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  axios.post.mockResolvedValue();

  const router = {
    push: jest.fn()
  };
  const mocks = { $router: router };

  const store = createStore(axios);

  afterEach(() => {
    axios.post.mockClear();
    router.push.mockReset();
    store.commit("unauth");
  });

  it("renders correctly", () => {
    const wrapper = mountLoginPage({ mocks, store, localVue }).find(
      ".login-page"
    );
    const title = wrapper.find(".form-box__title");
    const inputs = wrapper.findAll("input");
    const buttons = wrapper.findAll("button");

    expect(title.text()).toContain("Login");
    expect(inputs.at(0).attributes().placeholder).toContain("Username");
    expect(inputs.at(1).attributes().placeholder).toContain("Password");
    expect(buttons.at(0).text()).toContain("Register");
    expect(buttons.at(1).text()).toContain("Submit");
  });

  it("renders an error message when there is an auth error", () => {
    const error = { message: "There is an error" };
    store.commit("auth_error", error);
    const wrapper = mountLoginPage({ mocks, store, localVue }).find(
      ".login-page"
    );
    const message = wrapper.find(".form-box__message");
    expect(message.text()).toContain(error.message);
  });

  it("dispatches a login action when Submit is clicked", () => {
    jest.spyOn(store, "dispatch");
    const wrapper = mountLoginPage({ mocks, store, localVue }).find(
      ".login-page"
    );
    wrapper
      .findAll("button")
      .at(1)
      .trigger("click");
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith("login", {
      payload: wrapper.vm.$data,
      redirect: wrapper.vm.redirectToLanding
    });
  });

  it("navigates to /register when Register is clicked", () => {
    const wrapper = mountLoginPage({ mocks, store, localVue }).find(
      ".login-page"
    );
    wrapper
      .findAll("button")
      .at(0)
      .trigger("click");
    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith("/register");
  });

  it("commits a clear_auth_error mutation when destroyed", () => {
    jest.spyOn(store, "commit");
    const wrapper = mountLoginPage({ mocks, store, localVue }).find(
      ".login-page"
    );
    wrapper.destroy();
    expect(store.commit).toHaveBeenCalledTimes(1);
    expect(store.commit).toHaveBeenCalledWith("clear_auth_error");
  });
});
