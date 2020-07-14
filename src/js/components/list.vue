<template>
  <div class="movies-page">
    <filters></filters>
    <div class="movies-list">
      <div v-for="(movie, index) in filteredMovies" :key="index">
        <movie-card :details="movie" class="list-item" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import movieCard from "./movieCard.vue";
import filters from "./filters.vue";

export default {
  name: "list",
  components: {
    movieCard,
    filters,
  },
  mounted() {
    this.fetchMovies();
  },
  computed: {
    ...mapGetters(["filteredMovies"]),
  },
  methods: {
    ...mapActions(["fetchMovies"]),
  },
};
</script>

<style lang="scss" scoped>
.movies-page {
  display: flex;
  flex-direction: column;

  .movies-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .list-item {
      padding: 20px;
    }
  }
}
</style>
