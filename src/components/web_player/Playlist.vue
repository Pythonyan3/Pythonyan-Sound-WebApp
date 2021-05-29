<template>
  <section class="playlist">
    <div class="container">
      <div class="playlist__inner">
        <template v-if="getError.fromComponentName == $options.name">
          <ErrorsPlug
            v-if="getError.data.length && getError.status == 404"
            title="Oooops, playlist was not found."
            message="Search for something else?"
          />
          <ErrorsPlug
            v-else-if="
              (getError.data.length && getError.status) || getError.status == -1
            "
            title="Oooops, something went wrong while loading the playlist."
            message="Search for something else?"
          />
        </template>

        <div v-else>
          <div class="playlist-header">
            <div class="playlist-header__photo">
              <div v-if="isLoading" class="loading_spinner"></div>

              <img
                v-if="!isLoading && getPlaylist"
                :src="getPlaylist.cover || ''"
                class="playlist-header__photo-image"
                alt=""
                onload="this.style.display='inline'"
                onerror="this.style.display='none'"
              />
              <i
                class="fas fa-compact-disc fa-5x playlist-header__photo-image playlist-header__photo-plug"
              />
            </div>

            <div class="playlist-header__info">
              <div v-if="getPlaylist" class="playlist-header__info__name">
                {{ getPlaylist.title }}
              </div>

              <div class="playlist-header__info__status">Playlist</div>
            </div>
          </div>

          <div v-if="!isLoading && getPlaylist" class="playlist-controls">
            <div
              v-if="getPlaylist.songs.length"
              @click="playPlaylist"
              class="playlist-controls__play"
              title="Play playlist"
            >
              <i
                class="fas"
                :class="
                  getIsPlaying && getPlaylist.id == getPlayerPlaylistId
                    ? 'fa-pause'
                    : 'fa-play'
                "
              ></i>
            </div>
            <template v-if="getProfile.id != getPlaylist.owner.id">
              <i
                v-if="getPlaylist.is_liked"
                @click="unlikePlaylist($event.currentTarget)"
                class="fas fa-heart playlist-controls__unfollow"
                title="Unlike playlist"
              />
              <i
                v-else
                class="far fa-heart playlist-controls__follow"
                @click="likePlaylist($event.currentTarget)"
                title="Like playlist"
              />
            </template>

            <i
              v-if="getPlaylist.owner.id == getProfile.id"
              title="Remove playlist"
              class="far fa-trash-alt playlist-controls__remove"
            ></i>
          </div>

          <!--Songs-->
          <SongsList
            v-if="!isLoading && getPlaylist"
            :songs="getPlaylist.songs"
            :playlistId="getPlaylist.id"
            :showDeleteSongFromPlaylistIcon="
              getPlaylist.owner.id == getProfile.id ? true : false
            "
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ErrorsPlug from "./ErrorsPlug.vue";
import SongsList from "./SongsList.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "Playlist",

  components: {
    ErrorsPlug,
    SongsList,
  },

  data() {
    return {
      isLoading: false,
      isFollowing: false,
    };
  },

  computed: {
    ...mapGetters({
      getError: "getError",

      getIsPlaying: "player/getIsPlaying",
      getPlayerPlaylistId: "player/getPlaylistId",

      getPlaylist: "playlists/getPlaylist",

      getProfile: "profile/getProfile",
    }),
  },

  mounted() {
    this.getPlaylistInfo();
  },

  unmounted() {
    this.clearError();
  },

  watch: {
    "$route.params": function () {
      if (this.$route.params.id) {
        this.getPlaylistInfo();
      }
    },
  },

  methods: {
    ...mapActions({
      likePlaylistAction: "playlists/likePlaylistAction",
      unlikePlaylistAction: "playlists/unlikePlaylistAction",
      getPlaylistInfoAction: "playlists/getPlaylistInfoAction",
    }),

    ...mapMutations({
      setError: "SET_ERROR",
      clearError: "CLEAR_ERROR",
      setNotificationMessage: "SET_NOTIFICATION_MESSAGE",
    }),

    async getPlaylistInfo() {
      this.isLoading = true;

      await this.getPlaylistInfoAction({
        api: this.$api,
        playlistId: this.$route.params.id,
        accessToken: this.getProfile.accessToken,
        componentName: this.$options.name,
      });

      this.isLoading = false;
    },

    async likePlaylist(element) {
      if (!element.classList.contains("disabled")) {
        element.classList.add("disabled");

        await this.likePlaylistAction({
          api: this.$api,
          accessToken: this.getProfile.accessToken,
          componentName: this.$options.name,
          playlistId: this.getPlaylist.id,
        });

        element.classList.remove("disabled");
      }
    },

    async unlikePlaylist(element) {
      if (!element.classList.contains("disabled")) {
        element.classList.add("disabled");

        await this.unlikePlaylistAction({
          api: this.$api,
          accessToken: this.getProfile.accessToken,
          componentName: this.$options.name,
          playlistId: this.getPlaylist.id,
        });

        element.classList.remove("disabled");
      }
    },

    playPlaylist() {
      if (this.getPlaylist.id == this.getPlayerPlaylistId) {
        if (this.getIsPlaying) {
          this.$store.commit("player/PAUSE");
        } else {
          this.$store.commit("player/PLAY");
        }
      } else {
        this.$store.commit("player/SET_PLAYLIST", {
          playlistId: this.getPlaylist.id,
          songs: this.getPlaylist.songs,
        });

        this.$store.commit("player/PLAY");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.playlist-header {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}

.loading_spinner {
  position: absolute;
  left: -1;
  top: -1;
  width: calc(100% - 3px);
  height: calc(100% - 3px);
  z-index: 3;
}

.loading_spinner:after {
  content: " ";
  display: block;
  height: calc(100% - 3px);
  border-radius: 50%;
  border: 3px solid;
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

.playlist-header__photo {
  position: relative;
  width: 232px;
  height: 232px;
  box-shadow: 0 4px 60px rgb(0 0 0 / 50%);
}

.playlist-header__photo-image {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
}

.playlist-header__photo-plug {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.playlist-header__info {
  margin-left: 25px;
}

.playlist-header__info__name {
  margin-bottom: 25px;
  font-size: 4.5rem;
  font-weight: 600;
}

.playlist-header__info__status {
  font-size: 1.5rem;
}

.playlist-controls {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
}

.playlist-controls__play {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  margin-right: 32px;
  border-radius: 50%;
  background-color: #ffcbdb;
  cursor: pointer;
  transition: 0.1s;
}

.playlist-controls__play:hover {
  background-color: #ffa1bd;
}

.playlist-controls__follow,
.playlist-controls__unfollow,
.playlist-controls__remove {
  margin-right: 32px;
  font-size: 2rem;
  cursor: pointer;
  transition: 0.1s;
}

.disabled {
  color: grey;
  border: 1px solid grey;
}

.playlist-controls__unfollow {
  color: #ffa1bd;
}

.playlist-controls__follow:hover,
.playlist-controls__remove:hover {
  color: #ffa1bd;
}
</style>
