import { createActions } from "../../../../../src/store/modules/auth/createActions";
import types from "../../../../../src/store/modules/auth/types";

describe("Auth Actions", () => {
  const commit = jest.fn();
  const dispatch = jest.fn();
  const redirect = jest.fn();
  const error = {
    response: {
      data: {
        message: "failed"
      }
    }
  };
  const httpSucceed = {
    post: jest.fn(() => Promise.resolve())
  };

  const httpFail = {
    post: jest.fn(() => Promise.reject(error))
  };

  afterEach(() => {
    commit.mockRestore();
    dispatch.mockRestore();
    redirect.mockRestore();
    httpSucceed.post.mockClear();
    httpFail.post.mockClear();
  });

  it("can login and succeed", async () => {
    const actions = createActions(httpSucceed);
    const payload = {};
    await actions[types.LOGIN]({ commit }, { payload, redirect });
    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith(types.AUTH);
    expect(redirect).toHaveBeenCalledTimes(1);
  });

  it("can login and fail", async () => {
    const actions = createActions(httpFail);
    const payload = {};
    await actions[types.LOGIN]({ commit }, { payload, redirect });
    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith(types.AUTH_ERROR, {
      message: "failed"
    });
  });

  it("can register and succeed", async () => {
    const actions = createActions(httpSucceed);
    const payload = {};
    await actions[types.REGISTER]({ commit }, { payload, redirect });
    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith(types.AUTH);
    expect(redirect).toHaveBeenCalledTimes(1);
  });

  it("can register and fail", async () => {
    const actions = createActions(httpFail);
    const payload = {};
    await actions[types.REGISTER]({ commit }, { payload, redirect });
    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith(types.AUTH_ERROR, {
      message: "failed"
    });
  });

  it("can logout", async () => {
    const actions = createActions(httpSucceed);

    await actions[types.LOGOUT]({ dispatch }, { redirect });
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith("reset_store");
    expect(redirect).toHaveBeenCalledTimes(1);
  });
});
