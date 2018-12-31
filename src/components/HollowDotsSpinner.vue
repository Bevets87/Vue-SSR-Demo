<template>
  <div class="hollow-dots-spinner" :style="spinnerStyle">
    <div
      class="hollow-dots-spinner__dot"
      v-for="(ds, index) in dotsStyles"
      :style="ds"
      :key="index"
    ></div>
  </div>
</template>

<script>
export default {
  name: "hollow-dots-spinner",
  props: {
    animationDuration: {
      type: Number,
      default: 1000
    },
    size: {
      type: Number,
      default: 100
    },
    dotSize: {
      type: Number,
      default: 3.5
    },
    dotsNum: {
      type: Number,
      default: 3
    },
    color: {
      type: String,
      default: "rgb(251, 219, 116)"
    }
  },
  computed: {
    horizontalMargin() {
      return this.dotSize / 2;
    },
    spinnerStyle() {
      return {
        width: `${this.size}%`
      };
    },

    dotStyle() {
      return {
        animationDuration: `${this.animationDuration}ms`,
        width: `${this.dotSize}rem`,
        height: `${this.dotSize}rem`,
        margin: `0 ${this.horizontalMargin}rem`,
        borderWidth: `${this.dotSize / 5}rem`,
        borderColor: this.color
      };
    },
    dotsStyles() {
      const dotsStyles = [];
      const delayModifier = 0.3;
      const basicDelay = 1000;
      for (let i = 1; i <= this.dotsNum; i++) {
        const style = Object.assign(
          {
            animationDelay: `${basicDelay * i * delayModifier}ms`
          },
          this.dotStyle
        );
        dotsStyles.push(style);
      }
      return dotsStyles;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/sass/variables";
@import "../styles/sass/mixins";
%hollow-dots-spinner {
  @include flex(row, center, center);
  padding: 1rem;
}
%hollow-dots-spinner__dot {
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 calc(1.5rem / 2);
  border: calc(1.5rem / 5) solid $yellow;
  border-radius: 50%;
  float: left;
  transform: scale(0);
  animation: hollow-dots-spinner-animation 1000ms ease infinite 0ms;
  @for $i from 1 through 3 {
    &:nth-child($i) {
      animation-delay: calc(300ms * $i);
    }
  }
}
@keyframes hollow-dots-spinner-animation {
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.hollow-dots-spinner {
  @extend %hollow-dots-spinner;
  &__dot {
    @extend %hollow-dots-spinner__dot;
  }
}
</style>