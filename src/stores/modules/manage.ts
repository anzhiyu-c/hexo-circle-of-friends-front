/*
 * @Description: 管理面板状态store
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-11-01 19:26:55
 * @LastEditTime: 2023-02-01 13:30:17
 * @LastEditors: 安知鱼
 */
import { manageLogin } from "@/services/modules/manage";
import { defineStore } from "pinia";
import Cache from "@/utils/cache";
import { useSnackbar } from "@/hooks";

const useManageStore = defineStore("manage", {
  state: () => ({
    name: "anzhiyu",
    // 管理面板登录状态
    loginStatus: false,
    // 管理面板是否显示
    managePanelShow: false,
  }),
  actions: {
    async fetchManageLogin(password: string) {
      const res = await manageLogin(password);
      console.log(res);
      if (res.code === 200) {
        Cache.setCache("fcircle-token", res.token);
        this.loginStatus = true;
      } else {
        useSnackbar("登录失败，请重试！", 3000);
      }
    },
    managePanelShowSwitch() {
      this.managePanelShow = !this.managePanelShow;
    },
    managePanelNoLogin() {
      this.loginStatus = false;
    },
  },
});

export default useManageStore;
