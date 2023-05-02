/*
 * @Description: 管理面板环境变量store
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-11-01 19:26:55
 * @LastEditTime: 2023-02-01 13:25:43
 * @LastEditors: 安知鱼
 */
import {
  getManageEnvs,
  saveManageCurrentSettings,
} from "@/services/modules/manage";
import useSettingStore from "./setting";
import { defineStore } from "pinia";
import { useSnackbar, useLogout } from "@/hooks";

const useEnvsStore = defineStore("envs", {
  state: () => ({
    // 环境变量配置
    allEnv: {
      PROXY: {
        value: "",
        placeholder: "http代理",
      },
      APPKEY: {
        value: "",
        placeholder: "leancloud的APPKEY",
      },
      APPID: {
        value: "",
        placeholder: "leancloud的APPID",
      },
      MYSQL_USERNAME: {
        value: "",
        placeholder: "mysql用户名",
      },
      MYSQL_PASSWORD: {
        value: "",
        placeholder: "mysql密码",
      },
      MYSQL_IP: {
        value: "",
        placeholder: "mysql ip地址",
      },
      MYSQL_PORT: {
        value: "",
        placeholder: "mysql端口",
      },
      MYSQL_DB: {
        value: "",
        placeholder: "mysql 数据库名称",
      },
      GH_NAME: {
        value: "",
        placeholder: "github name",
      },
      GH_EMAIL: {
        value: "",
        placeholder: "github email",
      },
      GH_TOKEN: {
        value: "",
        placeholder: "github access token",
      },
      MONGODB_URI: {
        value: "",
        placeholder: "mongodb连接URI",
      },
    },
  }),
  actions: {
    /**
     * 获取面板环境变量
     */
    async fetchGetManageEnvs() {
      const settingStore = useSettingStore();
      const DEPLOY_TYPE = settingStore.currentSettings.DEPLOY_TYPE;
      const allEnv: any = this.allEnv;
      if (DEPLOY_TYPE === "github") {
        allEnv.STORAGE_TYPE = {
          value: "",
          placeholder: "存储方式",
        };
        allEnv["VERCEL_ACCESS_TOKEN"] = {
          value: "",
          placeholder: "vercel访问令牌",
        };
      } else if (DEPLOY_TYPE === "server") {
        allEnv["EXPOSE_PORT"] = {
          value: "",
          placeholder: "api端口，默认：8000",
        };
        allEnv["RUN_PER_HOURS"] = {
          value: "",
          placeholder: "爬虫运行小时间隔，默认：6",
        };
      } else {
        // docker 部署
        allEnv["RUN_PER_HOURS"] = {
          value: "",
          placeholder: "爬虫运行小时间隔，默认：6",
        };
      }
      const res = await getManageEnvs();
      console.log(res);

      if (res.code === 200) {
        Object.keys(res.current_envs).forEach((key) => {
          const _this = this as any;
          const allEnv = _this.allEnv[key];
          if (allEnv && res.current_envs[key] !== null) {
            allEnv.value = res.current_envs[key];
          }
        });
      } else {
        // 退出登录
        useLogout();
        useSnackbar("获取配置失败，请重试！", 3000);
      }
    },
    /**
     * 保存面板环境变量
     */
    async fetchSaveManageEnvs() {
      const settingStore = useSettingStore();

      let url = "update_server_env";
      if (settingStore.currentSettings.DEPLOY_TYPE === "github") {
        url = "update_github_env";
      }
      const allEnv: any = {};
      Object.keys(this.allEnv).forEach((key) => {
        const _this = this as any;
        allEnv[key] = _this.allEnv[key].value;
      });

      const res = await saveManageCurrentSettings(url, allEnv);
      console.log(res);

      if (res.code === 200) {
        useSnackbar("保存环境变量配置成功！", 3000);
      } else if (res === 401) {
        useLogout();
        useSnackbar("token验证失败，请重新登录！", 3000);
      }
    },
  },
});

export default useEnvsStore;
