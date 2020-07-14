<template>
  <div class="card">
    <img :src="details.poster" class="poster" />
    <div>{{ details.title }} ({{ details.year }})</div>
    <div class="genre-text">{{ genreText }}</div>
  </div>
</template>

<script>
export default {
  name: "movieCard",
  props: {
    details: Object,
  },
  computed: {
    genreText() {
      return this.details.genre
        ? `Genres: ${this.details.genre.join(", ")}`
        : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  font-weight: bold;
  width: 300px;

  .poster {
    width: 300px;
    height: auto;
  }

  .genre-text {
    padding-top: 5px;
  }
}
</style>
