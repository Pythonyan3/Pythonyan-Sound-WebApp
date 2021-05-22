<template>
  <section class="search__form">
    <i class="fas fa-search search__form__icon search__icon"></i>
    <form @submit.prevent="search">
      <input
        v-model="searchString"
        @input="search"
        class="search__field"
        type="text"
        placeholder="Artists, songs or playlists"
      />
    </form>
    <i
      v-if="searchString"
      @click="clearSearchString"
      class="fas fa-times search__form__icon clear__icon"
    ></i>
  </section>

  <section class="compilations_set">
    <div class="container">
      <section class="compilations_set__inner">
        <!--
          Search param exists, show response data or loading bar
        -->
        <template v-if="searchString">
          <!--Search request in progress-->
          <template v-if="isLoading">
            <div class="loading_spinner__title">Searching...</div>
            <div class="loading_spinner"></div>
          </template>

          <!--Some errors was occurred while search request-->
          <template v-else-if="getError.status && getError.data">
            <ErrorsPlug
              title="Some error was occurred while search"
              message="Please try to search again or back for it later."
            />
          </template>

          <template v-else>
            <!--Search returned empty result-->
            <template
              v-if="
                !getSearchArtistsResults.length &&
                !getSearchProfilesResults.length &&
                !getSearchPlaylistsResults.length &&
                !getSearchSongsResults.length
              "
            >
              <ErrorsPlug
                :title="'No results found for \'' + searchString + '\''"
                message="Please make sure your words are spelled correctly or use less or different keywords."
              />
            </template>

            <!--Search returned some data-->
            <template v-else>
              <!--Artists-->
              <div v-if="getSearchArtistsResults.length" class="compilation">
                <div class="compilation__title">
                  <h2 class="compilation__title__text">Artists</h2>
                  <a href="" class="compilation__title__link">see all</a>
                </div>

                <div class="compilation__card-container">
                  <router-link
                    v-for="artist in getSearchArtistsResults"
                    :key="artist"
                    :to="{
                      name: 'WebPlayerProfile',
                      params: { id: artist.id },
                    }"
                  >
                    <div class="compilation__card-item">
                      <div
                        class="compilation__card-item__image compilation__card-item__profile-photo"
                      >
                        <img
                          class="compilation__item__image-photo"
                          :src="artist.photo || ''"
                          alt=""
                          onerror="this.style.display='none'"
                        />
                        <i
                          class="far fa-user fa-5x compilation__item__image-plug"
                        ></i>
                      </div>

                      <div class="compilation__card-item__title">
                        {{ artist.username }}
                      </div>
                      <div class="compilation__card-item__autors">Artist</div>
                    </div>
                  </router-link>
                </div>
              </div>

              <!--Profiles-->
              <div v-if="getSearchProfilesResults.length" class="compilation">
                <div class="compilation__title">
                  <h2 class="compilation__title__text">Profiles</h2>
                  <a href="" class="compilation__title__link">see all</a>
                </div>
                <div class="compilation__card-container">
                  <router-link
                    v-for="profile in getSearchProfilesResults"
                    :key="profile"
                    :to="{
                      name: 'WebPlayerProfile',
                      params: { id: profile.id },
                    }"
                  >
                    <div class="compilation__card-item">
                      <div
                        class="compilation__card-item__image compilation__card-item__profile-photo"
                      >
                        <img
                          class="compilation__item__image-photo"
                          :src="profile.photo || ''"
                          alt=""
                          onerror="this.style.display='none'"
                        />
                        <i
                          class="far fa-user fa-5x compilation__item__image-plug"
                        ></i>
                      </div>

                      <div class="compilation__card-item__title">
                        {{ profile.username }}
                      </div>
                      <div class="compilation__card-item__autors">Profile</div>
                    </div>
                  </router-link>
                </div>
              </div>

              <!-- Playlists -->
              <div v-if="getSearchPlaylistsResults.length" class="compilation">
                <div class="compilation__title">
                  <h2 class="compilation__title__text">Playlists</h2>
                  <a href="" class="compilation__title__link">see all</a>
                </div>
                <div class="compilation__card-container">
                  <div
                    v-for="playlist in getSearchPlaylistsResults"
                    :key="playlist"
                    class="compilation__card-item"
                  >
                    <div class="compilation__card-item__image">
                      <img
                        class="compilation__item__image-photo"
                        :src="playlist.cover || ''"
                        alt=""
                        onerror="this.style.display='none'"
                      />
                      <i
                        class="fas fa-music fa-5x compilation__item__image-plug"
                      ></i>
                    </div>

                    <div class="compilation__card-item__title">
                      {{ playlist.title }}
                    </div>
                    <div class="compilation__card-item__autors">
                      By {{ playlist.owner.username }}
                    </div>
                  </div>
                </div>
              </div>

              <!--Songs-->
              <div v-if="getSearchSongsResults.length" class="compilation">
                <div class="compilation__title">
                  <h2 class="compilation__title__text">Songs</h2>
                  <a href="" class="compilation__title__link">see all</a>
                </div>
                <section class="compilation__list">
                  <div
                    v-for="(song, index) in getSearchSongsResults"
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
                        <span class="compilation__list-item__autor">
                          {{ song.artist.username }}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </template>
          </template>
        </template>

        <!--
          No search param to perform request
          Need to show some information
        -->
        <template v-else> </template>
      </section>
    </div>
  </section>
