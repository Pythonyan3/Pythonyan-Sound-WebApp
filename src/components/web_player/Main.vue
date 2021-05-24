<template>
  <div class="info-plug">
    <h2 class="info-plug__title">
      Just doing some magic with recommendations...
    </h2>
    <img class="info-plug__image" src="../../assets/images/recommend.png" />
  </div>
</template>

<script>
export default {
  name: "WebPlayerMain",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
