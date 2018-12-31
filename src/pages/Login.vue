<template>
  <div class="login-page">
    <form-box>
      <template slot="title">Login</template>
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
      </template>
      <template slot="buttons">
        <button value="register" v-on:click="handleClick">Register</button>
        <button value="submit" v-on:click="handleClick">Submit</button>
      </template>
      <template v-if="message" slot="message">
        <span>{{message}}</span>
      </template>
    </form-box>
  </div>
</template><script>
import FormBox from "../components/FormBox.vue";
import parseError from "../utils/parseError";
import auth from "../mixins/auth";

export default {
  name: "login-page",
  components: {
    FormBox
  },
  mixins: [auth],
  data() {
    return {
      username: "",
      password: ""
    };
  },

  beforeDestroy() {
    this.clearAuthError();
  },
  methods: {
    handleInput(e) {
      if (e.target.name === "username") {
        this.username = e.target.value;
      }
      if (e.target.name === "password") {
        this.password = e.target.value;
      }
    },
    handleClick(e) {
      e.preventDefault();
      if (e.target.value === "submit") {
        this.login(this.$data);
      }
      if (e.target.value === "register") {
        this.$router.push("/register");
      }
    }
  },
  computed: {
    message() {
      return parseError(this.authError);
    }
  }
};
</script><style lang="scss" scoped>
@import "../styles/sass/base";
@import "../styles/sass/variables";
@import "../styles/sass/mixins";
.login-page {
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