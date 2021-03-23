import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Table, TableColumn } from "element-ui";

Vue.config.productionTip = false;
Vue.use(Table);
Vue.use(TableColumn);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
