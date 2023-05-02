/*
 * @Description: 管理面板自定义友链store
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-11-01 19:26:55
 * @LastEditTime: 2022-11-04 18:22:34
 * @LastEditors: 安知鱼
 */
import { saveManageCurrentSettings } from "@/services/modules/manage";
import useSettingStore from "./setting";
import { defineStore } from "pinia";
import { useSnackbar } from "@/hooks";

const useLinksStore = defineStore("links", {
  state: () => ({
    jsonList: new Array(),
    enable: false,
    jsonApi: "",
  }),
  actions: {
    /**
     * 获取面板自定义友链
     */
    fetchGetManageLinks() {
      const settingStore = useSettingStore();
      const SETTINGS_FRIENDS_LINKS =
        settingStore.currentSettings.SETTINGS_FRIENDS_LINKS;

      for (let i = 0; i < SETTINGS_FRIENDS_LINKS.list.length; i++) {
        // 读取远程配置，添加现有的配置项友链
        const item = SETTINGS_FRIENDS_LINKS.list[i];
        if (item.length === 3) {
          // 未携带suffix
          this.jsonList.push([item[0], item[1], item[2]]);
        } else if (item.length === 4) {
          // 携带suffix
          this.jsonList.push([item[0], item[1], item[2], item[3]]);
        }
      }
    },
    /**
     * 新增一条配置项友链
     */
    addLink() {
      this.jsonList.push(["", "", ""]);
    },
    // 删除一条配置项友链
    delLink(index: number) {
      this.jsonList.splice(index, 1);
    },
    /**
     * 保存面板自定义友链
     */
    async fetchSaveManageLinks() {
      const res = await saveManageCurrentSettings("update_settings", {
        SETTINGS_FRIENDS_LINKS: {
          list: this.jsonList,
          enable: this.enable,
          jsonApi: this.jsonApi,
        },
      });
      if (res.code === 200) {
        useSnackbar("保存自定义友链配置成功！", 3000);
      }
    },
  },
});

export default useLinksStore;
