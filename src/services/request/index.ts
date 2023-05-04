/*
 * @Description: 封装axios
 * @Author: 安知鱼
 * @Email: 2268025923@qq.com
 * @Date: 2021-08-28 15:39:52
 * @LastEditTime: 2023-05-02 13:16:00
 * @LastEditors: 安知鱼
 */

import axios from "axios";
import type { AxiosInstance } from "axios";
import type { ANRequestInterceptors, ANRequestConfig } from "./type";

import { ElLoading } from "element-plus";

const DEAFULT_LOADING = false;

class ANRequest {
  instance: AxiosInstance;
  interceptors?: ANRequestInterceptors;
  showLoading: boolean;
  loading?: any;
  constructor(config: ANRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config);

    // 保存基本信息
    this.showLoading = config.showLoading ?? DEAFULT_LOADING;
    this.interceptors = config.interceptors;

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config: ANRequestConfig<any>) => {
        this.showLoading = config.showLoading ?? DEAFULT_LOADING;
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据....",
            background: "rgba(0, 0, 0, 0.5)",
          });
        }
        return config;
      },
      (err) => {
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (res: any) => {
        // 将loading移除
        this.loading?.close();
        const data = res.data;
        if (res?.response?.status === 401) {
          return 401;
        }
        if (data.code === "500") {
          console.log("请求失败~, 请打电话叫后端，锤他");
        } else {
          return data;
        }
      },
      (err) => {
        // 将loading移除
        this.loading?.close();
        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        // if (err.response.status === 404) {
        //   console.log("404的错误~");
        // }
        return err;
      }
    );
  }

  request<T = any>(config: ANRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING;

          // 3.将结果resolve返回出去
          resolve(res);
        })
        .catch((err) => {
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  get<T = any>(config: ANRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T = any>(config: ANRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }

  delete<T = any>(config: ANRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  patch<T = any>(config: ANRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }

  put<T = any>(config: ANRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PUT" });
  }
}

export default ANRequest;
