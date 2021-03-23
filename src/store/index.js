import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  getters: {
    axiosPromiseCancel: (state) => state.axios.axiosPromiseCancel,
    cancelIndexMap: (state) => state.axios.cancelIndexMap,
  },
  modules,
});
