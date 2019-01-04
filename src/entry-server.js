import { createApp } from "./app";
import createHttp from "./utils/createHttp";
import fetchPageData from "./utils/fetchPageData";
import getRedirect from "./utils/getRedirect";

const commitAuth = store => {
  store.commit("auth");
};

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp({
      http: createHttp(context)
    });
    if (context.authenticated) {
      commitAuth(store);
    }
    const redirect = getRedirect(store, context.url);

    router.push(redirect ? redirect : context.url);

    router.onReady(() => {
      const asyncComponents = router
        .getMatchedComponents()
        .filter(matchedComponent => matchedComponent.asyncData);

      if (asyncComponents.length) {
        fetchPageData(store, router.currentRoute, asyncComponents)
          .then(() => {
            context.state = store.state;
            resolve(app);
          })
          .catch(reject);
      } else {
        context.state = store.state;
        resolve(app);
      }
    }, reject);
  });
};
