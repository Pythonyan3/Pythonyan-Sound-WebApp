<template>
  <div class="login">
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
          <form @submit.prevent="login" class="login__form" action="">
            <h2 class="section__text">
              To continue, log in to Pythonyan Sound.
            </h2>

            <div v-if="getErrors.length" class="errors">
              <div v-for="error in getErrors" :key="error">
                {{ error }}
              </div>
            </div>

            <div class="input__block">
              <label class="label__item">Enter username or email address</label>
              <input
                v-model="login_form.username"
                class="input__item"
                placeholder="Username"
                minlength="4"
                required
              />
            </div>

            <div class="input__block">
              <label class="label__item">Enter a password</label>
              <input
                v-model="login_form.password"
                class="input__item"
                type="password"
                placeholder="Password"
                minlength="4"
                required
              />
            </div>

            <div class="input__block submit__block">
              <div v-if="isLoading" class="loading_spinner">
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
              </div>
              <input v-else class="submit__login" type="submit" value="log in" />
            </div>

            <div class="divider"></div>

            <h2 class="section__text">Don't have an account?</h2>

            <router-link :to="{ name: 'Signup' }" class="sign__button"
              >sign up for pythonyan sound</router-link
            >
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "Login",
  data() {
    return {
      login_form: {
        username: "",
        password: "",
      },
      isLoading: false
    };
  },
  computed: {
    ...mapGetters({
      "getProfile": "profile/getProfile", 
      "getErrors": "getErrors"
      })
  },
  /**
   * Checks user's credentials in storage
   * If it contains credentials then redirect to Main component
   */
  created(){
    if (this.getProfile){
      this.$router.replace({ name: 'Main' })
    }
  },
  /**
   * Clear errors from vuex storage before left
   */
  unmounted() {
    this.clear_errors();
  },
  methods: {
    ...mapActions({
        "login_action": "profile/login_action",
        "clear_errors": "clear_errors"
      }),
    /**
     * Sends request to Backend server to login user with POST method
     * Request body contains:
     * @param {string} this.login_form.username - user's username or email address
     * @param {string} this.login_form.password - user's password
     * Also uses request error handler to send request
     */
    async login() {
      // clear all previous errors
      this.isLoading = true;
      this.clear_errors();
      await this.login_action({
        api: this.$api,
        error_parser: this.$response_error_parser,
        username: this.login_form.username,
        password: this.login_form.password
      });
      this.isLoading = false;
      if (this.getProfile){
        this.$router.replace({ name: 'Main' });
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  color: black;
}

.header {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #d9dadc;
}

.header__logo {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.header__logo__icon {
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
  margin-top: 50px;
}

.section__text {
  font-weight: 600;
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
  position: relative;
  align-items: center;
  margin-top: 25px;
}

.loading_spinner{
  position: relative;
  min-width: 160px;
  min-height: 55px;
  border: 1px solid #ffcbdb;
  border-radius: 100px;
  background-color: #ffcbdb;
}

.loading_spinner:after {
  content: " ";
  display: block;
  position: absolute;
  top: 8px;
  left: 60px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 6px solid #000;
  border-color: #000 transparent #000 transparent;
  animation: loading_spinner 1.2s linear infinite;
}
@keyframes loading_spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.submit__login {
  min-width: 160px;
  padding: 16px 14px 18px;
  border: 1px solid #ffcbdb;
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

.divider {
  margin: 15px 0 15px 0;
  border-top: 1px solid #d9dadc;
}

.sign__button {
  color: black;
  margin-top: 15px;
  padding: 16px 0;
  letter-spacing: 2px;
  font-weight: 500;
  text-align: center;
  color: #616467;
  border: 1px solid #616467;
  border-radius: 500px;
  text-transform: uppercase;
  transition: 0.3s;
}

.sign__button:hover {
  color: white;
  background-color: #616467;
}
</style>
