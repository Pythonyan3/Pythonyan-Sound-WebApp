<template>
  <div class="management">
    <header class="header">
      <router-link :to="{ name: 'Main' }">
        <div class="header__logo">
          <img
            class="header__logo__icon"
            src="../assets/images/snake_logo.png"
            alt=""
          />
          <span class="header__logo__text">Pythonyan Sound</span>
        </div>
      </router-link>
    </header>

    <router-view/>

  </div>
</template>

<script>

export default {
  name: "Management",
 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  color: black;
}

.header {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #d9dadc;
}

.header__logo {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.header__logo__icon {
  max-width: 100px;
}

.header__logo__text {
  font-weight: 600;
  font-size: 2rem;
}
</style>
