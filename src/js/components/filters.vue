<template>
  <div class="filter-panel">
    <div class="filter-row">
      <div class="dropdown-area">
        <multi-select
          title="Genre"
          :items="genres"
          :selected="filter.genres"
          @change="genresChange"
          class="dropdown"
        ></multi-select>
        <multi-select
          title="Years"
          :items="years"
          :selected="filter.years"
          @change="yearsChange"
          class="dropdown"
        ></multi-select>
      </div>
      <span class="input-wrapper">
        <input
          type="text"
          class="text-input"
          @input="textChange"
          :value="filter.text"
        />
        <i class="material-icons">search</i>
      </span>
    </div>
    <div class="filter-row">
      <div class="type-choice">
        <input
          type="radio"
          id="movie"
          name="type"
          value="movie"
          :checked="filter.type === 'movie'"
          @change="typeChange"
        />
        <label for="movie">Movie</label>
        <input
          type="radio"
          id="book"
          name="type"
          value="book"
          :checked="filter.type === 'book'"
          @change="typeChange"
        />
        <label for="book">Book</label>
      </div>
      <span @click="clearFilter" class="clear-filters-message"
        >CLEAR FILTERS</span
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import multiSelect from "./multiSelect.vue";
import filterTypes from "../filter-types.js";

export default {
  name: "filters",
  components: {
    multiSelect,
  },
  methods: {
    ...mapActions(["updateFilter", "clearFilter"]),
    textChange(event) {
      this.updateFilter({ type: filterTypes.TEXT, value: event.target.value });
    },
    typeChange(event) {
      this.updateFilter({ type: filterTypes.TYPE, value: event.target.value });
    },
    genresChange(newList) {
      this.updateFilter({ type: filterTypes.GENRES, value: newList });
    },
    yearsChange(newList) {
      this.updateFilter({ type: filterTypes.YEARS, value: newList });
    },
  },
  computed: {
    ...mapState(["genres", "years", "filter"]),
  },
};
</script>

<style lang="scss" scoped>
.filter-panel {
  border-bottom: 1px solid #eeeeee;
}

.filter-row {
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.dropdown-area {
  display: flex;
}

.type-choice {
  display: flex;
}

.clear-filters-message {
  font-weight: bold;
  color: #62c3e0;
  text-decoration: underline #62c3e0;
}

.clear-filters-message:hover {
  cursor: pointer;
}

.input-wrapper {
  border: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 5px;
}

.text-input {
  border: none;
  height: 90%;
}

.text-input:focus {
  outline: none;
}

@media only screen and (max-width: 800px) {
  .filter-row {
    display: grid;
    grid-template-columns: 50%;
    grid-row-gap: 30px;
  }
}
</style>
