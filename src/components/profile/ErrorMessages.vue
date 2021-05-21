<template>
  <div v-if="getErrorData.length" class="errors">
    <div v-for="message in getErrorData" :key="message">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ErrorMessages",

  computed: {
    ...mapGetters({
      getErrorData: "getErrorData",
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.errors {
  width: 100%;
  margin: 15px 0 0 0;
  padding: 10px 5px 10px 5px;
  background-color: #ffa1bd;
  text-align: center;
}
</style>
