import Vue from "vue";
import VueRouter from "vue-router";
import Flex from "../views/flex.vue";
import Axios from "../views/axios.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/flex",
    name: "Flex",
    component: Flex,
  },
  {
    path: "/axios",
    name: "Axios",
    component: Axios,
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
