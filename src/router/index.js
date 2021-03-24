import Vue from "vue";
import VueRouter from "vue-router";
import Text from "../views/text.vue";
import Axios from "../views/axios.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Axios",
    component: Axios,
  },
  {
    path: "/text",
    name: "Text",
    component: Text,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  store.commit("axios/CLEAR_INDEX", from.path);
  next();
});

export default router;
