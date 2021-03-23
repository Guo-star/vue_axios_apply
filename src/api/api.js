import { get } from "./request";
const prefix = "/api";

// 随机一首诗词
export const getPoetry = () =>
  get(prefix + "/recommendPoetry", null, {
    $cancelRepeat: true,
    $cancelKey: "a",
  });

export const getJoke = () =>
  get(prefix + "/getJoke?page=1&count=2&type=video", null, { $cancelKey: "b" });

export const getEmail = () =>
  get(prefix + "/singlePoetry", null, { $cancelKey: "b" });
