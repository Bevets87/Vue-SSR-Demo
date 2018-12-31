export default {
  methods: {
    setSearchTerm(searchTerm) {
      this.$store.commit(`${this.module}/filter`, searchTerm);
    },
    clearSearchTerm() {
      this.$store.commit(`${this.module}/clear_filter`);
    }
  },
  computed: {
    searchTerm() {
      return this.$store.state[this.module].options.filter;
    }
  }
};
