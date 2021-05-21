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
            <div class="profile-controls__play">
              <i class="fas fa-play"></i>
            </div>
            <div v-if="profile.is_followed" class="profile-controls__unfollow">unfollow</div>
            <div v-else class="profile-controls__follow">follow</div>
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
                        class="compilation__card-item__image-photo"
                        :src="playlist.cover || ''"
                        alt=""
                        onerror="this.style.display='none'"
                      />
                      <i
                        class="fas fa-music fa-5x compilation__card-item__image-plug"
                      ></i>
                    </div>

                    <div class="compilation__card-item__title">
                      {{ playlist.title }}
                    </div>
                    <div class="compilation__card-item__autors">
                      
                    </div>
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
        is_artist: false,
        is_verified: false,
        is_followed: false
      },
      isLoading: false
    };
  },

  computed: {
    ...mapGetters({
      getError: "getError",
    }),
  },

  mounted() {
    this.get_profile();
  },

  unmounted() {
    this.$store.commit("CLEAR_ERROR");
  },

  methods: {
    ...mapActions({
      getProfileAction: "profile/getProfileAction",
    }),
    async get_profile() {
      this.isLoading = true;
      
      this.profile = (
        await this.getProfileAction({
          api: this.$api,
          profileId: this.$route.params.id,
        })
      ).data;

      console.log(this.profile);

      this.isLoading = false;
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
  margin-top: 25px;
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

.profile-controls__follow, .profile-controls__unfollow {
  padding: 7px 15px;
  border: 1px solid white;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.1s;
}

.profile-controls__unfollow {
  border: 1px solid #ffa1bd;
}

.profile-controls__follow:hover {
  border: 1px solid #ffa1bd;
}

.compilation {
  margin: 50px 0;
}

.compilation__title__text {  
  font-size: 1.5rem;
  font-weight: 600;
}

.compilation__title__link {
  text-transform: uppercase;
  font-weight: 500;
  font-size: 0.8rem;
}

.compilation__title__link:hover {
  text-decoration: underline;
}

.compilation__card-container {
  overflow-y: hidden;
  display: grid;
  grid-gap: 24px;
  grid-auto-rows: auto;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.compilation__card-item {
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  padding: 16px;
  background-color: #161616;
  border-radius: 8px;
  transition: background-color 0.3s;
  overflow: hidden;
}

.compilation__card-item:hover {
  cursor: pointer;
  background-color: #262626;
}

.compilation__card-item__image {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
}

.compilation__card-item__profile-photo {
  border-radius: 50%;
  overflow: hidden;
}

.compilation__card-item__image-photo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0px;
  border-radius: 2px;
  z-index: 5;
}

.compilation__card-item__image-plug {
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

.compilation__card-item__title {
  font-size: 1.1rem;
  margin-top: 15px;
}

.compilation__card-item__autors {
  margin-top: 15px;
  font-size: 0.8rem;
  color: #b3b3b3;
  text-overflow: ellipsis;
}
</style>
