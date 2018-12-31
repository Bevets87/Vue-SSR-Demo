import Vue from "vue";
import Vuex from "vuex";
import { createModules } from "./modules";
import actions from "./actions";

Vue.use(Vuex);

export function createStore(config) {
  return new Vuex.Store({
    modules: createModules(config.http),
    actions
  });
}
