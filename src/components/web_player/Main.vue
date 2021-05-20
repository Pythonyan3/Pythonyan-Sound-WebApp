<template>
  <section class="playlists">
    <div class="container">
      <section class="playlists__inner">
        <div class="playslists__compilation">
          <h2 class="playlists__compilation__title">Mix</h2>
          <div class="playlists__container">
            <div class="playlist__item">
              <div class="playlist__item__cover">
                <img class="cover__image" src="andro.jpg" alt="" />
              </div>
              <div class="playlist__item__title">Daily Mix 1</div>
              <div class="playlist__item__autors">
                Andromeda, Rocket and more
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>

export default {
  name: "WebPlayerMain",
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*Main View Content*/
.playlists {
  margin-top: 25px;
}

.playlists__inner {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
}

.playlists__compilation__title {
  font-size: 2rem;
  font-weight: 600;
}

.playlists__container {
  overflow-y: hidden;
  display: grid;
  grid-gap: 24px;
  grid-auto-rows: 0;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.playlist__item {
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  padding: 16px;
  background-color: #161616;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.playlist__item:hover {
  cursor: pointer;
  background-color: #262626;
}

.playlist__item__cover {
  width: 100%;
  height: 100%;
}

.cover__image {
  width: 100%;
  height: 100%;
  border-radius: 2px;
}

.playlist__item__title {
  font-size: 1.1rem;
  margin-top: 15px;
}

.playlist__item__autors {
  margin-top: 15px;
  font-size: 0.8rem;
  color: #b3b3b3;
  text-overflow: ellipsis;
}

</style>
