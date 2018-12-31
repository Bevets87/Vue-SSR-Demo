<template>
  <div class="bubble-menu">
    <menu-burger
      :isSideBarOpen="sideBarOpened"
      :sideBarStyles="sideBarStyles"
      @open="openMenu"
      @close="closeMenu"
    >
      <slot></slot>
    </menu-burger>
  </div>
</template>

<script>
import MenuBurger from "./MenuBurger.vue";
export default {
  name: "bubble-menu",
  components: {
    MenuBurger
  },
  props: ["message"],
  data() {
    return {
      sideBarOpened: false,
      sideBarStyles: {
        width: "0",

        borderTopLeftRadius: "0",
        borderBottomLeftRadius: "0",

        transitionTimingFunction: null
      }
    };
  },
  methods: {
    delay(callback, delay) {
      return new Promise(resolve => {
        callback();
        setTimeout(() => {
          resolve();
        }, delay);
      });
    },
    openAnimationStart() {
      this.sideBarStyles.transitionTimingFunction = "ease-in";
      this.sideBarStyles.width = "20rem";
      this.sideBarStyles.borderBottomLeftRadius = "15rem";
      this.sideBarStyles.borderTopLeftRadius = "15rem";
    },
    openAnimationFinish() {
      this.sideBarStyles.transitionTimingFunction =
        "cubic-bezier(.29, 1.01, 1, -0.68)";
      this.sideBarStyles.borderBottomLeftRadius = "0";
      this.sideBarStyles.borderTopLeftRadius = "0";
    },
    closeAnimationStart() {
      this.sideBarStyles.borderBottomLeftRadius = "15rem";
      this.sideBarStyles.borderTopLeftRadius = "15rem";
    },
    closeAnimationMiddle() {
      this.sideBarStyles.width = "0";
    },
    closeAnimationEnd() {
      this.sideBarOpened = false;
      this.sideBarStyles.borderBottomLeftRadius = "0";
      this.sideBarStyles.borderTopLeftRadius = "0";
    },
    openMenu() {
      this.sideBarOpened = true;
      this.delay(this.openAnimationStart, 50).then(this.openAnimationFinish);
    },
    closeMenu() {
      this.delay(this.closeAnimationStart, 200)
        .then(this.delay(this.closeAnimationMiddle, 100))
        .then(this.closeAnimationEnd);
    }
  },
  watch: {
    message(value) {
      if ((value = "close menu")) {
        this.$emit("clearMessage");
        this.closeMenu();
      }
    }
  }
};
</script>