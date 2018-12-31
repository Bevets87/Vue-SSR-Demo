const pathToRegexp = require("path-to-regexp");
const pollDetailsRoute = pathToRegexp("/poll-details/:id");
const registerRoute = pathToRegexp("/register");
const loginRoute = pathToRegexp("/login");
const addPollRoute = pathToRegexp("/add-poll");
const managePollsRoute = pathToRegexp("/manage-polls");

const getRedirect = (store, route) => {
  const { authenticated } = store.state.auth;
  let redirect = null;
  if (authenticated) {
    if (loginRoute.test(route)) {
      redirect = "/";
    }
    if (registerRoute.test(route)) {
      redirect = "/";
    }
  } else {
    if (pollDetailsRoute.test(route)) {
      redirect = "/login";
    }
    if (addPollRoute.test(route)) {
      redirect = "/login";
    }
    if (managePollsRoute.test(route)) {
      redirect = "/login";
    }
  }
  return redirect;
};

export default getRedirect;
