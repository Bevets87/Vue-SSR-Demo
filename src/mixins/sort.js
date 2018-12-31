export default {
  methods: {
    setSort(sort) {
      if (sort === "Relevant") {
        this.sortNone();
      } else if (sort === "A-Z") {
        this.sortAlphabetical();
      } else if (sort === "Popular") {
        this.sortPopular();
      } else if (sort === "Newest") {
        this.sortNewest();
      } else {
        this.sortNone();
      }
    },
    sortNone() {
      this.$store.commit(`${this.module}/sort`, "Relevant");
      this.$store.commit(`${this.module}/order`, null);
    },
    sortAlphabetical() {
      this.$store.commit(`${this.module}/sort`, "A-Z");
      this.$store.commit(`${this.module}/order`, "asc");
    },
    sortPopular() {
      this.$store.commit(`${this.module}/sort`, "Popular");
      this.$store.commit(`${this.module}/order`, "desc");
    },
    sortNewest() {
      this.$store.commit(`${this.module}/sort`, "Newest");
      this.$store.commit(`${this.module}/order`, "desc");
    }
  },
  computed: {
    sort() {
      return this.$store.state[this.module].options.sort;
    },
    order() {
      return this.$store.state[this.module].options.order;
    },
    sortOptions() {
      return Object.keys(this.sort);
    },
    sortSelection() {
      const [selection] = Object.entries(this.sort)
        .filter(entry => entry[1].selected)
        .map(entry => entry[0]);

      return selection;
    }
  }
};
