<template>
  <div class="polls-page">
    <fetch-controls
      placeholder="Search all polls..."
      :sortOptions="sortOptions"
      :sortSelection="sortSelection"
      :searchTerm="searchTerm"
      :setSort="setSort"
      :setSearchTerm="setSearchTerm"
      :submit="handleSubmit"
    ></fetch-controls>
    <infinite-scroll :items="data" :loadNext="fetchNext" :loading="isLoadingNext">
      <template slot-scope="{ item }">
        <poll-item
          type="selectable"
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
  name: "polls-page",
  props: ["data"],
  mixins: [offset, sort, search],
  components: {
    FetchControls,
    InfiniteScroll,
    PollItem
  },
  methods: {
    handleSubmit() {
      this.$store.commit(`polls/clear_data`);
      this.$store.commit(`polls/reset_count`);
      this.$store.commit(`polls/reset_offset`);
      this.$store.commit(`polls/is_loading`);
      setTimeout(() => {
        this.$store.dispatch(`polls/fetch_data`);
      }, 300);
    },
    handleSelect(id) {
      this.$router.push(`/poll-details/${id}`);
    }
  },
  computed: {
    module() {
      return "polls";
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/sass/variables";
@import "../styles/sass/base";
.polls-page {
  @extend %page-container-base;
  background: $red;
}
</style>