<template>
  <div class="half-circle-spinner">
    <div class="half-circle-spinner__container" :style="containerStyle">
      <div class="circle circle-top" :style="circleTopStyle"></div>
      <div class="circle circle-bottom" :style="circleBottomStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "half-circle-spinner",
  props: {
    animationDuration: {
      type: Number,
      default: 1000
    },
    size: {
      type: Number,
      default: 20
    },
    color: {
      type: String,
      default: "rgb(251, 219, 116)"
    }
  },
  computed: {
    containerStyle() {
      return {
        height: `${this.size}rem`,
        width: `${this.size}rem`
      };
    },
    circleStyle() {
      return {
        borderWidth: `${this.size / 10}rem`,
        animationDuration: `${this.animationDuration}ms`
      };
    },
    circleTopStyle() {
      return Object.assign(
        {
          borderTopColor: this.color
        },
        this.circleStyle
      );
    },
    circleBottomStyle() {
      return Object.assign(
        {
          borderBottomColor: this.color
        },
        this.circleStyle
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/sass/variables";
@import "../styles/sass/base";
@import "../styles/sass/mixins";
%half-circle-spinner {
  @extend %page-container-base;
  @include flex(row, center, center);
  background: $red;
}
%half-circle-spinner__container {
  position: relative;
  height: 20rem;
  width: 20rem;
}
%circle {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: calc(20rem / 10) solid transparent;
}

@keyframes half-circle-spinner-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.half-circle-spinner {
  @extend %half-circle-spinner;
  &__container {
    @extend %half-circle-spinner__container;
  }
}
.circle {
  @extend %circle;
}
.circle-top {
  border-top-color: $yellow;
  animation: half-circle-spinner-animation 1s infinite;
}
.circle-bottom {
  border-bottom-color: $yellow;
  animation: half-circle-spinner-animation 1s infinite alternate;
}
</style>