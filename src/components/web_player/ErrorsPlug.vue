<template>
  <div class="errors-plug">
    <div class="errors-plug__title">
      {{ title }}
    </div>
    <div class="errors-plug__message">
      {{ message }}
    </div>
  </div>
</template>

<script>
/* Shows title with message instead of occuried errors*/
export default {
  name: "ErrorsPlug",

  props: ["title", "message"],

  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.errors-plug__title {
  margin-top: 100px;
  font-size: 1.7rem;
  font-weight: 600;
  text-align: center;
}

.errors-plug__message {
  margin-top: 15px;
  font-size: 1.2rem;
  text-align: center;
}
</style>
