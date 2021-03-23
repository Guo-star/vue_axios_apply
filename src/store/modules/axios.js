export default {
  namespaced: true,
  state: {
    // axios 清除方法数据
    axiosPromiseCancel: new Map(),
    // axios 清除类别保存的索引
    cancelIndexMap: {},
  },
  mutations: {
    // 添加清除类别索引
    ADD_CANCEL_INDEX(state, params) {
      const { key, url } = params;

      if (!state.cancelIndexMap[key]) {
        state.cancelIndexMap[key] = [];
      }

      this.commit("axios/ADD_AXIOS_CANCEL", params);
      state.cancelIndexMap[key].push(url);
    },
    // 取消请求类别索引
    CLEAR_INDEX(state, key) {
      const cancles = state.cancelIndexMap[key];

      if (cancles?.length) {
        for (let i = 0, length = cancles.length; i < length; i++) {
          this.commit("axios/DELETE_AXIOS_CANCEL", cancles[i]);
        }
      }

      delete state.cancelIndexMap[key];
    },
    // 添加请求
    ADD_AXIOS_CANCEL(state, { url, handler }) {
      state.axiosPromiseCancel.set(url, handler);
    },
    // 删除保存的请求
    DELETE_AXIOS_CANCEL(state, url) {
      const promiseCancel = state.axiosPromiseCancel;

      if (promiseCancel.has(url)) {
        const e = promiseCancel.get(url);
        e();
        promiseCancel.delete(url);
      }
    },
    // 取消添加的请求
    CLEAR_AXIOS(state) {
      state.axiosPromiseCancel.forEach((e) => {
        e && e();
      });
      state.axiosPromiseCancel.clear();
    },
  },
  actions: {},
};
