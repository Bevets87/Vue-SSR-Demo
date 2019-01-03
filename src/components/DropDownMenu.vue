<template>
  <div class="drop-down">
    <button :style="buttonStyles" class="drop-down__button" v-on:click="toggleMenu">
      {{selected}}
      <i class="fas fa-angle-down"></i>
    </button>
    <div v-show="isVisible" class="drop-down__menu">
      <button
        :style="buttonStyles"
        v-on:click="handleClick"
        v-for="(s, i) in selections"
        :key="i"
        :value="s"
      >{{s}}</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "drop-down-menu",
  props: ["selections", "selected", "styles"],
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    showMenu() {
      this.isVisible = true;
    },
    hideMenu() {
      this.isVisible = false;
    },
    toggleMenu() {
      if (!this.isVisible) {
        this.showMenu();
      } else {
        this.hideMenu();
      }
    },
    handleClick(e) {
      let selected = e.target.value;
      this.$emit("select", selected);
      this.hideMenu();
    }
  },
  computed: {
    buttonStyles() {
      return this.styles ? this.styles : null;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/sass/base";
@import "../styles/sass/variables";
@import "../styles/sass/mixins";

%drop-down {
  position: relative;
  width: 100%;
}
%drop-down__button {
  @extend %button-base;
  @include flex(row, space-between, center);
  font-size: 2.5rem;
  background: $red;
  color: $yellow;
  border: 0.1rem solid $yellow;
  width: 100%;
}
%drop-down__menu {
  position: absolute;
  width: 100%;

  button {
    @extend %button-base;
    opacity: 1;
    font-size: 2.5rem;
    background: $red;

    color: $yellow;
    border: 0.1rem solid $yellow;
    border-top: none;
    text-align: right;
    width: 100%;
  }
}

.drop-down {
  @extend %drop-down;
  &__button {
    @extend %drop-down__button;
  }
  &__menu {
    @extend %drop-down__menu;
  }
}
</style>

