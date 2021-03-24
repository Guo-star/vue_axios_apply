# axios 在项目中的应用

## 1、取消请求

### 基础使用

```js
// 通过axios.CancelToken构造函数生成取消函数
const CancelToken = axios.CancelToken;
// 执行方法
let cancel;

axios.get('/user/12345', {
 // 通过实例CancelToken 获取到执行取消的方法
  cancelToken: new CancelToken(function(c) {
    cancel = c;
  })
});

// 根据需求执行取消方法
cancel();
```

### 应用需求分析

1. 防止接口重复请求；
2. 路由改变时取消之前路由所有请求；
3. 能手动取消某个接口，或者某一类接口；

### 封装思路

1. 请求时通过axios请求拦截器把取消方法记录到store中，检测到重复直接取消当前请求。接收到数据后通过响应拦截器删除掉取消方法；
2. store中添加取消请求方法 方便调用；
3. 可全局和单独接口配置 精细控制；

在`src/api/request.js`文件中

```js
/** 默认的全局配置 */
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
)
```

在`src/store/modules/axios.js`文件中

```js
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
```

### 取消请求使用

防止接口重复请求

```js
// 方法1：直接修改axios封装defaultOption.$cancelRepeat = true；
const defaultOption = {
  $cancelRepeat: true, // 是否需要重复请求
  ...
};

// 方法2：在请求方法配置参数中添加$cancelRepeat: true
const res = await $post("/xxx", null, { $cancelRepeat: true })
```

路由改变时取消之前路由所有请求

```js
// 第一步 修改axios封装defaultOption.$cancelRoute = true；
const defaultOption = {
  $cancelRoute: true,
  ...
};

// 第二步 在路由拦截中触发清除组
router.beforeEach(async (to, from, next) => {
  store.commit("axios/CLEAR_INDEX", from.path);
  next();
  ...
});
```

能手动取消某个接口，或者某一类接口；

```js
// 第一步 在请求方法配置参数中添加$cancelKey 值为唯一值
const res = await $post("/xxx", null, { $cancelKey: "XXX-key" })

// 第二部 在需求代码中使用
store.commit("axios/CLEAR_INDEX", "XXX-key");
```
