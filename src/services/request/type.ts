/*
 * @Description: 类型文件
 * @Author: 安知鱼
 * @Email: 2268025923@qq.com
 * @Date: 2021-08-28 16:12:53
 * @LastEditTime: 2023-02-01 13:08:35
 * @LastEditors: 安知鱼
 */
import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface ANRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

export interface ANRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ANRequestInterceptors<T>;
  showLoading?: boolean;
}
