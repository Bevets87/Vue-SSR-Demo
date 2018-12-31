<template>
  <div class="fetch-controls">
    <search-box
      :setSearchTerm="handleSetSearchTerm"
      :searchTerm="searchTerm"
      :placeholder="placeholder"
    ></search-box>
    <div class="fetch-controls__container">
      <drop-down-menu
        v-on:select="handleSelect"
        :selections="sortOptions"
        :selected="sortSelection"
      ></drop-down-menu>
      <button class="submit" v-on:click="submit">Submit</button>
    </div>
  </div>
</template>
<script>
import SearchBox from "./SearchBox.vue";
import DropDownMenu from "./DropDownMenu.vue";
export default {
  name: "fetch-controls",
  components: {
    SearchBox,
    DropDownMenu
  },
  props: [
    "sortOptions",
    "sortSelection",
    "searchTerm",
    "setSearchTerm",
    "setSort",
    "submit",
    "placeholder"
  ],
  methods: {
    handleSelect(selection) {
      this.setSort(selection);
    },
    handleSetSearchTerm(e) {
      this.setSearchTerm(e.target.value);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/sass/variables";
@import "../styles/sass/base";
@import "../styles/sass/mixins";
.fetch-controls {
  width: 100%;
  background: $red;
  margin: 0 auto;
  @include flex(row, center, center);
  height: auto;
  @include respond(tablet) {
    @include flex(column, center, center);
  }

  &__container {
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  button {
    @extend %button-base;
    font-size: 2.5rem;
    background: $red;
    width: 50%;
    color: $yellow;

    text-align: center;
    border: 0.1rem solid $yellow;
  }
}
</style>
