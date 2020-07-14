export default {
  getMovies() {
    return fetch(
      `https://hubspotwebteam.github.io/CodeExercise/src/js/data/data.json`,
      { method: "GET" }
    )
      .then((response) => response.text())
      .then((response) => {
        return JSON.parse(response);
      });
  },
};
