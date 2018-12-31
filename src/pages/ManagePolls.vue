<template>
  <div class="manage-polls-page">
    <fetch-controls
      placeholder="Search my polls..."
      :sortOptions="sortOptions"
      :sortSelection="sortSelection"
      :searchTerm="searchTerm"
      :setSort="setSort"
      :setSearchTerm="setSearchTerm"
      :submit="handleSubmit"
    ></fetch-controls>
    <infinite-scroll :items="response" :loadNext="fetchNext" :loading="isLoadingNext">
      <template slot-scope="{ item }">
        <poll-item
          type="deletable"
          :id="item.id"
          :question="item.question"
          :created_at="item.created_at"
          :creator="item.creator"
          :votes="item.votes"
          v-on:select="handleSelect"
        ></poll-item>
      </template>
    </infinite-scroll>
  </div>
</template>
<script>
import FetchControls from "../components/FetchControls.vue";
import InfiniteScroll from "../components/InfiniteScroll.vue";
import PollItem from "../components/PollItem.vue";
import sort from "../mixins/sort";
import offset from "../mixins/offset";
import search from "../mixins/search";
export default {
  props: ["response"],
  mixins: [sort, search, offset],
  components: {
    FetchControls,
    InfiniteScroll,
    PollItem
  },

  methods: {
    handleSubmit() {
      this.$store.commit(`myPolls/clear_data`);
      this.$store.commit(`myPolls/reset_count`);
      this.$store.commit(`myPolls/reset_offset`);
      this.$store.commit(`myPolls/is_loading`);
      setTimeout(() => {
        this.$store.dispatch(`myPolls/fetch_data`);
      }, 300);
    },
    handleSelect(id) {
      this.$store.dispatch("myPolls/delete", { id });
    }
  },
  computed: {
    module() {
      return "myPolls";
    }
  },
  watch: {
    searchTerm() {
      console.dir(this.$store.state[this.module].options);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/sass/variables";
@import "../styles/sass/base";
@import "../styles/sass/mixins";
.manage-polls-page {
  @extend %page-container-base;
  background: $red;
}
</style>
