<template>
  <div v-if="songs.length" class="compilation">
    <div v-if="isPreview" class="compilation__title">
      <h2 class="compilation__title__text">Songs</h2>
      <a href="" class="compilation__title__link">see all</a>
    </div>
    <h2 v-else class="compilation__title__text">Songs</h2>

    <section class="compilation__list">
      <div
        v-for="(song, index) in songs"
        :key="`song-${index}`"
        class="compilation__list-item"
        :class="isPlayingSong(song.id) ? 'active-item' : ''"
      >
        <div class="compilation__list-item__block list-item__block__number">
          {{ index + 1 }}
        </div>

        <div
          v-if="isPlayingSong(song.id)"
          class="fas fa-xs compilation__list-item__block list-item__block__play-song"
          :class="getIsPlaying ? 'fa-pause' : 'fa-play'"
          @click="getIsPlaying ? playerPause() : playerPlay()"
        ></div>

        <div
          v-else
          class="fas fa-play fa-xs compilation__list-item__block list-item__block__play-song"
          @click="playSong(index)"
        ></div>

        <div class="compilation__list-item__block">
          <div class="compilation__list-item__image">
            <img
              class="compilation__item__image-photo"
              :src="song.cover || ''"
              alt=""
              onload="this.style.display='inline'"
              onerror="this.style.display='none'"
            />
            <i class="fas fa-compact-disc compilation__item__image-plug"></i>
          </div>

          <div class="compilation__list-item__info">
            <span class="compilation__list-item__title">
              {{ song.title }}
            </span>
            <router-link
              v-if="showArtist"
              :to="{ name: 'WebPlayerProfile', params: { id: song.artist.id } }"
            >
              <span class="compilation__list-item__autor">
                {{ song.artist.username }}
              </span>
            </router-link>
          </div>
        </div>

        <div class="compilation__list-item__block"></div>

        <div class="compilation__list-item__block compilation__list-item__menu">
          <template v-if="getProfile.id != song.artist.id">
            <i
              v-if="song.is_liked"
              class="fas fa-heart compilation__list-item__menu-item liked"
              @click="unlikeSong($event.currentTarget, index)"
            ></i>
            <i
              v-else
              class="far fa-heart compilation__list-item__menu-item"
              @click="likeSong($event.currentTarget, index)"
            ></i>
          </template>

          <i
            class="fas fa-ellipsis-h compilation__list-item__menu-item"
            @click.self="openSongMenu"
          >
            <div class="dropdown-menu__container">
              <ul class="dropdown-menu">
                <li class="dropdown-menu__item">
                  Add to playlist
                  <i class="fas fa-caret-right dropdown-menu__item-icon"></i>
                  <div
                    v-if="getProfilePlaylists.length"
                    class="dropdown-inner-menu__container"
                  >
                    <ul class="dropdown-menu">
                      <li
                        v-for="playlist in getProfilePlaylists"
                        :key="playlist"
                        class="dropdown-menu__item"
                        @click="addSongToPlaylist(song.id, playlist.id)"
                      >
                        {{ playlist.title }}
                      </li>
                    </ul>
                  </div>
                </li>
                <li
                  v-if="showDeleteSongMenuItem"
                  class="dropdown-inner-menu__item"
                >
                  Remove Song
                </li>
              </ul>
            </div>
          </i>

          <i
            v-if="showDeleteSongFromPlaylistIcon"
            @click="removeSongFromPlaylist(song.id, playlistId)"
            title="Remove from playlist"
            class="far fa-trash-alt compilation__list-item__menu-item"
          ></i>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "SongsList",

  props: {
    showArtist: {
      type: Boolean,
      default: true,
    },

    showDeleteSongMenuItem: {
      type: Boolean,
      default: false,
    },

    showDeleteSongFromPlaylistIcon: {
      type: Boolean,
      default: false,
    },

    isPreview: {
      type: Boolean,
      default: false,
    },

    playlistId: {
      type: Number,
    },

    songs: {
      type: Array,
    },
  },

  data() {
    return {
      isAddingSong: false,
      isRemovingSong: false,
      openedSongMenu: null,
    };
  },

  mounted() {
    // close opened menu on click anywhere
    document.body.addEventListener("click", this.closeSongMenu);
  },

  computed: {
    ...mapGetters({
      getPlaylistId: "player/getPlaylistId",
      getCurrentSong: "player/getCurrentSong",
      getIsPlaying: "player/getIsPlaying",

      getProfile: "profile/getProfile",
      getProfilePlaylists: "playlists/getProfilePlaylists",
    }),
  },

  methods: {
    ...mapActions({
      addSongToPlaylistAction: "playlists/addSongToPlaylistAction",
      removeSongFromPlaylistAction: "playlists/removeSongFromPlaylistAction",
    }),

    ...mapMutations({
      setError: "SET_ERROR",
      clearError: "CLEAR_ERROR",
      setNotificationMessage: "SET_NOTIFICATION_MESSAGE",

      playerPlay: "player/PLAY",
      playerPause: "player/PAUSE",
      playerSetPlaylist: "player/SET_PLAYLIST",
      playerSetCurrentSong: "player/SET_CURRENT_SONG",
    }),

    isPlayingSong(songId) {
      return (
        this.playlistId == this.getPlaylistId &&
        songId == this.getCurrentSong.id
      );
    },

    playSong(songIndex) {
      if (this.playlistId != this.getPlaylistId) {
        this.playerSetPlaylist({
          playlistId: this.playlistId,
          songs: this.songs,
        });
      }

      this.playerSetCurrentSong(songIndex);
      this.playerPlay();
    },

    async likeSong(element, songIndex) {
      if (!element.classList.contains("disabled")) {
        element.classList.add("disabled");

        const song = this.songs[songIndex];

        try {
          await this.$api.songs.likeSong(song.id, this.getProfile.accessToken);

          song.is_liked = true;
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

    async unlikeSong(element, songIndex) {
      if (!element.classList.contains("disabled")) {
        element.classList.add("disabled");

        const song = this.songs[songIndex];
        try {
          await this.$api.songs.unlikeSong(
            song.id,
            this.getProfile.accessToken
          );

          song.is_liked = false;
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

    openSongMenu(event) {
      if (
        this.openedSongMenu &&
        this.openedSongMenu.menuItem == event.currentTarget.firstChild
      ) {
        // clicked on current menu, need only close
        this.openedSongMenu.songItem.classList.remove("opened-menu");
        this.openedSongMenu.menuItem.style.display = "none";
        this.openedSongMenu = null;
      } else {
        if (this.openedSongMenu) {
          // click other menu, need close previous menu
          this.openedSongMenu.songItem.classList.remove("opened-menu");
          this.openedSongMenu.menuItem.style.display = "none";
        }

        // open new current menu
        this.openedSongMenu = {
          songItem: event.currentTarget.parentElement.parentElement,
          menuItem: event.currentTarget.firstChild,
        };
        this.openedSongMenu.songItem.classList.add("opened-menu");
        this.openedSongMenu.menuItem.style.display = "flex";

        // stop body click event for close opened menu
        event.stopPropagation();
      }
    },

    closeSongMenu() {
      if (this.openedSongMenu) {
        this.openedSongMenu.songItem.classList.remove("opened-menu");
        this.openedSongMenu.menuItem.style.display = "none";
        this.openedSongMenu = null;
      }
    },

    async addSongToPlaylist(songId, playlistId) {
      if (!this.isAddingSong) {
        this.isAddingSong = true;

        await this.addSongToPlaylistAction({
          api: this.$api,
          accessToken: this.getProfile.accessToken,
          componentName: this.$options.name,
          playlistId: playlistId,
          songId: songId,
        });

        this.isAddingSong = false;
      }
    },

    async removeSongFromPlaylist(songId, playlistId) {
      console.log("removing");
      if (!this.isRemovingSong) {
        this.isRemovingSong = true;

        await this.removeSongFromPlaylistAction({
          api: this.$api,
          accessToken: this.getProfile.accessToken,
          componentName: this.$options.name,
          playlistId: playlistId,
          songId: songId,
        });

        this.isRemovingSong = false;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.compilation {
  margin-top: 50px;
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

.compilation__list-item__menu-item {
  position: relative;
}

.compilation__list-item:hover {
  background-color: #2d2d2d;
}

.active-item .compilation__list-item__title {
  color: #ffa1bd;
}

.compilation__list-item:hover .compilation__list-item__menu-item {
  opacity: 1;
}

.dropdown-menu__container {
  position: absolute;
  display: none;
  min-width: 160px;
  top: 0;
  right: calc(100% + 5px);
  background-color: #282828;
  z-index: 2;
}

.dropdown-inner-menu__container {
  position: absolute;
  display: none;
  min-width: 160px;
  bottom: 0;
  right: calc(100% - 1px);
  background-color: #282828;
  z-index: 2;
}

.dropdown-menu__container:hover .dropdown-inner-menu__container {
  display: flex;
}

.dropdown-menu {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4px;
  list-style: none;
}

.dropdown-menu__item {
  position: relative;
  padding: 12px 18px;
  font-size: 0.8rem;
  text-overflow: ellipsis;
}

.dropdown-menu__item-icon {
  position: absolute;
  top: calc(50% - 0.5rem);
  right: 10px;
  font-size: 1rem;
}

.dropdown-menu__item:hover,
.dropdown-inner-menu__item:hover {
  background-color: hsla(0, 0%, 100%, 0.1);
}

.opened-menu {
  background-color: #2d2d2d;
}

.opened-menu .compilation__list-item__menu-item {
  opacity: 1;
}

.compilation__list-item__block {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.list-item__block__play-song {
  cursor: pointer;
  display: none;
}

.compilation__list-item:hover .list-item__block__play-song,
.active-item .list-item__block__play-song {
  display: flex;
}

.compilation__list-item:hover .list-item__block__number,
.active-item .list-item__block__number {
  display: none;
}

.compilation__list-item__info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 14px;
}

.compilation__list-item__image {
  position: relative;
  width: 56px;
  height: 56px;
}

.compilation__item__image-photo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0px;
  border-radius: 2px;
  z-index: 5;
}

.compilation__item__image-plug {
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

.compilation__list-item__menu {
  justify-content: center;
}

.compilation__list-item__menu-item {
  opacity: 0;
  margin-right: 15px;
  cursor: pointer;
  transition: 0.1s;
}

.liked {
  opacity: 1;
  color: #ffa1bd;
}

.compilation__list-item__menu-item:hover {
  color: #ffa1bd;
}
</style>
