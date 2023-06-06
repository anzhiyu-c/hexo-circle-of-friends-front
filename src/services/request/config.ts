/*
 * @Description:
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-10-31 17:59:28
 * @LastEditTime: 2023-06-06 23:50:37
 * @LastEditors: 安知鱼
 */
let BASE_URL: string;
const TIME_OUT = 10000;
import DefaultConfig from "@/utils/config";
if (import.meta.env.MODE === "development") {
  // BASE_URL = "https://friends.anheyu.com/"; 开发环境
  BASE_URL = DefaultConfig.private_api_url;
} else if (import.meta.env.MODE === "production") {
  // BASE_URL = "https://friends.anheyu.com/"; 生产环境
  BASE_URL = DefaultConfig.public_api_url;
}

export { BASE_URL, TIME_OUT };
