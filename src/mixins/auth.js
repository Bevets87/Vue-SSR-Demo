export default {
  methods: {
    redirectToLanding() {
      this.$router.push("/");
    },
    redirectToLogin() {
      this.$router.push("/login");
    },
    clearAuthError() {
      this.$store.commit("clear_auth_error");
    },
    logout() {
      return this.$store.dispatch("logout", {
        redirect: this.redirectToLogin
      });
    },
    login(payload) {
      return this.$store.dispatch("login", {
        payload,
        redirect: this.redirectToLanding
      });
    },
    register(payload) {
      return this.$store.dispatch("register", {
        payload,
        redirect: this.redirectToLanding
      });
    }
  },
  computed: {
    authenticated() {
      return this.$store.state.auth.authenticated;
    },
    authError() {
      return this.$store.state.auth.error;
    }
  }
};
