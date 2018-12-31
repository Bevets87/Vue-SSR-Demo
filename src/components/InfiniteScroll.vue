<template>
  <div class="infinite-scroll">
    <div v-for="(item, index) in items" :key="index">
      <slot :item="item"></slot>
    </div>
    <div class="infinite-scroll__spinner" v-if="loading">
      <hollow-dots-spinner></hollow-dots-spinner>
    </div>
  </div>
</template>
<script>
import HollowDotsSpinner from "./HollowDotsSpinner.vue";
export default {
  name: "infinite-scroll",
  components: {
    HollowDotsSpinner
  },
  props: ["loading", "loadNext", "items"],
  data() {
    return {
      isBottom: false
    };
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.isBottom = this.bottomVisible();
    });
  },
  methods: {
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    }
  },
  watch: {
    isBottom() {
      if (this.isBottom && !this.loading) {
        this.loadNext();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.infinite-scroll__spinner {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(185, 43, 39, 0.5);
}
</style>


