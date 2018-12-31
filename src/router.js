import Vue from "vue";
import Router from "vue-router";
import createAsyncPage from "./hocs/createAsyncPage";

Vue.use(Router);

const PollsPage = () => import("./pages/Polls.vue");
const PollDetailsPage = () => import("./pages/PollDetails.vue");
const LoginPage = () => import("./pages/Login.vue");
const RegistrationPage = () => import("./pages/Register.vue");
const AddPollPage = () => import("./pages/AddPoll.vue");
const ManagePollsPage = () => import("./pages/ManagePolls.vue");

const AsyncPollsPage = createAsyncPage({
  module: "polls",
  fetchData: ({ store }) => {
    store.commit(`polls/clear_data`);
    store.commit(`polls/reset_count`);
    store.commit(`polls/reset_offset`);
    store.commit(`polls/is_loading`);
    return store.dispatch("polls/fetch_data");
  }
})(PollsPage);
const AsyncPollDetailsPage = createAsyncPage({
  module: "pollDetails",
  fetchData: ({ store, route }) => {
    store.commit(`pollDetails/clear_data`);
    store.commit(`pollDetails/is_loading`);
    return store.dispatch("pollDetails/fetch_data", { id: route.params.id });
  }
})(PollDetailsPage);

const AsyncManagePollsPage = createAsyncPage({
  module: "myPolls",
  fetchData: ({ store }) => {
    store.commit(`myPolls/clear_data`);
    store.commit(`myPolls/reset_count`);
    store.commit(`myPolls/reset_offset`);
    store.commit(`myPolls/order`, "desc");
    store.commit(`myPolls/is_loading`);
    return store.dispatch("myPolls/fetch_data");
  }
})(ManagePollsPage);

const routes = [
  {
    path: "/poll-details/:id",
    component: AsyncPollDetailsPage
  },
  {
    path: "/register",
    component: RegistrationPage
  },
  {
    path: "/login",
    component: LoginPage
  },
  {
    path: "/add-poll",
    component: AddPollPage
  },
  {
    path: "/manage-polls",
    component: AsyncManagePollsPage
  },
  { path: "/", component: AsyncPollsPage },
  { path: "*", redirect: "/" }
];

export function createRouter() {
  return new Router({
    mode: "history",
    fallback: false,
    routes
  });
}
