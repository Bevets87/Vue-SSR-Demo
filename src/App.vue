<template>
  <div id="app">
    <router-header></router-header>
    <router-view></router-view>
  </div>
</template>
<script>
import RouterHeader from "./components/RouterHeader.vue";

export default {
  name: "app",
  components: {
    RouterHeader
  }
};
</script>
<style lang="scss">
@import "./styles/sass/reset";
</style>


