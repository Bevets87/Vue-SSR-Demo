<template>
  <div>
    <div class="menu-burger__sidebar" v-show="isSideBarOpen" :style="sideBarStyles">
      <nav class="sidebar__nav">
        <slot></slot>
      </nav>
      <span class="sidebar__button" @click="closeMenu">
        <span class="cross" :style="leftCrossStyles"></span>
        <span class="cross" :style="rightCrossStyles"></span>
      </span>
    </div>

    <div class="menu-burger__button" @click="openMenu">
      <span class="line" :style="topBarStyles"></span>
      <span class="line" :style="middleBarStyles"></span>
      <span class="line" :style="bottomBarStyles"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "menu-burger",
  props: ["sideBarStyles", "isSideBarOpen"],
  methods: {
    openMenu() {
      this.$emit("open");
    },
    closeMenu() {
      this.$emit("close");
    }
  },
  computed: {
    crossStyles() {
      return {
        position: "absolute",
        top: "2rem",
        left: "1rem",
        width: "2rem",
        height: "0.5rem"
      };
    },
    leftCrossStyles() {
      return {
        ...this.crossStyles,
        transform: "rotate(45deg)"
      };
    },
    rightCrossStyles() {
      return {
        ...this.crossStyles,
        transform: "rotate(-45deg)"
      };
    },
    barStyles() {
      return {
        position: "absolute",
        height: "20%",
        left: 0,
        right: 0
      };
    },
    topBarStyles() {
      return {
        ...this.barStyles,
        top: "0%"
      };
    },
    middleBarStyles() {
      return {
        ...this.barStyles,
        top: "40%"
      };
    },
    bottomBarStyles() {
      return {
        ...this.barStyles,
        top: "80%"
      };
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/sass/variables";
%menu-burger__sidebar {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  background-color: $red;
  border-left: 0.2rem solid $yellow;
  overflow-x: hidden;
  padding-top: 5rem;
  transition: 0.5s;
  .sidebar__nav {
    color: $red;
    font-size: 2rem;
  }
  .sidebar__nav > * {
    display: flex;
    text-decoration: none;
    padding: 0.7rem;
    width: 100%;
    text-align: right;
    color: $yellow;
    &:hover {
      background: $yellow;
      color: $red;
    }
  }
  .sidebar__nav > * > span {
    font-weight: 700;

    width: 100%;
  }
  .sidebar__button {
    height: 5rem;
    width: 5rem;
    cursor: pointer;
    .cross {
      background: $yellow;
    }
  }
}

%menu-burger__button {
  position: relative;
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  cursor: pointer;
  .line {
    background: $red;
  }
}

.menu-burger {
  &__sidebar {
    @extend %menu-burger__sidebar;
  }
  &__button {
    @extend %menu-burger__button;
  }
}
</style>