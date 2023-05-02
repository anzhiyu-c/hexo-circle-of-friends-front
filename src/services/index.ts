/*
 * @Description: service网络请求统一出口
 * @Author: 安知鱼
 * @Email: 2268025923@qq.com
 * @Date: 2021-08-28 15:37:10
 * @LastEditTime: 2022-11-02 13:26:27
 * @LastEditors: 安知鱼
 */

import ANRequest from "./request";
import Cache from "@/utils/cache";
import { BASE_URL, TIME_OUT } from "./request/config";

const anRequest = new ANRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config: any) => {
      // 携带token的拦截
      const token = Cache.getCache("fcircle-token");
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: "Bearer " + token,
        };
      }
      return config;
    },
    requestInterceptorCatch: (err) => {
      return err;
    },
    responseInterceptor: (res) => {
      return res;
    },
    responseInterceptorCatch: (err) => {
      return err;
    },
  },
});

export default anRequest;
