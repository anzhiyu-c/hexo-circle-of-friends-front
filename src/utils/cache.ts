/*
 * @Description: 处理缓存工具文件
 * @Author: 安知鱼
 * @Email: 2268025923@qq.com
 * @Date: 2022-11-01 09:44:27
 * @LastEditTime: 2023-01-30 11:50:42
 * @LastEditors: 安知鱼
 */

class Cache {
  setCache(key: string, value: any, isSessionStorage?: boolean) {
    if (isSessionStorage) {
      if (value) {
        window.sessionStorage.setItem(key, JSON.stringify(value));
      }
    } else {
      // 默认使用localStorage
      if (value) {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    }
  }

  getCache(key: string, isSessionStorage?: boolean) {
    if (isSessionStorage) {
      const value = window.sessionStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
    } else {
      const value = window.localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
    }
  }

  deleteCache(key: string, isSessionStorage?: boolean) {
    if (isSessionStorage) {
      window.sessionStorage.removeItem(key);
    } else {
      window.localStorage.removeItem(key);
    }
  }

  clearCache() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
}

export default new Cache();
