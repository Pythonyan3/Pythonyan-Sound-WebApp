<template>
  <section class="profile">
    <div class="container">
      <div class="profile__inner">
        <ErrorsPlug
          v-if="getError.data.length && getError.status == 404"
          title="Oooops, profile was not found."
          message="Search for something else?"
        />
        <ErrorsPlug
          v-else-if="
            (getError.data.length && getError.status) || getError.status == -1
          "
          title="Oooops, something went wrong while loading the profile."
          message="Search for something else?"
        />
        <div v-else>
          <div class="profile-header">
            <div class="profile-header__photo">
              <div v-if="isLoading" class="loading_spinner"></div>

              <img
                :src="profile.photo || ''"
                class="profile-header__photo-image"
                alt=""
                onload="this.style.display='inline'"
                onerror="this.style.display='none'"
              />
              <i
                class="far fa-user fa-5x profile-header__photo-image profile-header__photo-plug"
              />
            </div>

            <div class="profile-header__info">
              <div v-if="profile.username" class="profile-header__info__name">
                {{ profile.username }}
              </div>
              <div
                v-if="profile.is_artist"
                class="profile-header__info__status"
              >
                Artist
              </div>
              <div v-else class="profile-header__info__status">Profile</div>
            </div>
          </div>

          <div v-if="profile.username" class="profile-controls">
            <div v-if="profile.songs.length" class="profile-controls__play">
              <i class="fas fa-play"></i>
            </div>
            <template v-if="getProfile.id != profile.id">
              <div
                v-if="profile.is_followed"
                @click="unfollowProfile($event.currentTarget)"
                class="profile-controls__unfollow"
              >
                unfollow
              </div>
              <div
                v-else
                class="profile-controls__follow"
                @click="followProfile($event.currentTarget)"
              >
                follow
              </div>
            </template>
          </div>

          <!--Songs-->
          <div v-if="profile.songs.length" class="compilation">
            <h2 class="compilation__title__text">Songs</h2>

            <section class="compilation__list">
              <div
                v-for="(song, index) in profile.songs"
                :key="`song-${index}`"
                class="compilation__list-item"
              >
                <div class="compilation__list-item__block">
                  {{ index + 1 }}
                </div>
                <div class="compilation__list-item__block">
                  <div class="compilation__list-item__image">
                    <img
                      class="compilation__item__image-photo"
                      :src="song.cover || ''"
                      alt=""
                      onload="this.style.display='inline'"
                      onerror="this.style.display='none'"
                    />
                    <i
                      class="fas fa-compact-disc compilation__item__image-plug"
                    ></i>
                  </div>

                  <div class="compilation__list-item__info">
                    <span class="compilation__list-item__title">
                      {{ song.title }}
                    </span>
                  </div>
                </div>

                <div class="compilation__list-item__block">
                </div>

                <div
                  class="compilation__list-item__block compilation__list-item__menu"
                >
                  <i v-if="song.is_liked" class="fas fa-heart compilation__list-item__menu-item liked"></i>
                  <i v-else class="far fa-heart compilation__list-item__menu-item"></i>
                  <i
                    class="fas fa-ellipsis-h compilation__list-item__menu-item"
                  ></i>
                </div>
              </div>
            </section>
          </div>

          <!-- Playlists -->
          <div v-if="profile.playlists.length" class="compilation">
            <h2 class="compilation__title__text">Playlists</h2>

            <div class="compilation__card-container">
              <div
                v-for="playlist in profile.playlists"
                :key="playlist"
                class="compilation__card-item"
              >
                <div class="compilation__card-item__image">
                  <img
                    class="compilation__item__image-photo"
                    :src="playlist.cover || ''"
                    alt=""
                    onload="this.style.display='inline'"
                    onerror="this.style.display='none'"
                  />
                  <i
                    class="fas fa-music fa-5x compilation__item__image-plug"
                  ></i>
                </div>

                <div class="compilation__card-item__title">
                  {{ playlist.title }}
                </div>
                <div class="compilation__card-item__autors"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ErrorsPlug from "./ErrorsPlug.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Profile",

  components: {
    ErrorsPlug,
  },

  data() {
    return {
      profile: {
        id: null,
        username: "",
        photo: "",
        biography: "",
        playlists: [],
        songs: [],
        is_artist: false,
        is_verified: false,
        is_followed: false,
      },
      isLoading: false,
      isFollowing: false,
    };
  },

  computed: {
    ...mapGetters({
      getError: "getError",
      getProfile: "profile/getProfile",
    }),
  },

  mounted() {
    this.getProfileInfo();
  },

  unmounted() {
    this.$store.commit("CLEAR_ERROR");
  },

  methods: {
    ...mapActions({
      getProfileInfoAction: "profile/getProfileInfoAction",
      followProfileAction: "profile/followProfileAction",
      unfollowProfileAction: "profile/unfollowProfileAction",
    }),
    async getProfileInfo() {
      this.isLoading = true;

      this.profile = (
        await this.getProfileInfoAction({
          api: this.$api,
          profileId: this.$route.params.id,
          accessToken: this.getProfile.accessToken,
        })
      ).data;

      this.isLoading = false;
    },

    async followProfile(element) {
      if (!element.classList.contains("disabled")) {
        element.classList.add("disabled");

        const result = await this.followProfileAction({
          api: this.$api,
          profileId: this.profile.id,
          accessToken: this.getProfile.accessToken,
        });

        if (result) {
          this.profile.is_followed = true;
          this.$store.commit(
            "SET_NOTIFICATION_MESSAGE",
            "Saved to Your Library"
          );
        } else {
          this.$store.commit(
            "SET_NOTIFICATION_MESSAGE",
            "Couldn't Save to Your Library"
          );
        }

        element.classList.remove("disabled");
      }
    },

    async unfollowProfile(element) {
      if (!element.classList.contains("disabled")) {
        element.classList.add("disabled");

        const result = await this.unfollowProfileAction({
          api: this.$api,
          profileId: this.profile.id,
          accessToken: this.getProfile.accessToken,
        });

        if (result) {
          this.profile.is_followed = false;
          this.$store.commit(
            "SET_NOTIFICATION_MESSAGE",
            "Removed from Your Library"
          );
        } else {
          this.$store.commit(
            "SET_NOTIFICATION_MESSAGE",
            "Couldn't Remove from Your Library"
          );
        }

        element.classList.remove("disabled");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile-header {
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

.profile-header__photo {
  position: relative;
  width: 232px;
  height: 232px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 60px rgb(0 0 0 / 50%);
}

.profile-header__photo-image {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
}

.profile-header__photo-plug {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.profile-header__info {
  margin-left: 25px;
}

.profile-header__info__name {
  margin-bottom: 25px;
  font-size: 4.5rem;
  font-weight: 600;
}

.profile-header__info__status {
  font-size: 1.5rem;
}

.profile-controls {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
}

.profile-controls__play {
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

.profile-controls__play:hover {
  background-color: #ffa1bd;
}

.profile-controls__follow,
.profile-controls__unfollow {
  padding: 7px 15px;
  border: 1px solid white;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.1s;
}

.disabled {
  color: grey;
  border: 1px solid grey;
}

.profile-controls__unfollow {
  border: 1px solid #ffa1bd;
}

.profile-controls__follow:hover {
  border: 1px solid #ffa1bd;
}
</style>
