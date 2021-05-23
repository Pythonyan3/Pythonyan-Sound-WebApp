<template>
  <section class="login__section">
    <div class="container">
      <div class="login__section__inner">
        <form @submit.prevent="login" class="login__form" action="">
          <div class="section__text">
            To continue, log in to Pythonyan Sound.
          </div>

          <ErrorMessages
            v-if="
              getError.fromComponentName == $options.name &&
              getError.data.length
            "
          />

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
            <div v-if="isLoading" class="loading_spinner"></div>
            <input v-else class="submit__login" type="submit" value="log in" />
          </div>

          <div class="divider"></div>

          <div class="section__text">Don't have an account?</div>

          <router-link :to="{ name: 'Signup' }" class="sign__button"
            >sign up for pythonyan sound</router-link
          >
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import ErrorMessages from "./ErrorMessages.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Login",

  components: {
    ErrorMessages,
  },

  data() {
    return {
      login_form: {
        username: "",
        password: "",
      },
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      getProfile: "profile/getProfile",

      getError: "getError",
    }),
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
    this.$store.commit("CLEAR_ERROR");
  },
  methods: {
    ...mapActions({
      loginAction: "profile/loginAction",
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
      this.$store.commit("CLEAR_ERROR");
      const result = await this.loginAction({
        api: this.$api,
        username: this.login_form.username,
        password: this.login_form.password,
        componentName: this.$options.name,
      });
      this.isLoading = false;
      if (result) {
        this.$router.replace({ name: "Main" });
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

.loading_spinner {
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
  width: 25px;
  height: 25px;
  margin: 7px auto 0 auto;
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
