import "../styles/index.css";
import "../styles/testimonial-block.scss";
import store from "./store";
import list from "./components/list.vue";
import Vue from "vue";

new Vue({
  store,
  render: (h) => h(list),
}).$mount("#vapp");

console.log("App Ready");
