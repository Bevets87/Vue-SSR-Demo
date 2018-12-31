import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";
import { createStore } from "./store";
import { sync } from "vuex-router-sync";
import VueChartkick from "vue-chartkick";
import Chart from "chart.js";

Vue.use(VueChartkick, { adapter: Chart });

export function createApp(config) {
  const router = createRouter();
  const store = createStore({ http: config.http });

  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });
  return { app, router, store };
}
