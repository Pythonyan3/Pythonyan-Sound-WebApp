<template>
  <div class="grid__wrapper">
    <div class="nav__bar">
      <a href="">
        <div class="nav__logo">
          <img
            class="nav__logo__icon"
            src="../assets/images/snake_logo.png"
            alt=""
          />
          <span class="nav__logo__title">Pythonyan Sound</span>
        </div>
      </a>

      <div class="nav__menu">
        <router-link :to="{ name: 'WebPlayer' }">
          <div class="nav__bar__item">
            <span class="fas fa-home fa-lg"></span>
            <span>Home</span>
          </div>
        </router-link>

        <router-link :to="{ name: 'WebPlayerSearch' }">
          <div class="nav__bar__item">
            <span class="fas fa-search fa-lg"></span>
            <span>Search</span>
          </div>
        </router-link>

        <a href="">
          <div class="nav__bar__item">
            <span class="fas fa-compact-disc fa-lg"></span>
            <span>Your Library</span>
          </div>
        </a>
      </div>

      <div class="add__playlists">
        <div class="playlists_add_title">Playlists</div>

        <a href="">
          <div class="nav__bar__item">
            <span class="fas fa-compact-disc fa-plus-square fa-lg"></span>
            <span>Create Playlist</span>
          </div>
        </a>

        <a href="">
          <div class="nav__bar__item">
            <span class="fas fa-heart fa-lg"></span>
            <span>Liked Songs</span>
          </div>
        </a>
      </div>
    </div>

    <div class="main__view">
      <header class="main__view__header">
        <div class="container">
          <div class="main__view__header__inner">
            <div class="user__bar">
              <div class="user__bar__icon">
                <i class="far fa-user"></i>
              </div>
              <div class="user__bar__name">Pythonyan3</div>
              <div class="fas fa-caret-down caret__down__icon"></div>
            </div>
          </div>
        </div>
      </header>

      <router-view />
    </div>

    <div class="player__bar">
      <div class="play__song__info">
        <div class="song__cover">
          <div class="fas fa-compact-disc fa-lg"></div>
        </div>

        <div class="song__info">
          <a class="song__title" href=""> Проблемы </a>
          <div>
            <a class="song__autor" href=""> Andromeda </a>
          </div>
        </div>

        <div class="player__button far fa-heart"></div>
      </div>

      <div class="player__controls">
        <div class="player__controls__buttons">
          <div class="player__button shuffle fas fa-random fa-sm"></div>
          <div class="player__button previous fas fa-step-backward fa-sm"></div>
          <div class="player__button play fas fa-play fa-xs"></div>
          <div class="player__button next fas fa-step-forward fa-sm"></div>
          <div class="player__button repeat fas fa-redo-alt fa-sm"></div>
        </div>

        <div class="player__controls__progress">
          <div class="controls__progress__time">0:00</div>
          <div class="controls__progress__bar">
            <div class="progress__bar__slider"></div>
            <div class="progress__bar"></div>
          </div>
          <div class="controls__progress__time">0:00</div>
        </div>
      </div>

      <div class="player__extra__controls">
        <div
          class="player__button extra__controls__button fas fa-volume-up fa-sm"
        ></div>
        <div class="extra__controls__volume">
          <div class="controls__progress__bar">
            <div class="progress__bar__slider"></div>
            <div class="progress__bar"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WebPlayer",
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

html,
body {
  height: 100%;
}

a {
  text-decoration: none;
}

.grid__wrapper {
  display: grid;
  height: 100vh;
  width: 100%;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    "nav__bar       main__view"
    "player__bar player__bar";
}

/*Navigation Bar*/
.nav__bar {
  grid-area: nav__bar;
  display: flex;
  padding: 0 8px;
  flex-direction: column;
  background-color: black;
}

.nav__logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav__logo:hover .nav__logo__title {
  color: #ffa1bd;
}

.nav__logo__icon {
  max-width: 100px;
}

.nav__logo__title {
  font-size: 1rem;
  font-weight: 600;
  transition: color 0.3s;
}

.nav__menu {
  margin-top: 20px;
}

.nav__bar__item {
  display: flex;
  align-items: center;
  padding: 10px 20px;
}

.nav__bar__item > span {
  transition: color 0.3s;
  font-size: 0.8rem;
}

.nav__bar__item > span:nth-child(1) {
  font-size: 1.3rem;
  margin-right: 10px;
}

.nav__bar__item:hover span {
  color: #ffa1bd;
}

.playlists_add_title {
  font-size: 1.1rem;
  margin-top: 25px;
  padding: 0px 20px;
}

.selected__item {
  border-radius: 5px;
  background-color: rgb(40, 40, 40);
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
  padding: 10px 30px;
}

/*Main View Header*/
.main__view__header__inner {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 60px;
  width: 100%;
  padding: 10px 0;
}

.user__bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: black;
  border-radius: 32px;
  height: 32px;
  padding: 2px;
}

.user__bar:hover {
  background-color: #333333;
  cursor: pointer;
}

.user__bar__icon {
  width: 28px;
  height: 28px;
  padding: 4px 0 0 7px;
  background-color: #333333;
  border-radius: 15px;
}

.user__bar__name {
  margin: 0 15px;
  font-size: 0.8rem;
}

.caret__down__icon {
  margin-right: 8px;
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

.song__cover {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.song__info {
  margin: 0 14px;
}

.song__title {
  font-size: 1rem;
  line-height: 24px;
}

.song__autor {
  font-size: 0.8rem;
  line-height: 24px;
  color: #b3b3b3;
}

.song__title:hover,
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
  padding: 8.5px 0 0 11.5px;
}

.player__button:hover {
  color: #ffa1bd;
  border-color: #ffa1bd;
  cursor: pointer;
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
  align-items: center;
  position: relative;
  width: 100%;
  height: 10px;
}

.progress__bar__slider {
  display: none;
  position: absolute;
  left: -5px;
  top: -1px;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: white;
}

.progress__bar {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: #535353;
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