</template>

<script>
import ErrorsPlug from "./ErrorsPlug.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Search",

  components: {
    ErrorsPlug,
  },

  data() {
    return {
      isLoading: false,
    };
  },

  mounted() {
    this.$store.commit("CLEAR_ERROR");
  },

  computed: {
    ...mapGetters({
      getError: "getError",

      getProfile: "profile/getProfile",

      getSearchString: "search/getSearchString",
      getSearchArtistsResults: "search/getSearchArtistsResults",
      getSearchProfilesResults: "search/getSearchProfilesResults",
      getSearchPlaylistsResults: "search/getSearchPlaylistsResults",
      getSearchSongsResults: "search/getSearchSongsResults",
    }),

    searchString: {
      get() {
        return this.getSearchString;
      },
      set(value) {
        this.$store.commit("search/SET_SEARCH_STRING", value);
      },
    },
  },

  methods: {
    ...mapActions({
      searchAction: "search/searchAction",
    }),

    clearSearchString() {
      this.$store.commit("search/CLEAR_SEARCH_STRING");
    },

    async search() {
      if (this.searchString) {
        this.$store.commit("CLEAR_ERROR");
        this.isLoading = true;

        await this.searchAction({
          api: this.$api,
          searchString: this.searchString,
          accessToken: this.getProfile.accessToken
        });

        this.isLoading = false;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*Main View Content*/

.search__form {
  position: absolute;
  top: 20px;
  left: 30px;
  height: 40px;
  width: 364px;
}

.search__form__icon {
  position: absolute;
  color: black;
}

.search__icon {
  top: 13px;
  left: 15px;
}

.clear__icon {
  top: 13px;
  right: 15px;
  cursor: pointer;
}

.search__field {
  height: 40px;
  width: 100%;
  border: 0px;
  border-radius: 40px;
  padding: 6px 48px;
  color: black;
  text-overflow: ellipsis;
}

.search__field:focus {
  outline: none !important;
  border: 0px;
}

.loading_spinner__title {
  margin-top: 75px;
  text-align: center;
  font-size: 2rem;
}

.loading_spinner {
  position: relative;
}

.loading_spinner:after {
  content: " ";
  display: block;
  width: 50px;
  height: 50px;
  margin: 7px auto 0 auto;
  border-radius: 50%;
  border: 6px solid;
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
</style>
