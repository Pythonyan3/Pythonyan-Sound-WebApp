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

          <!--Some errors was occurred while search request-->
          <template v-else-if="wasErrorOccurred">
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
                  <div
                    v-for="artist in getSearchArtistsResults"
                    :key="artist"
                    class="compilation__card-item"
                  >
                    <div
                      class="compilation__card-item__image compilation__card-item__profile-photo"
                    >
                      <img
                        class="compilation__card-item__image-photo"
                        :src="artist.photo || ''"
                        alt=""
                        onerror="this.style.display='none'"
                      />
                      <i
                        class="far fa-user fa-5x compilation__card-item__image-plug"
                      ></i>
                    </div>

                    <div class="compilation__card-item__title">
                      {{ artist.username }}
                    </div>
                    <div class="compilation__card-item__autors">Artist</div>
                  </div>
                </div>
              </div>

              <!--Profiles-->
              <div v-if="getSearchProfilesResults.length" class="compilation">
                <div class="compilation__title">
                  <h2 class="compilation__title__text">Profiles</h2>
                  <a href="" class="compilation__title__link">see all</a>
                </div>
                <div class="compilation__card-container">
                  <div
                    v-for="profile in getSearchProfilesResults"
                    :key="profile"
                    class="compilation__card-item"
                  >
                    <div
                      class="compilation__card-item__image compilation__card-item__profile-photo"
                    >
                      <img
                        class="compilation__card-item__image-photo"
                        :src="profile.photo || ''"
                        alt=""
                        onerror="this.style.display='none'"
                      />
                      <i
                        class="far fa-user fa-5x compilation__card-item__image-plug"
                      ></i>
                    </div>

                    <div class="compilation__card-item__title">
                      {{ profile.username }}
                    </div>
                    <div class="compilation__card-item__autors">Profile</div>
                  </div>
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
                      <div class="compilation__list-item__cover">
                        <span class="fas fa-compact-disc fa-lg"></span>
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
      wasErrorOccurred: false,
      isLoading: false,
    };
  },

  computed: {
    ...mapGetters({
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
      search_action: "search/search_action",
    }),

    clearSearchString() {
      this.$store.commit("search/CLEAR_SEARCH_STRING");
    },

    async search() {
      if (this.searchString) {
        this.isLoading = true;

        this.wasErrorOccurred = !(await this.search_action({
          api: this.$api,
          error_parser: this.$response_error_parser,
          searchString: this.searchString,
        }));

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

.compilations_set {
  margin-top: 25px;
}

.compilations_set__inner {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
}

.compilation__title {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
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
  grid-auto-rows: 0;
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

.compilation__list {
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr;
}

.compilation__list-item {
  display: grid;
  grid-template-columns: 16px 4fr 2fr minmax(120px, 1fr);
  grid-gap: 12px;
  padding: 8px 16px;
  border-radius: 4px;
}

.compilation__list-item:hover {
  background-color: #2d2d2d;
}

.compilation__list-item__block {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.compilation__list-item__info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 14px;
}

.compilation__list-item__cover {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.compilation__list-item__title {
  font-size: 1rem;
  line-height: 24px;
}

.compilation__list-item__autor {
  font-size: 0.8rem;
  line-height: 24px;
  color: #b3b3b3;
}

.compilation__list-item__autor:hover {
  color: #ffa1bd;
  cursor: pointer;
  text-decoration: underline;
}
</style>
