import Vue from "vue";
import Vuex from "vuex";
import moviesAPI from "../api/movies.js";
import filterTypes from "../filter-types.js";
import Fuse from "fuse.js";

Vue.use(Vuex);

const fuseOptions = {
  threshold: 0.3,
  keys: ["title"],
};

const _resetFilter = () => {
  return { text: "", type: null, genres: [], years: [] };
};
export default new Vuex.Store({
  state: {
    movies: [],
    filter: _resetFilter(),
    genres: [],
    years: [],
  },
  mutations: {
    updateMovies(state, movies) {
      state.movies = movies;
    },
    updateGenres(state, genres) {
      state.genres = genres;
    },
    updateYears(state, years) {
      state.years = years;
    },
    updateFilter(state, { type, value }) {
      state.filter[type] = value;
    },
    clearFilter(state) {
      state.filter = _resetFilter();
    },
  },
  actions: {
    fetchMovies({ commit }) {
      moviesAPI.getMovies().then((payload) => {
        const genres = Array.from(
          new Set(payload.media.flatMap((item) => item.genre).sort())
        );
        const years = Array.from(
          new Set(
            payload.media
              .map((item) => item.year)
              .sort(function(a, b) {
                return b - a;
              })
          )
        );
        commit("updateGenres", genres);
        commit("updateYears", years);
        commit("updateMovies", payload.media);
      });
    },
    updateFilter({ commit }, { type, value }) {
      if (Object.values(filterTypes).includes(type)) {
        commit("updateFilter", { type, value });
      }
    },
    clearFilter({ commit }) {
      commit("clearFilter");
    },
  },
  getters: {
    filteredMovies(state) {
      let filteredMovies = state.movies.filter((movie) => {
        return (
          (state.filter.type === null || state.filter.type === movie.type) &&
          (state.filter.genres.length === 0 ||
            state.filter.genres.some((elem) => movie.genre.includes(elem))) &&
          (state.filter.years.length === 0 ||
            state.filter.years.includes(movie.year))
        );
      });
      if (state.filter.text && state.filter.text !== "") {
        const fuse = new Fuse(filteredMovies, fuseOptions);
        filteredMovies = fuse
          .search(state.filter.text)
          .map((item) => item.item);
      }
      return filteredMovies.sort(function(a, b) {
        return b.title < a.title;
      });
    },
  },
});
