export default {
  methods: {
    fetchNext() {
      if (this.offset + this.limit < this.count) {
        let next = this.offset + this.limit;
        this.$store.commit(`${this.module}/offset`, next);
        this.$store.commit(`${this.module}/is_loading_next`);

        setTimeout(() => {
          this.$store.dispatch(`${this.module}/fetch_data`);
        }, 1000);
      }
    }
  },
  computed: {
    count() {
      return this.$store.state[this.module].count;
    },
    limit() {
      return this.$store.state[this.module].options.limit;
    },
    offset() {
      return this.$store.state[this.module].options.offset;
    },
    isLoadingNext() {
      return this.$store.state[this.module].loading_next;
    }
  }
};
