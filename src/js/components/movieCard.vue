<template>
  <div class="card">
    <img :src="details.poster" class="poster" />
    <div>{{ details.title }} ({{ details.year }})</div>
    <div>{{ genreText }}</div>
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
  .poster {
    width: 300px;
    height: auto;
  }
}
</style>
