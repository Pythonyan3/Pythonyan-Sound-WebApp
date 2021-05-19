<template>
  <section class="search__form">
      <i class="fas fa-search search__form__icon search__icon"></i>
      <input
        v-model="searchString"
        class="search__field"
        type="text"
        placeholder="Artists, songs or playlists"
      />
      <i
        v-if="searchString"
        @click="clearSearchString"
        class="fas fa-times search__form__icon clear__icon"
      ></i>
  </section>

  <section class="compilations_set">
    <div class="container">
      <section class="compilations_set__inner">
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
        <template v-else>
          <template
            v-if="
              wasSearched &&
              !searchResults.artists.length &&
              !searchResults.profiles.length &&
              !searchResults.playlists.length &&
              !searchResults.songs.length
            "
          >
            <div class="no_results">
              <div class="no_results__title">
                No results found for "{{ searchString }}"
              </div>
              <div class="no_results__message">
                Please make sure your words are spelled correctly or use less or
                different keywords.
              </div>
            </div>
          </template>
          <template v-else>
            <!--Artists-->
            <div v-if="searchResults.artists.length" class="compilation">
              <div class="compilation__title">
                <h2 class="compilation__title__text">Artists</h2>
                <a href="" class="compilation__title__link">see all</a>
              </div>

              <div class="compilation__card-container">
                <div
                  v-for="artist in searchResults.artists"
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
                    <i class="far fa-user fa-5x compilation__card-item__image-plug"></i>
                  </div>

                  <div class="compilation__card-item__title">
                    {{ artist.username }}
                  </div>
                  <div class="compilation__card-item__autors">Artist</div>
                </div>
              </div>
            </div>

            <!--Profiles-->
            <div v-if="searchResults.profiles.length" class="compilation">
              <div class="compilation__title">
                <h2 class="compilation__title__text">Profiles</h2>
                <a href="" class="compilation__title__link">see all</a>
              </div>
              <div class="compilation__card-container">
                <div
                  v-for="profile in searchResults.profiles"
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
                    <i class="far fa-user fa-5x compilation__card-item__image-plug"></i>
                  </div>

                  <div class="compilation__card-item__title">
                    {{ profile.username }}
                  </div>
                  <div class="compilation__card-item__autors">Profile</div>
                </div>
              </div>
            </div>

            <!-- Playlists -->
            <div v-if="searchResults.playlists.length" class="compilation">
              <div class="compilation__title">
                <h2 class="compilation__title__text">Playlists</h2>
                <a href="" class="compilation__title__link">see all</a>
              </div>
              <div class="compilation__card-container">
                <div
                  v-for="playlist in searchResults.playlists"
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
                    <i class="fas fa-music fa-5x compilation__card-item__image-plug"></i>
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

            <div v-if="searchResults.songs.length" class="compilation">
              <div class="compilation__title">
                <h2 class="compilation__title__text">Songs</h2>
                <a href="" class="compilation__title__link">see all</a>
              </div>
              <section class="compilation__list">
                <div v-for="(song, index) in searchResults.songs" :key="`song-${index}`" class="compilation__list-item">
                  <div class="compilation__list-item__block"> {{ index + 1 }}</div>
                  <div class="compilation__list-item__block">
                    <div class="compilation__list-item__cover">
                      <span class="fas fa-compact-disc fa-lg"></span>
                    </div>

                    <div class="compilation__list-item__info">
                      <span class="compilation__list-item__title"> {{ song.title }} </span>
                      <span class="compilation__list-item__autor"> {{ song.artist.username }} </span>
                    </div>
                  </div>
                </div>

              </section>
            </div>
          </template>
        </template>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  name: "Search",

  data() {
    return {
      searchResults: {
        artists: [],
        songs: [],
        playlists: [],
        profiles: [],
      },
      searchString: "",
      wasSearched: false,
      isLoading: false,
    };
  },

  methods: {
    clearSearchString() {
      this.searchString = "";
      this.wasSearched = false;
    },

    async search() {
      if (!this.isLoading && this.searchString) {
        this.wasSearched = true;
        this.isLoading = true;
        const result = (await this.$api.search.search(this.searchString)).data;
        this.searchResults = result;
        this.isLoading = false;
      }
    },
  },

  watch: {
    searchString: function () {
      this.search();
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

.no_results__title {
  margin-top: 100px;
  font-size: 1.7rem;
  font-weight: 600;
  text-align: center;
}

.no_results__message {
  margin-top: 15px;
  font-size: 1.2rem;
  text-align: center;
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

.compilation__list{
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
