<template>
  <div class="register-page">
    <form-box>
      <template slot="title">Register</template>
      <template slot="inputs">
        <input
          type="text"
          name="username"
          :value="username"
          placeholder="Username"
          v-on:input="handleInput"
        >
        <input
          type="password"
          name="password"
          :value="password"
          placeholder="Password"
          v-on:input="handleInput"
        >
        <input
          type="password"
          name="password confirmation"
          :value="passwordConfirmation"
          placeholder="Password Confirmation"
          v-on:input="handleInput"
        >
      </template>
      <template slot="buttons">
        <button value="submit" v-on:click="handleClick">Submit</button>
      </template>
      <template v-if="message" slot="message">
        <span>{{ message }}</span>
      </template>
    </form-box>
  </div>
</template>
<script>
import FormBox from "../components/FormBox.vue";
import parseError from "../utils/parseError";
import auth from "../mixins/auth";

export default {
  name: "register-page",
  components: {
    FormBox
  },
  mixins: [auth],
  beforeDestroy() {
    this.clearAuthError();
  },
  data() {
    return {
      username: "",
      password: "",
      passwordConfirmation: ""
    };
  },
  methods: {
    handleInput(e) {
      if (e.target.name === "username") {
        this.username = e.target.value;
      }
      if (e.target.name === "password") {
        this.password = e.target.value;
      }
      if (e.target.name === "password confirmation") {
        this.passwordConfirmation = e.target.value;
      }
    },
    handleClick(e) {
      e.preventDefault();
      if (e.target.value === "submit") {
        this.register(this.$data);
      }
    }
  },
  computed: {
    message() {
      return parseError(this.authError);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/sass/base";
@import "../styles/sass/variables";
@import "../styles/sass/mixins";
.register-page {
  @extend %page-container-base;
  @include flex(column, center, center);
  background: $red;
  input {
    @extend %input-base;
    font-size: 2rem;
    border: 0.2rem solid $red;
    color: $red;
    margin: 0.5rem 0;
    text-align: left;
    width: 80%;
  }
  button {
    @extend %button-base;
    border: 0.2rem solid $red;
    color: $red;
    font-size: 1.5rem;
    width: auto;
    padding: 1rem;
    font-weight: bolder;
    margin: 0.2rem;
  }
  span {
    font-size: 1.5rem;
    color: $red;
    font-weight: bolder;
  }
}
</style>