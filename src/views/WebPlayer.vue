<template>
  <div class="grid__wrapper">
    <div ref="notification" class="notification"></div>

    <div
      ref="createPlaylist"
      class="create-playlist"
      @click.self="$refs.createPlaylist.style.display = 'none'"
    >
      <div class="create-playlist__form">
        <i
          class="fas fa-times create-playlist__form-close"
          @click.self="$refs.createPlaylist.style.display = 'none'"
        ></i>

        <form @submit.prevent="createPlaylist">
          <h2 class="create-playlist__form-title">Create Your New Playlist</h2>

          <div class="input__block">
            <label class="label__item">Enter a playlist title</label>
            <input
              v-model="playlistTitle"
              class="input__item"
              type="text"
              placeholder="Playlist title"
              minlength="4"
              required
            />
          </div>

          <div class="input__block submit__block">
            <div v-if="isLoading" class="loading_spinner"></div>
            <input v-else class="submit__create" type="submit" value="create" />
          </div>
        </form>
      </div>
    </div>

    <div class="nav-bar">
      <router-link :to="{ name: 'Main' }">
        <div class="nav-bar__logo">
          <img
            class="nav-bar__logo-icon"
            src="../assets/images/snake_logo.png"
            alt=""
          />
          <span class="nav-bar__logo__title">PythonyanSound</span>
        </div>
      </router-link>

      <div class="nav-bar__menu">
        <router-link :to="{ name: 'WebPlayer' }">
          <div class="nav-bar__block-item">
            <span class="fas fa-home fa-lg nav-bar__block-item__icon"></span>
            <span class="nav-bar__block-item__text">Home</span>
          </div>
        </router-link>

        <router-link :to="{ name: 'WebPlayerSearch' }">
          <div class="nav-bar__block-item">
            <span class="fas fa-search nav-bar__block-item__icon"></span>
            <span class="nav-bar__block-item__text">Search</span>
          </div>
        </router-link>

        <a href="">
          <div class="nav-bar__block-item">
            <span class="fas fa-compact-disc nav-bar__block-item__icon"></span>
            <span class="nav-bar__block-item__text">Your Library</span>
          </div>
        </a>
      </div>

      <div class="nav-bar__block">
        <div class="nav-bar__block-title">Playlists</div>

        <div
          class="nav-bar__block-item"
          @click="$refs.createPlaylist.style.display = 'flex'"
        >
          <span
            class="fas fa-compact-disc fa-plus-square fa-lg nav-bar__block-item__icon"
          ></span>
          <span class="nav-bar__block-item__text">Create Playlist</span>
        </div>

        <div>
          <div class="nav-bar__block-item">
            <span class="fas fa-heart nav-bar__block-item__icon"></span>
            <span class="nav-bar__block-item__text">Liked Songs</span>
          </div>
        </div>
      </div>

      <div class="nav-bar__block">
        <hr class="nav-bar__block-divider" />

        <template v-if="getProfilePlaylists.length">
          <a v-for="playlist in getProfilePlaylists" :key="playlist" href="">
            <div class="nav-bar__block-item">
              <span class="nav-bar__block-item__text">{{
                playlist.title
              }}</span>
            </div>
          </a>
        </template>
      </div>
    </div>

    <div class="main__view">
      <header class="main__view__header">
        <div class="container">
          <div class="main__view__header__inner">
            <div class="user__bar">
              <div class="user__bar__icon">
                <i class="far fa-user"></i>
              </div>
              <div v-if="getProfile" class="user__bar__name">
                {{ getProfile.username }}
              </div>
              <div class="fas fa-caret-down caret__down__icon"></div>
            </div>
          </div>
        </div>
      </header>

      <router-view />
    </div>

    <div class="player__bar">
      <div class="play__song__info">
        <div class="song__cover">
          <div class="fas fa-compact-disc fa-lg"></div>
        </div>

        <div class="song__info">
          <a class="song__title" href=""> Проблемы </a>
          <div>
            <a class="song__autor" href=""> Andromeda </a>
          </div>
        </div>

        <div class="player__button far fa-heart"></div>
      </div>

      <div class="player__controls">
        <div class="player__controls__buttons">
          <div class="player__button shuffle fas fa-random fa-sm"></div>
          <div class="player__button previous fas fa-step-backward fa-sm"></div>
          <div class="player__button play fas fa-play fa-xs"></div>
          <div class="player__button next fas fa-step-forward fa-sm"></div>
          <div class="player__button repeat fas fa-redo-alt fa-sm"></div>
        </div>

        <div class="player__controls__progress">
          <div class="controls__progress__time">0:00</div>
          <div class="controls__progress__bar">
            <div class="progress__bar__slider"></div>
            <div class="progress__bar"></div>
          </div>
          <div class="controls__progress__time">0:00</div>
        </div>
      </div>

      <div class="player__extra__controls">
        <div
          class="player__button extra__controls__button fas fa-volume-up fa-sm"
        ></div>
        <div class="extra__controls__volume">
          <div class="controls__progress__bar">
            <div class="progress__bar__slider"></div>
            <div class="progress__bar"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "WebPlayer",

  data() {
    return {
      timerId: null,
      isLoading: false,
      playlistTitle: ""
    };
  },

  computed: {
    ...mapGetters({
      getProfile: "profile/getProfile",

      getProfilePlaylists: "playlists/getProfilePlaylists",

      getNotificationMessage: "getNotificationMessage",
    }),
  },

  mounted() {
    if (!this.getProfile) {
      this.$router.replace({ name: "Main" });
    } else {
      this.getProfilePlaylistsAction({
        api: this.$api,
        componentName: this.$options.name,
        accessToken: this.getProfile.accessToken,
      });
    }
  },

  unmounted() {
    this.$store.commit("CLEAR_ERROR");
  },

  watch: {
    getNotificationMessage: function () {
      if (this.getNotificationMessage) {
        if (this.timerId) {
          clearTimeout(this.timerId);
          this.timerId = null;
        }
        this.$refs.notification.innerHTML = this.getNotificationMessage;
        this.$refs.notification.style.opacity = 1;
        this.timerId = setTimeout(() => {
          this.$refs.notification.style.opacity = 0;
          this.$store.commit("CLEAR_NOTIFICATION_MESSAGE");
        }, 5000);
      }
    },
  },

  methods: {
    ...mapActions({
      getProfilePlaylistsAction: "playlists/getProfilePlaylistsAction",
      createPlaylistAction: "playlists/createPlaylistAction",
    }),

    async createPlaylist() {
      if (!this.isLoading) {
        this.isLoading = true;

        const result = await this.createPlaylistAction({
          api: this.$api,
          accessToken: this.getProfile.accessToken,
          componentName: this.$options.name,
          title: this.playlistTitle
        });

        this.isLoading = false;
        if (result) {
          this.playlistTitle = "";
          this.$refs.createPlaylist.style.display = 'none'
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
::v-deep(*) {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 15px;
  font-family: "Montserrat";
  font-weight: 500;
  color: white;
}

html,
body {
  height: 100%;
}

a {
  text-decoration: none;
}

.grid__wrapper {
  position: relative;
  display: grid;
  height: 100vh;
  width: 100%;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    "nav-bar       main__view"
    "player__bar player__bar";
}

.notification {
  position: absolute;
  max-width: 500px;
  max-height: calc(100% - 108px);
  bottom: 108px;
  left: 50%;
  padding: 15px 35px;
  border: 1px solid #ffa1bd;
  border-radius: 5px;
  background-color: #2d2d2d;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-overflow: ellipsis;
  opacity: 0;
  transition: 0.5s;
  transform: translateX(-50%);
  z-index: 10;
}

.create-playlist {
  position: absolute;
  display: none;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 7;
}

.create-playlist__form {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 100px;
  border: 1px solid #ffcbdb;
  border-radius: 5px;
  background-color: #2d2d2d;
}

.create-playlist__form-title {
  font-size: 1.5rem;
  margin: 35px 0;
}

.input__block {
  display: flex;
  flex-direction: column;
  margin: 25px 0;
}

.label__item {
  margin-bottom: 10px;
}

.input__item {
  height: 40px;
  padding: 6px 12px;
  border: 1px solid #d9dadc;
  color: #000;
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

.submit__create {
  min-width: 160px;
  padding: 10px 14px 10px;
  border: 1px solid #ffcbdb;
  border-radius: 100px;
  color: #000;
  background-color: #ffcbdb;
  text-transform: uppercase;
  transition: 0.3s;
}

.submit__create:hover {
  background-color: #ffa1bd;
  cursor: pointer;
}

.create-playlist__form-close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.2rem;
  color: #ffcbdb;
  cursor: pointer;
}

.create-playlist__form-close:hover {
  color: #ffa1bd;
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

/*Navigation Bar*/
.nav-bar {
  grid-area: nav-bar;
  display: flex;
  box-sizing: border-box;
  padding: 0 8px;
  flex-direction: column;
  background-color: black;
  overflow-y: scroll;
}

.nav-bar::-webkit-scrollbar {
  width: 0.5em;
}

.nav-bar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.nav-bar::-webkit-scrollbar-thumb {
  background-color: #666;
}

.nav-bar__logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-bar__logo:hover .nav-bar__logo__title {
  color: #ffa1bd;
}

.nav-bar__logo-icon {
  max-width: 100px;
}

.nav-bar__logo__title {
  font-size: 1rem;
  font-weight: 600;
  transition: color 0.3s;
}

.nav-bar__menu {
  margin-top: 20px;
}

.nav-bar__block-divider {
  border: 0px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 10px 0;
}

.nav-bar__block-item {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
}

.nav-bar__block-item__text {
  transition: color 0.3s;
  font-size: 0.8rem;
}

.nav-bar__block-item__icon {
  font-size: 1.3rem;
  margin-right: 10px;
}

.nav-bar__block-item:hover span {
  color: #ffa1bd;
}

.nav-bar__block-title {
  font-size: 1.1rem;
  margin-top: 25px;
  padding: 0px 20px;
}

.selected__item {
  border-radius: 5px;
  background-color: rgb(40, 40, 40);
}

/*Main View (Content)*/
.main__view {
  position: relative;
  grid-area: main__view;
  background-color: rgb(18, 18, 18);
  overflow-y: scroll;
}

.main__view::-webkit-scrollbar {
  width: 0.5em;
}

.main__view::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.main__view::-webkit-scrollbar-thumb {
  background-color: #666;
}

::v-deep(.container) {
  width: 100%;
  padding: 0 30px 25px 30px;
}

/*Main View Header*/
.main__view__header {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: rgb(18, 18, 18);
  z-index: 3;
}

.main__view__header__inner {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  height: 60px;
  width: 100%;
}

.user__bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: black;
  border-radius: 32px;
  height: 32px;
  padding: 2px;
}

.user__bar:hover {
  background-color: #333333;
  cursor: pointer;
}

.user__bar__icon {
  width: 28px;
  height: 28px;
  padding: 4px 0 0 7px;
  background-color: #333333;
  border-radius: 15px;
}

.user__bar__name {
  margin: 0 15px;
  font-size: 0.8rem;
}

.caret__down__icon {
  margin-right: 8px;
}

/* Main View Content */

::v-deep(.compilations_set__inner) {
  display: grid;
  grid-template-columns: 1fr;
}

/*Player Bar*/
.player__bar {
  grid-area: player__bar;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
  height: 90px;
  width: 100%;
  background-color: rgb(40, 40, 40);
}

.play__song__info {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 30%;
}

.song__cover {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.song__info {
  margin: 0 14px;
}

.song__title {
  font-size: 1rem;
  line-height: 24px;
}

.song__autor {
  font-size: 0.8rem;
  line-height: 24px;
  color: #b3b3b3;
}

.song__title:hover,
.song__autor:hover {
  color: #ffa1bd;
  text-decoration: underline;
}

.player__controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
}

.player__controls__buttons {
  display: flex;
  width: 224px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
}

.play {
  width: 32px;
  height: 32px;
  border: 1px solid white;
  border-radius: 50%;
  padding: 8.5px 0 0 11.5px;
}

.player__button:hover {
  color: #ffa1bd;
  border-color: #ffa1bd;
  cursor: pointer;
}

.player__controls__progress {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 8px;
  width: 100%;
}

.controls__progress__time {
  min-width: 40px;
  font-size: 0.7rem;
  text-align: center;
}

.controls__progress__bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 100%;
  height: 10px;
}

.progress__bar__slider {
  display: none;
  position: absolute;
  left: -5px;
  top: -1px;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: white;
}

.progress__bar {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: #535353;
}

.controls__progress__bar:hover .progress__bar__slider {
  display: block;
}

.player__extra__controls {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 30%;
}

.extra__controls__button {
  margin-right: 10px;
}

.extra__controls__volume {
  width: 100px;
}
</style>
