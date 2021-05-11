<template>
  <div class="signup">
    <header class="header">
      <router-link :to="{ name: 'Main' }">
        <div class="header__logo">
          <img
            class="header__logo__icon"
            src="../../assets/images/snake_logo.png"
            alt=""
          />
          <span class="header__logo__text">Pythonyan Sound</span>
        </div>
      </router-link>
    </header>

    <section class="login__section">
      <div class="container">
        <div class="login__section__inner">
          <h1 class="section__title">Sign up for free to start listening.</h1>

          <form @submit.prevent="signup" class="login__form" action="">
            <div v-if="getErrors.length" class="errors">
              <div v-for="error in getErrors" :key="error">
                {{ error }}
              </div>
            </div>

            <div class="input__block">
              <label class="label__item">What should we call you?</label>
              <input
                v-model="signup_form.username"
                class="input__item"
                placeholder="Enter a profile name"
                required
              />
            </div>

            <div class="input__block">
              <label class="label__item">What is your email?</label>
              <input
                v-model="signup_form.email"
                class="input__item"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div class="input__block">
              <label class="label__item">Create a password</label>
              <input
                v-model="signup_form.password"
                class="input__item"
                type="password"
                placeholder="Enter a password"
                minlength="4"
                required
              />
            </div>

            <div class="input__block">
              <label class="label__item">Confirm your password</label>
              <input
                v-model="signup_form.confirm_password"
                class="input__item"
                type="password"
                placeholder="Enter a password again"
                minlength="4"
                required
              />
            </div>

            <div class="input__block">
              <input class="submit__login" type="submit" value="sign up" />
            </div>

            <div class="have__account">
              <span>Have an account?</span>
              <router-link :to="{ name: 'Login' }" class="have__account__link"
                >Log in</router-link
              >
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Signup",

  data() {
    return {
      signup_form: {
        username: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      isLoading: false,
    };
  },

  /**
   * Checks user's credentials in storage
   * If it contains credentials then redirect to Main component
   */
  created() {
    if (this.getProfile) {
      this.$router.replace({ name: "Main" });
    }
  },
  /**
   * Clear errors from vuex storage before left
   */
  unmounted() {
    this.clear_errors();
  },

  computed: {
    ...mapGetters({
      getProfile: "profile/getProfile",
      getErrors: "getErrors",
    }),
  },

  methods: {
    ...mapActions({
      signup_action: "profile/signup_action",
      clear_errors: "clear_errors",
    }),

    async signup() {
      this.clear_errors();
    
      const result = await this.signup_action({
        api: this.$api,
        error_parser: this.$response_error_parser,
        username: this.signup_form.username,
        email: this.signup_form.email,
        password: this.signup_form.password,
        confirm_password: this.signup_form.confirm_password,
      });

      if (result) {
        this.$router.push({ name: "Login" });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  color: black;
}

body {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: center;
}

.header__logo {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.header__logo__icon {
  max-width: 100px;
  max-width: 100px;
}

.header__logo__text {
  font-weight: 600;
  font-size: 2rem;
}

.login__section {
  width: 100%;
}

.container {
  width: 100%;
  max-width: 1185px;
  margin: 0 auto;
}

.login__section__inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.errors {
  width: 100%;
  margin: 15px 0 0 0;
  padding: 10px 5px 10px 5px;
  background-color: #ffa1bd;
  text-align: center;
}

.login__form {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 450px;
  margin-top: 15px;
}

.section__title {
  margin-top: 40px;
  font-weight: 600;
  font-size: 1.5rem;
  text-align: center;
}

.input__block {
  display: flex;
  flex-direction: column;
  margin-top: 25px;
}

.label__item {
  font-weight: 600;
  margin-bottom: 10px;
}

.input__item {
  height: 40px;
  padding: 6px 12px;
  border: 1px solid #d9dadc;
}

input:focus {
  outline: none !important;
  border: 1px solid #919496;
}

.submit__block {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
}

.submit__login {
  min-width: 160px;
  padding: 16px 14px 18px;
  border: 0;
  border-radius: 100px;
  font-weight: 600;
  background-color: #ffcbdb;
  text-transform: uppercase;
  transition: 0.3s;
}

.submit__login:hover {
  background-color: #ffa1bd;
  cursor: pointer;
}

.have__account {
  margin: 15px 15px;
  text-align: center;
}

.have__account__link {
  color: #ffa1bd;
}
</style>
