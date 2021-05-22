<template>
  <section class="login__section">
    <div class="container">
      <div class="login__section__inner">
        <template v-if="isLoading">
          <div class="section__title">
            Email address confirmation, please wait...
          </div>
          <div class="loading_spinner">
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
        </template>

        <template v-else>
          <template v-if="isVerified">
            <div class="section__title">
              <i class="fas fa-check fa-2x title__icon"></i>Email address verified successful
            </div>

            <div v-if="!getProfile" class="section__subtitle">
              &#127775; You can login to your profile <router-link :to="{name: 'Login'}" class="here__login__link">here</router-link> &#129311;
            </div>
          </template>
          <template v-else>
            <div class="section__title">
              <i class="fas fa-times fa-2x title__icon"></i>Could not verify
              email address
            </div>
            <div class="section__subtitle">
              &#128591; Please try to resend verification mail in profile settings &#128231;
            </div>
          </template>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "EmailVerification",

  data() {
    return {
      isLoading: true,
      isVerified: false,
    };
  },
  
  mounted() {
    this.emailVerify();
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
      emailVerifyAction: "profile/emailVerifyAction",
      clear_errors: "clear_errors",
    }),

    async emailVerify() {
      this.$store.commit("CLEAR_ERROR");
      const result = await this.emailVerifyAction({
        api: this.$api,
        verify_token: this.$route.params.verify_token,
      });

      this.isLoading = false;
      this.isVerified = result;
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

.section__title {
  display: flex;
  align-items: center;
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

.title__icon {
  margin-right: 15px;
  color: #ffa1bd;
}

.section__subtitle {
  margin-top: 40px;
  font-weight: 600;
  font-size: 1.3rem;
  text-align: center;
}

.loading_spinner {
  position: relative;
  min-width: 160px;
  min-height: 55px;
}

.loading_spinner:after {
  content: " ";
  display: block;
  width: 25px;
  height: 25px;
  margin: 7px auto 0 auto;
  border-radius: 50%;
  border: 6px solid ;
  border-color: #ffa1bd transparent #ffa1bd transparent;
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

.here__login__link{
  font-size: 1.3rem;
  color: #ffa1bd;
}
</style>
