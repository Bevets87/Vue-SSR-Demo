import mutations from "../../../../../src/store/modules/auth/mutations";
import types from "../../../../../src/store/modules/auth/types";

describe("Auth Mutations", () => {
  it("can set authenticated to true", () => {
    const state = { authenticated: false };
    mutations[types.AUTH](state);
    expect(state.authenticated).toBeTruthy();
  });

  it("can set authenticated to false", () => {
    const state = { authenticated: true };
    mutations[types.UNAUTH](state);
    expect(state.authenticated).toBeFalsy();
  });

  it("can set error", () => {
    const state = { error: null };
    const error = { message: "error" };
    mutations[types.AUTH_ERROR](state, error);
    expect(state.error).toMatchObject(error);
  });

  it("can clear error", () => {
    const state = { error: { message: "error" } };
    mutations[types.CLEAR_AUTH_ERROR](state);
    expect(state.error).toBeNull();
  });
});
