/*
 * @Description: 管理面板配置store
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-11-01 19:26:55
 * @LastEditTime: 2023-02-01 13:27:17
 * @LastEditors: 安知鱼
 */
import {
  getManageCurrentSettings,
  saveManageCurrentSettings,
} from "@/services/modules/manage";
import { defineStore } from "pinia";
import { useSnackbar, useLogout } from "@/hooks";

const useSettingStore = defineStore("setting", {
  state: () => ({
    // 管理面板配置信息 todo 暂存http代理配置 http代理更改env环境
    currentSettings: {
      LINK: [
        {
          link: "https://anzhiy.cn/link/",
          theme: "common2",
        },
      ],
      BLOCK_SITE: [""],
      OUTDATE_CLEAN: "",
      HTTP_PROXY: "",
      DEPLOY_TYPE: "",
      SETTINGS_FRIENDS_LINKS: {
        enable: false,
        json_api: "",
        list: new Array(),
      },
      DATABASE: "sqlite",
    },
  }),
  actions: {
    /**
     * 请求获取面板配置
     */
    async fetchGetManageCurrentSettings() {
      console.log("fetchGetManageCurrentSettings");

      const res = await getManageCurrentSettings();
      if (res.code === 200) {
        this.currentSettings = res.current_settings;
        if (res.current_settings.BLOCK_SITE.length === 0) {
          this.currentSettings.BLOCK_SITE = [""];
        }
      } else if (res === 401) {
        // 退出登录
        useLogout();
        useSnackbar("token验证失败，请重新登录!", 3000);
      } else {
        // 退出登录
        useLogout();
        useSnackbar("获取配置失败，请重试！", 3000);
      }
    },
    /**
     * 添加一条Link项
     */
    addLink() {
      this.currentSettings.LINK.push({
        link: "",
        theme: "",
      });
    },
    /**
     * 删除一条Link项
     */
    delLink(index: number) {
      this.currentSettings.LINK.splice(index, 1);
    },
    /**
     * 添加一条BLOCK_SITE项
     */
    addBlocksite() {
      this.currentSettings.BLOCK_SITE.push("");
    },
    /**
     * 删除一条BLOCK_SITE项
     */
    delBlocksite(index: number) {
      this.currentSettings.BLOCK_SITE.splice(index, 1);
    },
    /**
     * 保存面板配置
     */
    async fetchSaveManageCurrentSettings() {
      const res = await saveManageCurrentSettings(
        "update_settings",
        this.currentSettings
      );
      if (res.code === 200) {
        useSnackbar("保存配置成功！", 3000);
      } else if (res === 401) {
        useLogout();
        useSnackbar("token验证失败，请重新登录！", 3000);
      }
    },
  },
});

export default useSettingStore;
