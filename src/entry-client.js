import { createApp } from "./app";
import axios from "axios";
import fetchPageData from "./utils/fetchPageData";
import getRedirect from "./utils/getRedirect";

const { app, router, store } = createApp({ http: axios });

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const redirect = getRedirect(store, to.path);
    if (redirect) {
      return next(redirect);
    }

    const asyncComponents = router
      .getMatchedComponents(to)
      .filter(matchedComponent => matchedComponent.asyncData);

    if (!asyncComponents.length) {
      return next();
    }
    fetchPageData(store, to, asyncComponents)
      .then(() => {
        next();
      })
      .catch(next);
  });
  const redirect = getRedirect(store, router.currentRoute.path);

  if (redirect) {
    router.replace(redirect, () => {
      app.$mount("#app", true);
    });
  } else {
    app.$mount("#app", true);
  }
});
