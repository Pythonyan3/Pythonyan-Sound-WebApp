<template>
  <div v-if="playlists.length" class="compilation">
    <div v-if="isPreview" class="compilation__title">
      <h2 class="compilation__title__text">{{ title }}</h2>
      <a href="" class="compilation__title__link">see all</a>
    </div>
    <h2 v-else class="compilation__title__text">{{ title }}</h2>
    <div
      class="compilation__card-container"
      :class="isPreview ? 'compilation__card-container__multiline' : ''"
    >
      <div
        v-for="playlist in playlists"
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
          <i class="fas fa-music fa-5x compilation__item__image-plug"></i>
        </div>

        <div class="compilation__card-item__title">
          {{ playlist.title }}
        </div>
        <div class="compilation__card-item__autors">
          By
          <router-link
            :to="{
              name: 'WebPlayerProfile',
              params: { id: playlist.owner.id },
            }"
            class="compilation__card-item__autors-link"
            >{{ playlist.owner.username }}</router-link
          >
        </div>
      </div>
    </div>
  </div>

  <div v-if="profiles.length" class="compilation">
    <div v-if="isPreview" class="compilation__title">
      <h2 class="compilation__title__text">{{ title }}</h2>
      <a href="" class="compilation__title__link">see all</a>
    </div>
    <h2 v-else class="compilation__title__text">{{ title }}</h2>

    <div
      class="compilation__card-container"
      :class="isPreview ? 'compilation__card-container__multiline' : ''"
    >
      <router-link
        v-for="profile in profiles"
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
            <i class="far fa-user fa-5x compilation__item__image-plug"></i>
          </div>

          <div class="compilation__card-item__title">
            {{ profile.username }}
          </div>
          <div v-if="profile.is_artist" class="compilation__card-item__autors">
            Artist
          </div>
          <div v-else class="compilation__card-item__autors">Profile</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfilesPlaylistsCards",

  props: {
    title: {
      type: String,
      default: "",
    },

    isPreview: {
      type: Boolean,
      default: false,
    },

    profiles: {
      type: Array,
      default: function () {
        return [];
      },
    },

    playlists: {
      type: Array,
      default: function () {
        return [];
      },
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

.compilation__card-container,
.compilation__card-container__multiline {
  overflow-y: hidden;
  display: grid;
  grid-gap: 24px;
  grid-auto-rows: 0;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.compilation__card-container__multiline {
  grid-auto-rows: auto;
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

.compilation__item__image-photo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0px;
  border-radius: 2px;
  z-index: 2;
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

.compilation__card-item__autors-link {
    font-size: 0.8rem;
    color: #b3b3b3;
}

.compilation__card-item__autors-link:hover {
    color: #ffa1bd;
    text-decoration: underline;
}
</style>
