<template>
  <div class="poll-details-page">
    <div class="poll-details-page__header">
      <span class="logo">
        <i class="fas fa-poll"></i>
      </span>
      <span class="title">Poll</span>
    </div>
    <div class="poll-details-page__chart">
      <span class="question">{{question}}</span>
      <pie-chart
        id="pie-chart"
        :colors="['rgb(251, 219, 116)', 'rgb(51, 51, 51)']"
        :data="chartData"
        width="auto"
      ></pie-chart>
    </div>
    <div class="poll-details-page__footer">
      <drop-down-menu
        id="drop-down-menu"
        :selections="choices"
        :selected="selected"
        v-on:select="handleSelect"
        :styles="dropDownMenuStyles"
      ></drop-down-menu>
      <button class="button" @click="handleSubmitVote">Submit Vote</button>
    </div>
  </div>
</template>
<script>
import DropDownMenu from "../components/DropDownMenu.vue";

export default {
  name: "poll-details-page",
  props: ["data"],
  components: {
    DropDownMenu
  },
  data() {
    return {
      selected: this.data.choices[0].value,
      choiceIds: this.data.choices.reduce((acc, current) => {
        acc[current.value] = current.id;

        return acc;
      }, {})
    };
  },
  methods: {
    handleSelect(value) {
      this.selected = value;
    },
    handleSubmitVote() {
      const payload = {
        choiceId: this.choiceId,
        pollId: this.pollId
      };

      this.$store.dispatch("pollDetails/update", payload);
    }
  },
  computed: {
    module() {
      return "pollDetails";
    },
    pollId() {
      return this.data.id;
    },
    choiceId() {
      return this.choiceIds[this.selected];
    },
    chartData() {
      return this.data.choices.map(c => [c.value, c.votes]);
    },
    question() {
      return this.data.question;
    },
    choices() {
      return this.data.choices.map(c => c.value);
    },
    dropDownMenuStyles() {
      return {
        fontSize: "2rem"
      };
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

%poll-details-page {
  @extend %page-container-base;
  @include flex(column, center, center);
  background: $red;
}
%poll-details-page__header {
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
%poll-details-page__chart {
  @extend %responsive-width;
  @include flex(row, flex-start, center);
  @include respond(tablet) {
    @include flex(column, center, center);
  }

  background: $yellow;
  .question {
    font-size: 2rem;
    font-weight: bold;
    color: $black;
    text-align: center;
    width: auto;
  }
  #pie-chart {
    display: block;
    text-align: center;
    margin: 0 auto;
  }
}
%poll-details-page__footer {
  @include flex(row, center, center);
  @extend %responsive-width;
  padding-bottom: 5rem;

  .button {
    @extend %button-base;
    width: 100%;
    font-size: 2rem;
    color: $yellow;
    border: 0.1rem solid $yellow;
  }
}

.poll-details-page {
  @extend %poll-details-page;
  &__header {
    @extend %poll-details-page__header;
  }
  &__chart {
    @extend %poll-details-page__chart;
  }
  &__footer {
    @extend %poll-details-page__footer;
  }
}
</style>