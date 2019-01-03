import HalfCircleSpinner from "../components/HalfCircleSpinner.vue";
import ErrorMessage from "../components/ErrorMessage.vue";

export default ({ module, fetchData }) => Page => ({
  asyncData({ store, route }) {
    return fetchData({ store, route });
  },
  methods: {
    clearError() {
      this.$store.commit(`${module}/clear_error`);
    }
  },
  computed: {
    loading() {
      return this.$store.state[module].loading;
    },
    data() {
      return this.$store.state[module].data;
    },
    error() {
      return this.$store.state[module].error;
    },
    propsSuccess() {
      return {
        data: this.data
      };
    },
    propsFailure() {
      return {
        error: this.error,
        clearError: this.clearError
      };
    }
  },
  render: function(h) {
    if (this.loading) {
      return h(HalfCircleSpinner);
    } else if (this.error) {
      return h(ErrorMessage, { props: this.propsFailure });
    } else {
      return h(Page, { props: this.propsSuccess });
    }
  }
});
