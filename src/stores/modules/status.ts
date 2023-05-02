/*
 * @Description: 管理面板环境变量store
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-11-01 19:26:55
 * @LastEditTime: 2022-11-04 14:14:43
 * @LastEditors: 安知鱼
 */
import { defineStore } from "pinia";
import { useSnackbar } from "@/hooks";
import { getCrawlerStatus, runCrawler } from "@/services/modules/manage";

const useStatusStore = defineStore("status", {
  state: () => ({
    status: "未知",
    timer: null as any,
  }),
  actions: {
    /**
     * 查看爬虫运行状态
     */
    async fetchGetCrawlerStatus(isHandle = false) {
      if (this.timer) clearInterval(this.timer);
      if (isHandle) {
        useSnackbar("正在检查运行状态...");
      }
      const res = await getCrawlerStatus();
      if (res.code === 200) {
        console.log(res);

        if (res.status !== "运行中" && res.status !== "未运行") {
          this.status = "未知";
        } else {
          this.status = res.status;
          if (isHandle) {
            useSnackbar(`运行状态为: ${this.status}`);
          }
        }

        if (this.status === "运行中") {
          this.timer = setInterval(() => {
            console.log(1);
            this.fetchGetCrawlerStatus();
          }, 5000);
        }
      }
    },

    /**
     * 运行爬虫
     */
    async fetchRunCrawler() {
      const res = await runCrawler();
      if (res.code === 200) {
        console.log(res);
        useSnackbar("✅" + res.message);
        // 状态改为运行中，检查爬虫的运行状态
        this.status = "运行中";
        setTimeout(this.fetchGetCrawlerStatus, 5000);
        this.fetchGetCrawlerStatus();
      } else {
        useSnackbar("❌" + res.message);
      }
    },
  },
});

export default useStatusStore;
