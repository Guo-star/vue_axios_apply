<template>
  <div>
    <button @click="api1Hander">接口a</button>
    <button @click="api2Hander">接口b</button>
    <button @click="api3Hander">接口c</button>
    <button @click="apiAllHander">请求全部</button>
    <br />
    <br />

    <button @click="clearA">取消a</button>
    <button @click="clearB">取消b 和 c</button>
  </div>
</template>

<script>
import { getPoetry, getJoke, getEmail } from "@/api/api";

export default {
  name: "Axios",
  methods: {
    apiAllHander() {
      this.api1Hander();
      this.api2Hander();
      this.api3Hander();
    },
    async api1Hander() {
      console.log("接口a");
      const { code, result } = await getPoetry();

      if (code === 200) {
        console.log(result);
      }
    },
    async api2Hander() {
      console.log("接口b");
      const { code, result } = await getJoke();

      if (code === 200) {
        console.log(result);
      }
    },
    async api3Hander() {
      console.log("接口c");
      const { code, result } = await getEmail();

      if (code === 200) {
        console.log(result);
      }
    },
    clearA() {
      console.log("取消a");
      this.$store.commit("axios/CLEAR_INDEX", "a");
    },
    clearB() {
      console.log("取消b 和 c");
      this.$store.commit("axios/CLEAR_INDEX", "b");
    },
  },
};
</script>
