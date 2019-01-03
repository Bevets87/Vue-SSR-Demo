import RegisterPage from "../../../src/pages/Register.vue";
import Vuex from "vuex";
import { createAuthModule } from "../../../src/store/modules/auth";
import { mount, createLocalVue } from "@vue/test-utils";
import axios from "axios";

jest.mock("axios");

const createStore = http => {
  return new Vuex.Store({
    modules: {
      auth: createAuthModule(http)
    }
  });
};

describe("Register Page", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  axios.post.mockResolvedValue();

  const router = {
    push: jest.fn()
  };
  const mocks = { $router: router };

  const store = createStore(axios);

  const mountRegisterPage = () => {
    return mount(RegisterPage, { mocks, localVue, store });
  };

  afterEach(() => {
    axios.post.mockClear();
    router.push.mockReset();
    store.commit("unauth");
  });

  it("renders correctly", () => {
    const wrapper = mountRegisterPage().find(".register-page");
    const title = wrapper.find(".form-box__title");
    const inputs = wrapper.findAll("input");
    const button = wrapper.find("button");

    expect(title.text()).toContain("Register");
    expect(inputs.at(0).attributes().placeholder).toContain("Username");
    expect(inputs.at(1).attributes().placeholder).toContain("Password");
    expect(inputs.at(2).attributes().placeholder).toContain(
      "Password Confirmation"
    );
    expect(button.text()).toContain("Submit");
  });

  it("renders an error message when there is an auth error", () => {
    const error = { message: "There is an error" };
    store.commit("auth_error", error);
    const wrapper = mountRegisterPage().find(".register-page");
    const message = wrapper.find(".form-box__message");
    expect(message.text()).toContain(error.message);
  });

  it("dispatches a register action when Submit is clicked", () => {
    jest.spyOn(store, "dispatch");
    const wrapper = mountRegisterPage().find(".register-page");
    wrapper.find("button").trigger("click");
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith("register", {
      payload: wrapper.vm.$data,
      redirect: wrapper.vm.redirectToLanding
    });
  });

  it("commits a clear_auth_error mutation when destroyed", () => {
    jest.spyOn(store, "commit");
    const wrapper = mountRegisterPage().find(".register-page");
    wrapper.destroy();
    expect(store.commit).toHaveBeenCalledTimes(1);
    expect(store.commit).toHaveBeenCalledWith("clear_auth_error");
  });
});
