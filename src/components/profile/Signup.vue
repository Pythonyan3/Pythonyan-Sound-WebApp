<template>
  <section class="login__section">
    <div class="container">
      <div class="login__section__inner">
        <template v-if="!isRegistered">
          <div class="section__title">Sign up for free to start listening.</div>

          <form @submit.prevent="signup" class="login__form" action="">
            <ErrorMessages />

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
              <div v-if="isLoading" class="loading_spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <input
                v-else
                class="submit__login"
                type="submit"
                value="sign up"
              />
            </div>

            <div class="have__account">
              <span>Have an account?</span>
              <router-link :to="{ name: 'Login' }" class="have__account__link"
                >Log in</router-link
              >
            </div>
          </form>
        </template>
        <template v-else>
          <div class="section__title">&#127881; Thank you for registration on Pythonyan Sound &#128013;</div>
          <div class="section__subtitle">&#128591; Please check your mailbox for verifying your email address &#128231;</div>
          <div class="section__subtitle">&#127775; You can login to your profile <router-link :to="{name: 'Login'}" class="here__login__link">here</router-link> &#129311;</div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import ErrorMessages from "./ErrorMessages.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Signup",

  components: {
    ErrorMessages,
  },

  data() {
    return {
      signup_form: {
        username: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      isLoading: false,
      isRegistered: false,
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
    this.$store.commit("CLEAR_ERROR");
  },

  computed: {
    ...mapGetters({
      getProfile: "profile/getProfile",
    }),
  },

  methods: {
    ...mapActions({
      signup_action: "profile/signup_action",
    }),

    async signup() {
      this.$store.commit("CLEAR_ERROR");
      this.isLoading = true;

      const result = await this.signup_action({
        api: this.$api,
        username: this.signup_form.username,
        email: this.signup_form.email,
        password: this.signup_form.password,
        confirm_password: this.signup_form.confirm_password,
      });
      this.isLoading = false;

      this.isRegistered = result;
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
  margin-top: 15px;
}

.section__title {
  margin-top: 40px;
  font-weight: 600;
  font-size: 1.5rem;
  text-align: center;
}

.section__subtitle {
  margin-top: 40px;
  font-weight: 600;
  font-size: 1.3rem;
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

.have__account {
  margin: 15px 15px;
  text-align: center;
}

.have__account__link {
  color: #ffa1bd;
}

.here__login__link{
  font-size: 1.3rem;
  color: #ffa1bd;
}
</style>
