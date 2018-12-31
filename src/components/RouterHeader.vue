<template>
  <nav class="nav">
    <router-link class="nav__item nav__item-logo" exact to="/">
      <i class="fas fa-poll"></i>
      PollIt
    </router-link>
    <router-link v-if="!authenticated" class="nav__item nav__item-link" to="/login">
      Login
      <i class="fas fa-sign-in-alt"></i>
    </router-link>
    <bubble-menu v-if="authenticated" :message="message" @clearMessage="handleClearMessage">
      <button class="bubble-menu__item" @click="handleNavigation" value="/add-poll">Create Poll</button>
      <button class="bubble-menu__item" @click="handleNavigation" value="/manage-polls">Manage Polls</button>
      <button class="bubble-menu__item logout" @click="handleLogout">Logout</button>
    </bubble-menu>
  </nav>
</template>
<script>
import BubbleMenu from "./BubbleMenu.vue";
import auth from "../mixins/auth";
export default {
  name: "router-header",
  mixins: [auth],
  components: {
    BubbleMenu
  },
  data() {
    return {
      message: null
    };
  },
  methods: {
    handleNavigation(e) {
      let path = e.target.value;
      if (path === "/add-poll") {
        this.$router.push(path);
      }
      if (path === "/manage-polls") {
        this.$router.push(path);
      }
      this.message = "close menu";
    },
    handleLogout() {
      this.logout();
      this.message = "close menu";
    },
    handleClearMessage() {
      this.message = null;
    }
  }
};
</script>
<style lang="scss">
@import "../styles/sass/variables";
@import "../styles/sass/mixins";
@import "../styles/sass/base";

.bubble-menu__item {
  @extend %button-base;
  @include flex(row, flex-end, center);
  font-size: 1.75rem;
  font-weight: bold;

  width: 100%;
  overflow-x: hidden;
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  height: 5rem;
  width: 100%;
  background: $yellow;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &__item {
    color: $red;
    text-decoration: none;
    margin: 1rem;
    transition: color 0.3s ease-in-out;
    &-link {
      font-size: 2.5rem;
      font-weight: bold;
    }
    &-logo {
      font-size: 3.5rem;
      font-family: $karla-font;
    }
    &:hover {
      color: $black;
    }
  }
}
</style>