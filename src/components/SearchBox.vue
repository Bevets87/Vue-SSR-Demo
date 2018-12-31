<template>
  <div class="search-box">
    <button>
      <i class="fas fa-search"></i>
    </button>
    <input
      :placeholder="placeholder"
      type="text"
      :value="searchTerm"
      class="search-box__input"
      v-on:input="setSearchTerm"
    >
  </div>
</template>
<script>
export default {
  name: "search-box",
  props: ["searchTerm", "setSearchTerm", "placeholder"]
};
</script>
<style lang="scss" scoped>
@import "../styles/sass/variables";
@import "../styles/sass/base";
@import "../styles/sass/mixins";
.search-box {
  @include flex(row, flex-start, center);
  width: 100%;
  background: $red;
  border: 0.1rem solid $yellow;
  overflow: hidden;

  &__input {
    @extend %input-base;
    font-size: 2.5rem;
    color: $yellow;
    width: 100%;

    background: $red;
    text-align: left;
  }
  button {
    @extend %button-base;
    font-size: 2.5rem;
    cursor: auto;
    background: $yellow;
    color: $red;
    width: auto;
  }
}
</style>


