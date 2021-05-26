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
          <template
            v-else-if="
              getError.fromComponentName == $options.name &&
              getError.status &&
              getError.data
            "
          >
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
              <ProfilesCards
                v-if="getSearchArtistsResults.length"
                :isPreview="true"
                :profiles="sliceSearchResults(getSearchArtistsResults)"
                title="Artists"
              />

              <!--Profiles-->
              <ProfilesCards
                v-if="getSearchProfilesResults.length"
                :profiles="sliceSearchResults(getSearchProfilesResults)"
                title="Profiles"
              />

              <!-- Playlists -->
              <PlaylistsCards
                v-if="getSearchPlaylistsResults.length"
                :isPreview="true"
                :showArtist="true"
                :playlists="sliceSearchResults(getSearchPlaylistsResults)"
                title="Playlists"
              />

              <!--Songs-->
              <SongsList :songs="sliceSearchResults(getSearchSongsResults)" :playlistId="playlistId" />
            </template>
          </template>
        </template>

        <!--
          No search param to perform request
          Need to show some information
        -->
        <template v-else>
          <div class="info-plug">
            <h2 class="info-plug__title">Here should be some info but... Look at this cute snake:3</h2>
            <img class="info-plug__image" src="../../assets/images/search_plug.png">
          </div>
        </template>
      </section>
    </div>
  </section>
</template>

<script>
import ErrorsPlug from "./ErrorsPlug.vue";
import PlaylistsCards from "./PlaylistsCards.vue";
import ProfilesCards from "./ProfilesCards.vue";
import SongsList from "./SongsList.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Search",

  components: {
    ErrorsPlug,
    SongsList,
    PlaylistsCards,
    ProfilesCards,
  },

  data() {
    return {
      playlistId: -1,
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

    sliceSearchResults(results) {
      if (results.length > 10) {
        return results.slice(0, 10);
      } else {
        return results;
      }
    },

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
          accessToken: this.getProfile.accessToken,
          componentName: this.$options.name,
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
  top: 10px;
  left: 30px;
  height: 40px;
  width: 364px;
  z-index: 4;
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

.info-plug {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-plug__title {
  margin-top: 100px;
  font-size: 1.7rem;
  font-weight: 600;
  text-align: center;
}

.info-plug__image {
  width: 300px;
  height: 300px;
  margin-top: 0 auto;
}
</style>
