/*
 * @Description: 管理面板api
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-11-01 19:28:57
 * @LastEditTime: 2022-11-04 13:39:38
 * @LastEditors: 安知鱼
 */
import AnRequest from "../index";

/**
 * 使用密码登录
 * @param password 密码
 * @returns
 */
export function manageLogin(password: string) {
  return AnRequest.post<any>({
    url: "login",
    data: {
      password,
    },
  });
}

/**
 * 获取当前面板设置
 * @returns
 */
export function getManageCurrentSettings() {
  return AnRequest.get<any>({
    url: "read_settings",
  });
}

/**
 * 保存面板设置
 * @param url 请求路径
 * @param currentSettings 修改后的当前面板设置
 * @returns
 */
export function saveManageCurrentSettings(url: string, currentSettings: any) {
  return AnRequest.put<any>({
    url: url,
    data: currentSettings,
  });
}

/**
 * 获取管理面板的环境变量
 * @returns
 */
export function getManageEnvs() {
  return AnRequest.get<any>({
    url: "read_envs",
  });
}

/**
 * 重置数据库
 * @param currentSettings 当前面板配置
 * @returns
 */
export function resetDb(currentSettings: any) {
  return AnRequest.put<any>({
    url: "db_reset",
    data: currentSettings,
  });
}

/**
 * 获取爬虫的运行状态
 * @returns
 */
export function getCrawlerStatus() {
  return AnRequest.get<any>({
    url: "crawler_status",
  });
}

/**
 * 运行爬虫
 * @returns
 */
export function runCrawler() {
  return AnRequest.get<any>({
    url: "run_crawl_now",
  });
}
