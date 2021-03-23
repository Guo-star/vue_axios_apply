import axios from "axios";
import store from "@/store";
import router from "@/router";
import Qs from "qs";

// 请求参数设置格式
const applicationJson = "application/json; charset=UTF-8";
const applicationForm = "application/x-www-form-urlencoded; charset=UTF-8";
// const multipart = "multipart/form-data; charset=UTF-8";

const instance = axios.create({
  // 设置超时时间
  timeout: 300000,
  withCredentials: true,
});

/** 默认的自定义配置 */
const defaultOption = {
  $type: "json", // 传参格式默认json 如果传递form 随便填
  $cancelRepeat: false, // 是否需要取消重复请求
  $cancelKey: "", // 分组key值
  $cancelRoute: true, // 是否开启切换路由取消之前请求
};

/** 取消请求 */
const CancelToken = axios.CancelToken;

/** 请求拦截 */
instance.interceptors.request.use(
  (config) => {
    config.cancelToken = new CancelToken(function (c) {
      // 重复请求存储
      if (config.$cancelRepeat) {
        const cancelMap = store.getters.axiosPromiseCancel;

        if (cancelMap.get(config.url)) {
          c();
        } else {
          store.commit("axios/ADD_AXIOS_CANCEL", {
            url: config.url,
            handler: c,
          });
        }
      }

      // key 清除 获取设置的$cancelKey 存储组
      if (config.$cancelKey) {
        store.commit("axios/ADD_CANCEL_INDEX", {
          key: config.$cancelKey,
          url: config.url,
          handler: c,
        });
      }

      // 路由清除 获取路由作为key 存储组
      if (config.$cancelRoute) {
        const key = router.currentRoute.path;
        store.commit("axios/ADD_CANCEL_INDEX", {
          key: key,
          url: config.url,
          handler: c,
        });
      }
    });

    return config;
  },
  (error) => {
    console.log(error);
  }
);

/** 响应拦截 */
instance.interceptors.response.use(
  (response) => {
    const { data, config } = response;

    // 请求到数据从取消列表中去除
    if (config.$cancelRepeat) {
      store.commit("axios/DELETE_AXIOS_CANCEL", config.url);
    }

    return data;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          // 网络请求不存在;
          break;
        default:
        // 服务器错误，请稍后再试;
      }
    } else {
      // 请求超时或者网络有问题
      if (error.message) {
        if (error.message.includes("timeout")) {
          // 网络请求超时！请检查网络是否正常;
        } else {
          // 网络请求失败，请检查网络是否已连接;
        }
      }
    }

    return {};
  }
);

export const post = (url, params, Opt = {}) => {
  const option = Object.assign({}, defaultOption, Opt);

  return instance({
    method: "post",
    url,
    data: option.$type === "json" ? params : Qs.stringify(params),
    headers: {
      "Content-Type":
        option.$type === "json" ? applicationJson : applicationForm,
      "Cache-Control": "no-cache",
    },
    ...option,
  });
};

export const get = (url, params, Opt = {}) => {
  const option = Object.assign({}, defaultOption, Opt);

  return instance({
    method: "get",
    url,
    params,
    headers: {
      "Content-Type": applicationJson,
      "Cache-Control": "no-cache",
    },
    ...option,
  });
};
