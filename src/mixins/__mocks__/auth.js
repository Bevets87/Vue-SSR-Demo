export default {
  methods: {
    logout: jest.fn(function() {
      this.$store.state.auth.authenticated = false;
    })
  },
  computed: {
    authenticated() {
      return this.$store.state.auth.authenticated;
    }
  }
};
