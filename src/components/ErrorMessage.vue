<template>
  <div class="error-message">
    <span class="error-message__title">
      <i class="fas fa-poll"></i>
      Error
    </span>
    <span class="error-message__text">{{ parsedError }}</span>
    <button class="error-message__button" @click="redirect">Got it!</button>
  </div>
</template>
<script>
import parseError from "../utils/parseError";
export default {
  name: "error-message",
  props: ["error", "clearError"],
  methods: {
    redirect() {
      this.$router.push("/");
    }
  },
  computed: {
    parsedError() {
      return parseError(this.error);
    }
  },
  beforeDestroy() {
    this.clearError();
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/sass/variables";
@import "../styles/sass/base";
@import "../styles/sass/mixins";
.error-message {
  @extend %page-container-base;
  @include flex(column, center, center);
  background: $red;
  &__title {
    font-size: 4rem;
    font-weight: bold;
    width: 60%;
    color: $yellow;
    background: $red;
    text-align: left;
    border: 0.1rem solid $yellow;
    @include respond(desktop) {
      width: 75%;
    }
    @include respond(tablet) {
      width: 85%;
    }
    @include respond(phone) {
      width: 95%;
    }
  }
  &__text {
    font-size: 3rem;
    text-align: center;
    width: 60%;
    padding: 2.5rem;
    color: $red;
    background: $yellow;
    @include respond(desktop) {
      width: 75%;
    }
    @include respond(tablet) {
      width: 85%;
    }
    @include respond(phone) {
      width: 95%;
    }
  }
  &__button {
    @extend %button-base;
    background: $red;
    font-size: 3rem;
    width: 60%;
    color: $yellow;
    border: 0.1rem solid $yellow;
    @include respond(desktop) {
      width: 75%;
    }
    @include respond(tablet) {
      width: 85%;
    }
    @include respond(phone) {
      width: 95%;
    }
  }
}
</style>
