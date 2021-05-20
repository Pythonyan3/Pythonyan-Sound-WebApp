<template>
  <section class="profile">
    
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Profile",

  components: {
    
  },

  data() {
    return {
      wasErrorOccurred: false,
      isLoading: false,
    };
  },

  computed: {
    ...mapGetters({
      getSearchString: "search/getSearchString",
      getSearchArtistsResults: "search/getSearchArtistsResults",
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
      
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
