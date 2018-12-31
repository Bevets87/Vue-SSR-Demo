<template>
  <form class="form-box">
    <span class="form-box__title">
      <i class="fas fa-poll"></i>
      <slot name="title"></slot>
    </span>
    <div class="form-box__inputs">
      <slot name="inputs"></slot>
    </div>
    <div class="form-box__buttons">
      <slot name="buttons"></slot>
    </div>
    <div class="form-box__message">
      <slot name="message"></slot>
    </div>
  </form>
</template>
<script>
export default {
  name: "form-box"
};
</script>
<style lang="scss" scoped>
@import "../styles/sass/variables";
@import "../styles/sass/mixins";
@import "../styles/sass/base";
%form-box {
  @include flex(column, flex-between, center);
  position: relative;
  background: $yellow;
  border: 0.2rem solid $yellow;
  padding-bottom: 3rem;
}
%form-box__title {
  margin-bottom: 1rem;
  height: auto;
  width: 100%;
  background: $red;
  text-align: left;
  font-size: 4rem;
  font-weight: bolder;
  color: $yellow;
}
%form-box__inputs {
  margin-bottom: 1rem;
  width: 100%;
  @include flex(column, space-around, center);
}
%form-box__buttons {
  margin-bottom: 1rem;
  width: 80%;
  @include flex(row, flex-end, center);
}
%form-box__message {
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 0.1rem;
}

.form-box {
  @extend %form-box;
  &__title {
    @extend %form-box__title;
  }
  &__inputs {
    @extend %form-box__inputs;
  }
  &__buttons {
    @extend %form-box__buttons;
  }
  &__message {
    @extend %form-box__message;
  }
  width: 60%;
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
</style>
