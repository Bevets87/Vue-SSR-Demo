import types from "./types";
export function createActions(http) {
  return {
    [types.LOGIN]({ commit }, { payload, redirect }) {
      return http
        .post("/auth/login", payload)
        .then(() => {
          commit(types.AUTH);
          redirect();
        })
        .catch(error => {
          commit(types.AUTH_ERROR, error.response.data);
        });
    },
    [types.REGISTER]({ commit }, { payload, redirect }) {
      return http
        .post("/auth/register", payload)
        .then(() => {
          commit(types.AUTH);
          redirect();
        })
        .catch(error => {
          commit(types.AUTH_ERROR, error.response.data);
        });
    },
    [types.LOGOUT]({ dispatch }, { redirect }) {
      return http
        .post("/auth/logout")
        .then(() => {
          dispatch("reset_store");
          redirect();
        })
        .catch(() => {
          dispatch("reset_store");
          redirect();
        });
    }
  };
}
