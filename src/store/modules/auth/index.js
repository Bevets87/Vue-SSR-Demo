import { createActions } from "./createActions";
import { createState } from "./createState";
import mutations from "./mutations";

export function createAuthModule(http) {
  return {
    namespaced: false,
    state: createState(),
    actions: createActions(http),
    mutations
  };
}
