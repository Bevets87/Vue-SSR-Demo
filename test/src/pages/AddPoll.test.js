import AddPollPage from "../../../src/pages/AddPoll.vue";
import { mount } from "@vue/test-utils";

describe("AddPoll Page", () => {
  const router = {
    push: jest.fn()
  };
  const store = {
    dispatch: jest.fn()
  };
  const mocks = {
    $router: router,
    $store: store
  };

  const mountAddPollPage = () => {
    return mount(AddPollPage, { mocks });
  };

  afterEach(() => {
    router.push.mockReset();
    store.dispatch.mockReset();
  });

  it("renders correctly", () => {
    const wrapper = mountAddPollPage().find(".add-poll-page");

    expect(wrapper.find(".add-poll-page__header").text()).toContain("Add Poll");
    expect(
      wrapper
        .findAll("label")
        .at(0)
        .text()
    ).toContain("Question");
    expect(
      wrapper
        .findAll("label")
        .at(1)
        .text()
    ).toContain("Choices");
    expect(
      wrapper
        .findAll("button")
        .at(0)
        .text()
    ).toContain("Clear");
    expect(
      wrapper
        .findAll("button")
        .at(1)
        .text()
    ).toContain("Submit");
  });

  it("can dispatch an add poll action to store when question and choices are not empty and Submit is click", () => {
    const wrapper = mountAddPollPage();
    wrapper.setData({
      question: "What is the best programming language?",
      text: "Java, JavaScript, Python, Rust, C++"
    });
    wrapper
      .find(".add-poll-page")
      .findAll("button")
      .at(1)
      .trigger("click");
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    const payload = {
      question: "What is the best programming language?",
      choices: ["Java", "JavaScript", "Python", "Rust", "C++"]
    };
    const redirect = wrapper.vm.navigateToLanding;
    expect(store.dispatch).toHaveBeenCalledWith("myPolls/create", {
      payload,
      redirect
    });
  });

  it("can clear question and choices when Clear is clicked", () => {
    const wrapper = mountAddPollPage();
    wrapper.setData({
      question: "What is the best programming language?",
      text: "Java, JavaScript, Python, Rust, C++"
    });
    wrapper
      .find(".add-poll-page")
      .findAll("button")
      .at(0)
      .trigger("click");
    expect(wrapper.vm.$data).toMatchObject({ question: "", text: "" });
  });
});
