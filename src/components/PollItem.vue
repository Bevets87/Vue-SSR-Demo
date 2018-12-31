<template>
  <div :class="className" @click="handleClick">
    <div class="poll-item__header">
      <p>{{ question }}</p>
      <p class="votes">{{ votes }} Votes</p>
    </div>
    <div class="poll-item__footer">
      <p>-posted on {{ created_at | date }} by {{ creator }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "poll-item",
  props: ["id", "question", "created_at", "creator", "votes", "type"],
  methods: {
    handleClick() {
      this.$emit("select", this.id);
    }
  },
  computed: {
    className() {
      return `poll-item ${this.type}`;
    }
  },
  filters: {
    date(value) {
      const [year, month, day] = value.split("T")[0].split("-");

      return month
        .concat("-")
        .concat(day)
        .concat("-")
        .concat(year);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/sass/variables";
@import "../styles/sass/mixins";

%poll-item {
  display: block;
  height: 6rem;
  @include flex(column, space-evenly, center);
  background: $red;
  border: 0.1rem solid $yellow;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &.deletable {
    &:hover {
      &::before {
        position: absolute;
        content: "Delete";
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 6rem;
        width: 100%;
        background: rgba(51, 51, 51, 0.8);
        font-size: 2rem;
        font-weight: bold;
        color: $white;
      }
    }
  }
  &.selectable {
    &:hover {
      background: $white;
      .votes {
        color: $black;
      }
    }
  }
}

%poll-item__header {
  width: 98%;
  margin: 0 auto;
  height: 4rem;
  @include flex(row, space-between, center);
  font-size: 2rem;
  @include respond(desktop) {
    font-size: 1.8rem;
  }
  @include respond(tablet) {
    font-size: 1.6rem;
  }
  @include respond(phone) {
    font-size: 1.4rem;
  }
}

%poll-item__footer {
  width: 98%;
  margin: 0 auto;
  @include flex(row, flex-start, flex-start);
  font-style: italic;
  height: 2rem;
  font-size: 1rem;
  @include respond(desktop) {
    font-size: 0.9rem;
  }
  @include respond(tablet) {
    font-size: 0.8rem;
  }
  @include respond(phone) {
    font-size: 0.7rem;
  }
}

p {
  padding: 0;
  margin: 0;
  text-align: left;
  height: 100%;
  display: flex;
  align-items: center;
  &.votes {
    color: $yellow;
  }
}

.poll-item {
  @extend %poll-item;

  &__header {
    @extend %poll-item__header;
  }
  &__footer {
    @extend %poll-item__footer;
  }
}
</style>
