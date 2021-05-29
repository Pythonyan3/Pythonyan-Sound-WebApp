<template>
  <div
    class="grid__wrapper"
    @mousemove="playerControlsMouseMove"
    @mouseup="playerControlsMouseUp"
  >
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
          <template v-for="playlist in getProfilePlaylists" :key="playlist">
            <router-link
              :to="{ name: 'WebPlayerPlaylist', params: { id: playlist.id } }"
            >
              <div class="nav-bar__block-item">
                <span class="nav-bar__block-item__text">{{
                  playlist.title
                }}</span>
              </div>
            </router-link>
          </template>
        </template>
      </div>
    </div>

    <div class="main__view">
      <header class="main__view__header">
        <div class="container">
          <div class="main__view__header__inner">
            <div
              v-if="getProfile"
              class="user-bar"
              @click="openCloseDropdownMenu()"
            >
              <div class="user-bar__icon">
                <i class="far fa-user"></i>
              </div>
              <div class="user-bar__name">
                {{ getProfile.username }}
              </div>
              <div class="fas fa-caret-down caret__down__icon"></div>

              <div ref="dropdown_menu" class="dropdown-menu__container">
                <ul class="dropdown-menu">
                  <router-link
                    :to="{ name: 'Main' }"
                    class="dropdown-menu__item-link"
                  >
                    <li class="dropdown-menu__item">Account</li>
                  </router-link>

                  <router-link
                    :to="{
                      name: 'WebPlayerProfile',
                      params: { id: getProfile.id },
                    }"
                    class="dropdown-menu__item-link"
                  >
                    <li class="dropdown-menu__item">Profile</li>
                  </router-link>

                  <li class="dropdown-menu__item" @click="performLogout">
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      <router-view />
    </div>

    <div class="player__bar">
      <div class="play__song__info">
        <div class="current-song-cover">
          <img
            v-if="getCurrentSong"
            class="current-song-cover__photo"
            :src="getCurrentSong.cover || ''"
            alt=""
            onload="this.style.display='inline'"
            onerror="this.style.display='none'"
          />
          <i class="fas fa-compact-disc current-song-cover__plug"></i>
        </div>

        <template v-if="getCurrentSong">
          <div class="song__info">
            <div class="song__title">
              {{ getCurrentSong.title }}
            </div>
            <div>
              <router-link
                :to="{
                  name: 'WebPlayerProfile',
                  params: { id: getCurrentSong.artist.id },
                }"
                class="song__autor"
              >
                {{ getCurrentSong.artist.username }}
              </router-link>
            </div>
          </div>

          <template v-if="getProfile.id != getCurrentSong.artist.id">
            <i
              v-if="getCurrentSong.is_liked"
              class="player__button fas fa-heart liked"
              @click="unlikeSong($event.currentTarget, getCurrentSong.id)"
            ></i>
            <i
              v-else
              class="player__button far fa-heart"
              @click="likeSong($event.currentTarget, getCurrentSong.id)"
            ></i>
          </template>
        </template>
      </div>

      <div class="player__controls">
        <div class="player__controls__buttons">
          <div
            class="player__button shuffle fas fa-random fa-sm"
            :class="getPlayerIsShuffled ? 'active-button' : ''"
            @click="shufflePlaylist"
          ></div>
          <div
            @click="prevSong"
            class="player__button previous fas fa-step-backward fa-sm"
          ></div>
          <div
            class="player__button play fas fa-xs"
            :class="getPlayerIsPlaying ? 'fa-pause' : 'fa-play'"
            @click="getPlayerIsPlaying ? playerPause() : playerPlay()"
          ></div>
          <div
            @click="nextSong"
            class="player__button next fas fa-step-forward fa-sm"
          ></div>
          <div
            @click="setRepeat"
            :class="getPlayerRepeat == 0 ? 'no-repeat' : getPlayerRepeat == 1 ? 'repeat-playlist' : 'repeat-song'"
          >
          <i class="player__button fas fa-redo-alt fa-sm"></i>
          </div>
        </div>

        <div class="player__controls__progress">
          <div class="controls__progress__time">
            {{
              Math.floor(getPlayerTime / 60) +
              ":" +
              parseInt(getPlayerTime % 60).toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })
            }}
          </div>
          <div
            class="controls__progress__bar"
            ref="timeProgressBar"
            @mousedown="controlsMouseDown($event, true)"
          >
            <div
              class="progress__bar"
              :style="
                'width: ' + (getPlayerTime / getPlayerDuration) * 100 + '%;'
              "
            >
              <div class="progress__bar__slider"></div>
            </div>
          </div>
          <div class="controls__progress__time">
            {{
              Math.floor(getPlayerDuration / 60) +
              ":" +
              parseInt(getPlayerDuration % 60).toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })
            }}
          </div>
        </div>
      </div>

      <div class="player__extra__controls">
        <div
          class="player__button extra__controls__button fas fa-sm"
          :class="getPlayerIsMuted ? 'fa-volume-mute' : 'fa-volume-up'"
          @click="getPlayerIsMuted ? unmuteVolume() : muteVolume()"
        ></div>
        <div class="extra__controls__volume">
          <div
            @mousedown="controlsMouseDown($event, false)"
            ref="volumeProgressBar"
            class="controls__progress__bar"
          >
            <div
              class="progress__bar"
              :style="
                getPlayerIsMuted
                  ? 'width: 0%;'
                  : 'width: ' + getPlayerVolume * 100 + '%;'
              "
            >
              <div class="progress__bar__slider"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "WebPlayer",

  data() {
    return {
      timerId: null,
      isLoading: false,
      isTimeMousedown: false,
      isVolumeMousedown: false,
      oldPlayerPlayingState: false,
      playlistTitle: "",
    };
  },

  mounted() {
    if (!this.getProfile) {
      this.$router.replace({ name: "Main" });
    } else {
      this.playerSetAudioEvents({
        onendedHandler: () => {
          if (this.getPlayerRepeat == 2) {
            // repeat one song
            this.playerPlay();
          } else if (this.getPlayerRepeat == 1 && this.getIsCurrentSongLast) {
            // repeat playlist
            this.playerNext();
            this.playerPlay();
          } else if (this.getIsCurrentSongLast) {
            // don't repeat playlist, set next song (first) and pause
            this.playerNext();
          } else {
            this.playerNext();
            this.playerPlay();
          }
        },
      });

      this.loadPlayerData();

      this.getProfilePlaylistsAction({
        api: this.$api,
        componentName: this.$options.name,
        accessToken: this.getProfile.accessToken,
      });
    }
  },

  unmounted() {
    this.clearError();
    this.playerPause();
    this.savePlayerData();
  },

  watch: {
    getNotificationMessage: function () {
      if (this.getNotificationMessage) {
        if (this.timerId) {
          clearTimeout(this.timerId);
          this.timerId = null;
        }
        this.$refs.notification.innerHTML = this.getNotificationMessage;
        this.$refs.notification.style.zIndex = 10;
        this.$refs.notification.style.opacity = 1;

        this.timerId = setTimeout(() => {
          this.$refs.notification.style.zIndex = -1;
          this.$refs.notification.style.opacity = 0;
          this.clearNotificationMessage();
        }, 3000);
      }
    },

    getProfile: function () {
      if (!this.getProfile) {
        this.clearPlayerData();
        this.$router.replace({ name: "Main" });
      }
    },
  },

  computed: {
    ...mapGetters({
      getPlayerIsPlaying: "player/getIsPlaying",
      getCurrentSong: "player/getCurrentSong",
      getIsCurrentSongLast: "player/getIsCurrentSongLast",
      getPlayerIsMuted: "player/getIsMuted",
      getPlayerVolume: "player/getVolume",
      getPlayerRepeat: "player/getRepeat",
      getPlayerTime: "player/getTime",
      getPlayerDuration: "player/getDuration",
      getPlayerIsShuffled: "player/getIsShuffled",

      getProfile: "profile/getProfile",

      getProfilePlaylists: "playlists/getProfilePlaylists",

      getNotificationMessage: "getNotificationMessage",
    }),
  },

  methods: {
    ...mapActions({
      logoutAction: "profile/logoutAction",

      getProfilePlaylistsAction: "playlists/getProfilePlaylistsAction",
      createPlaylistAction: "playlists/createPlaylistAction",
    }),

    ...mapMutations({
      setError: "SET_ERROR",
      clearError: "CLEAR_ERROR",
      setNotificationMessage: "SET_NOTIFICATION_MESSAGE",
      clearNotificationMessage: "CLEAR_NOTIFICATION_MESSAGE",

      playerPlay: "player/PLAY",
      playerPause: "player/PAUSE",
      playerNext: "player/NEXT",
      playerPrev: "player/PREV",
      playerShufflePlaylist: "player/SHUFFLE_PLAYLIST",
      playerUnshufflePlaylist: "player/UNSHUFFLE_PLAYLIST",
      playerNoRepeat: "player/NO_REPEAT",
      playerRepeatPlaylist: "player/REPEAT_PLAYLIST",
      playerRepeatSong: "player/REPEAT_SONG",
      playerMute: "player/MUTE_VOLUME",
      playerUnmute: "player/UNMUTE_VOLUME",
      playerSetVolume: "player/SET_VOLUME",
      playerSetTime: "player/SET_TIME",
      playerSetAudioEvents: "player/SET_AUDIO_EVENTS",
      savePlayerData: "player/SAVE_PLAYER_DATA",
      loadPlayerData: "player/LOAD_PLAYER_DATA",
      clearPlayerData: "player/CLEAR_PLAYER_DATA",
    }),

    openCloseDropdownMenu() {
      if (this.$refs.dropdown_menu.style.display == "block") {
        this.$refs.dropdown_menu.style.display = "none";
      } else {
        this.$refs.dropdown_menu.style.display = "block";
      }
    },

    async performLogout() {
      await this.logoutAction({
        api: this.$api,
        componentName: this.$options.name,
        accessToken: this.getProfile.accessToken,
        refreshToken: this.getProfile.refreshToken,
      });
    },

    async createPlaylist() {
      if (!this.isLoading) {
        this.isLoading = true;

        const result = await this.createPlaylistAction({
          api: this.$api,
          accessToken: this.getProfile.accessToken,
          componentName: this.$options.name,
          title: this.playlistTitle,
        });

        this.isLoading = false;
        if (result) {
          this.playlistTitle = "";
          this.$refs.createPlaylist.style.display = "none";
        }
      }
    },

    nextSong() {
      if (this.getPlayerRepeat == 2) {
        this.playerRepeatPlaylist();
      }
      this.playerNext();
      this.playerPlay();
    },

    prevSong() {
      if (this.getPlayerRepeat == 2) {
        this.playerRepeatPlaylist();
      }
      this.playerPrev();
      this.playerPlay();
    },

    shufflePlaylist() {
      if (this.getPlayerIsShuffled) {
        this.playerUnshufflePlaylist();
      } else {
        this.playerShufflePlaylist();
      }
    },

    setRepeat() {
      if (this.getPlayerRepeat == 0) {
        this.playerRepeatPlaylist();
      } else if (this.getPlayerRepeat == 1) {
        this.playerRepeatSong();
      } else {
        this.playerNoRepeat();
      }
    },

    muteVolume() {
      this.playerMute();
    },

    unmuteVolume() {
      this.playerUnmute();
    },

    playerControlsMouseUp() {
      this.isVolumeMousedown = false;
      if (this.isTimeMousedown) {
        this.isTimeMousedown = false;
        if (this.oldPlayerPlayingState) {
          this.playerPlay();
        }
      }
    },

    controlsMouseDown(event, isTimeControl = false) {
      if (isTimeControl) {
        // set new audio time
        const relativeX = event.clientX - this.$refs.timeProgressBar.offsetLeft;
        this.oldPlayerPlayingState = this.getPlayerIsPlaying;
        this.isTimeMousedown = true;
        this.playerPause();
        this.playerSetTime(
          (relativeX / this.$refs.timeProgressBar.offsetWidth) *
            this.getPlayerDuration
        );
      } else {
        //set new volume value
        const relativeX =
          event.clientX - this.$refs.volumeProgressBar.offsetLeft;
        this.isVolumeMousedown = true;
        this.playerSetVolume(
          relativeX / this.$refs.volumeProgressBar.offsetWidth
        );
      }
    },

    playerControlsMouseMove(event) {
      if (this.isVolumeMousedown) {
        // audio volume seek
        const relativeX =
          event.clientX - this.$refs.volumeProgressBar.offsetLeft;
        if (
          relativeX >= 0 &&
          relativeX <= this.$refs.volumeProgressBar.offsetWidth
        ) {
          this.playerSetVolume(relativeX / 100);
        } else if (relativeX < 0) {
          this.playerSetVolume(0);
        } else {
          this.playerSetVolume(1);
        }
      } else if (this.isTimeMousedown) {
        // audio currentTime seek
        const relativeX = event.clientX - this.$refs.timeProgressBar.offsetLeft;
        if (
          relativeX >= 0 &&
          relativeX <= this.$refs.timeProgressBar.offsetWidth
        ) {
          this.playerSetTime(
            (relativeX / this.$refs.timeProgressBar.offsetWidth) *
              this.getPlayerDuration
          );
        } else if (relativeX < 0) {
          this.playerSetTime(0);
        } else {
          this.playerSetTime(this.getPlayerDuration);
        }
      }
    },

    async likeSong(element, songId) {
      if (!element.classList.contains("disabled")) {
        element.classList.add("disabled");

        try {
          await this.$api.songs.likeSong(songId, this.getProfile.accessToken);

          this.getCurrentSong.is_liked = true;
          this.setNotificationMessage("Saved to Your Library");
        } catch (error) {
          if (error.response) {
            this.setError(error);
          }

          this.setNotificationMessage("Couldn't Save to Your Library");
        }
        element.classList.remove("disabled");
      }
    },

    async unlikeSong(element, songId) {
      if (!element.classList.contains("disabled")) {
        element.classList.add("disabled");

        try {
          await this.$api.songs.unlikeSong(songId, this.getProfile.accessToken);

          this.getCurrentSong.is_liked = false;
          this.setNotificationMessage("Removed from Your Library");
        } catch (error) {
          if (error.response) {
            this.setError(error);
          }
          this.setNotificationMessage("Couldn't Remove from Your Library");
        }

        element.classList.remove("disabled");
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

::v-deep(img) {
  image-rendering: -webkit-optimize-contrast;
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
  bottom: 108px;
  left: 50%;
  padding: 15px 35px;
  border: 1px solid #ffa1bd;
  border-radius: 5px;
  background-color: #2d2d2d;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: 0.5s;
  transform: translateX(-50%);
  overflow: hidden;
  z-index: -1;
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
  font-size: 0.8rem;
  transition: color 0.3s;
}

.nav-bar__block-item__icon {
  font-size: 1.3rem;
  margin-right: 10px;
  transition: color 0.3s;
}

.nav-bar__block-item:hover span {
  color: #ffa1bd;
}

.nav-bar__block-title {
  font-size: 1.1rem;
  margin-top: 25px;
  padding: 0px 20px;
}

.router-link-exact-active > .nav-bar__block-item,
.router-link-exact-active > .nav-bar__block-item > span {
  border-radius: 5px;
  background-color: rgb(40, 40, 40);
  color: #ffa1bd;
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

.user-bar {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: black;
  border-radius: 32px;
  height: 32px;
  padding: 2px;
}

.user-bar:hover {
  background-color: #333333;
  cursor: pointer;
}

.user-bar__icon {
  width: 28px;
  height: 28px;
  padding: 4px 0 0 7px;
  background-color: #333333;
  border-radius: 15px;
}

.user-bar__name {
  margin: 0 15px;
  font-size: 0.8rem;
}

.caret__down__icon {
  margin-right: 8px;
}

.dropdown-menu__container {
  position: absolute;
  display: none;
  top: calc(100% + 10px);
  right: 0;
  background-color: #282828;
}

.dropdown-menu {
  display: flex;
  flex-direction: column;
  padding: 4px;
  list-style: none;
}

.dropdown-menu__item {
  padding: 12px 18px;
  font-size: 0.8rem;
}

.dropdown-menu__item:hover {
  background-color: hsla(0, 0%, 100%, 0.1);
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

.current-song-cover {
  position: relative;
  width: 56px;
  height: 56px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.current-song-cover__photo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0px;
  border-radius: 2px;
  z-index: 5;
}

.current-song-cover__plug {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #161616;
}

.song__info {
  margin: 0 14px;
}

.song__title {
  font-size: 1rem;
  line-height: 24px;
  text-overflow: ellipsis;
}

.song__autor {
  font-size: 0.8rem;
  line-height: 24px;
  color: #b3b3b3;
  text-overflow: ellipsis;
  cursor: pointer;
}

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
  padding: 8.5px 0 0 10.5px;
}

.player__button:hover {
  color: #ffa1bd;
  border-color: #ffa1bd;
  cursor: pointer;
}

.no-repeat,
.repeat-playlist,
.repeat-song {
  position: relative;
}

.repeat-playlist i, .repeat-song i{
  color: #ffa1bd;
}

.repeat-playlist::after,
.repeat-song::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  bottom: -5px;
  left: calc(50% - 2.5px);
  border-radius: 50%;
  background-color: #ffa1bd;
}

.repeat-song::before {
  content: "1";
  position: absolute;
  width: 9px;
  height: 9px;
  right: -6px;
  top: -3px;
  font-size: 0.6rem;
  color: #000;
  text-align: center;
  border-radius: 50%;
  background-color: #ffa1bd;
}

::v-deep(.disabled) {
  color: grey;
}

.liked,
.active-button {
  opacity: 1;
  color: #ffa1bd;
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
  width: 100%;
  height: 4px;
  border-radius: 6px;
  background-color: #535353;
}

.progress__bar {
  position: relative;
  height: 4px;
  border-radius: 2px;
  background-color: #ffa1bd;
}

.progress__bar__slider {
  display: none;
  position: absolute;
  right: -5px;
  top: -4.5px;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: white;
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
