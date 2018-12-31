<template>
  <div class="add-poll-page">
    <div class="add-poll-page__header">
      <span class="logo">
        <i class="fas fa-poll"></i>
      </span>
      <span class="title">Add Poll</span>
    </div>
    <div class="add-poll-page__column">
      <label class="label" for="question">Question</label>
      <input class="input" name="question" type="text" v-model="question">
    </div>
    <div class="add-poll-page__column">
      <label class="label" for="options">
        Choices
        <span class="message">(separate by comma)</span>
      </label>
      <textarea name="choices" class="textarea" v-model="text"></textarea>
    </div>
    <div class="add-poll-page__row">
      <button class="button" @click="handleClear">Clear</button>
      <button class="button" @click="handleSubmit">Submit</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "add-poll-page",
  data() {
    return {
      question: "",
      text: ""
    };
  },
  methods: {
    navigateToLanding() {
      this.$router.push("/");
    },
    handleClear() {
      this.question = "";
      this.text = "";
    },
    handleSubmit() {
      if (this.isValidPoll) {
        this.$store.dispatch("myPolls/create", {
          payload: this.poll,
          redirect: this.navigateToLanding
        });
      }
    }
  },
  computed: {
    isValidPoll() {
      return this.question && this.choices;
    },
    poll() {
      return {
        question: this.question,
        choices: this.choices
      };
    },
    splitText() {
      return this.text
        .split(",")
        .map(s => s.trim())
        .filter(s => s.length);
    },
    choices() {
      return this.splitText.length ? this.splitText : null;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/sass/variables";
@import "../styles/sass/base";
@import "../styles/sass/mixins";
%responsive-width {
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
%add-poll-page {
  @extend %page-container-base;
  @include flex(column, center, center);
  background: $red;
}
%add-poll-page__header {
  @include flex(row, flex-start, center);
  border: 0.1rem solid $yellow;

  @extend %responsive-width;
  .logo {
    color: $yellow;
    font-size: 4rem;
  }
  .title {
    color: $yellow;
    font-size: 4rem;
    font-weight: bold;
  }
}
%add-poll-page__column {
  @extend %responsive-width;
  @include flex(column, center, center);
  background: $yellow;
  padding: 1rem;

  .label {
    width: 80%;
    text-align: left;
    font-size: 2.5rem;
    color: $red;
    font-weight: bold;
    .message {
      font-size: 1rem;
      font-style: italic;
    }
  }
  .input {
    @extend %input-base;
    background: $red;
    color: $yellow;
    font-size: 2.5rem;
    width: 80%;
  }
  .textarea {
    background: $red;
    color: $yellow;
    font-size: 2.5rem;
    width: 80%;
    outline: none;
    text-align: right;
    font-family: inherit;
    &::placeholder {
      color: $yellow;
    }
  }
}

%add-poll-page__row {
  @extend %responsive-width;
  @include flex(row, center, center);
  background: $yellow;
  padding: 1rem;

  .button {
    @extend %button-base;
    width: 40%;

    border: 0.1rem solid $red;
    font-size: 3rem;
    color: $red;
  }
}

.add-poll-page {
  @extend %add-poll-page;
  &__header {
    @extend %add-poll-page__header;
  }
  &__column {
    @extend %add-poll-page__column;
  }
  &__row {
    @extend %add-poll-page__row;
  }
}
</style>
