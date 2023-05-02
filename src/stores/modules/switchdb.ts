/*
 * @Description: 管理面板环境变量store
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-11-01 19:26:55
 * @LastEditTime: 2022-11-04 13:26:08
 * @LastEditors: 安知鱼
 */
import { saveManageCurrentSettings, resetDb } from "@/services/modules/manage";
import { isValidKey } from "@/utils/tools";
import useSettingStore from "./setting";
import useEnvsStore from "./envs";
import { defineStore } from "pinia";
import { useSnackbar } from "@/hooks";

const useSwitchdbStore = defineStore("switchdb", {
  state: () => ({
    // 当前数据库
    currentDatabase: "sqlite",
    // sqlite环境变量
    sqliteEnv: {
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
    },
    // leancloud环境变量
    leancloudEnv: {
      APPKEY: {
        value: "",
        placeholder: "leancloud的APPKEY",
      },
      APPID: {
        value: "",
        placeholder: "leancloud的APPID",
      },
    },
    // mysql环境变量
    mysqlEnv: {
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
    },
    // mongodb环境变量
    mongodbEnv: {
      MONGODB_URI: {
        value: "",
        placeholder: "mongodb连接URI",
      },
    },
  }),
  actions: {
    /**
     * 获取当前数据库
     */
    getCurrentDatabase() {
      // 初始化当前数据库名称
      const settingStore = useSettingStore();
      this.currentDatabase = settingStore.currentSettings.DATABASE;
      // 初始化当前数据库的环境变量
      const envsStore = useEnvsStore();
      envsStore.fetchGetManageEnvs();
      // 初始化sqliteEnv
      Object.keys(envsStore.allEnv).forEach((key) => {
        if (isValidKey(key, envsStore.allEnv)) {
          // 处理...
          envsStore.allEnv[key] =
            this.sqliteEnv[key] == undefined
              ? envsStore.allEnv[key]
              : this.sqliteEnv[key];
        }
      });
      // 初始化leancloudEnv
      Object.keys(envsStore.allEnv).forEach((key) => {
        if (isValidKey(key, envsStore.allEnv)) {
          // 处理...
          envsStore.allEnv[key] =
            this.leancloudEnv[key] == undefined
              ? envsStore.allEnv[key]
              : this.leancloudEnv[key];
        }
      });
      // 初始化sqliteEnv
      Object.keys(envsStore.allEnv).forEach((key) => {
        if (isValidKey(key, envsStore.allEnv)) {
          // 处理...
          envsStore.allEnv[key] =
            this.sqliteEnv[key] == undefined
              ? envsStore.allEnv[key]
              : this.sqliteEnv[key];
        }
      });
      // 初始化mysqlEnv
      Object.keys(envsStore.allEnv).forEach((key) => {
        if (isValidKey(key, envsStore.allEnv)) {
          // 处理...
          envsStore.allEnv[key] =
            this.mysqlEnv[key] == undefined
              ? envsStore.allEnv[key]
              : this.mysqlEnv[key];
        }
      });

      return this.currentDatabase;
    },
    /**
     * 保存面板数据库
     */
    async fetchSaveManageSwitchdb(STORAGE_TYPE: string) {
      const settingStore = useSettingStore();
      let url = "update_server_env";
      if (settingStore.currentSettings.DEPLOY_TYPE === "github") {
        url = "update_github_env";
      }
      let changeSetting = {};

      if (STORAGE_TYPE === "sqlite") {
        changeSetting = {
          GH_NAME: this.sqliteEnv.GH_NAME.value,
          GH_EMAIL: this.sqliteEnv.GH_EMAIL.value,
          GH_TOKEN: this.sqliteEnv.GH_TOKEN.value,
          STORAGE_TYPE,
        };
      } else if (STORAGE_TYPE === "leancloud") {
        changeSetting = {
          APPKEY: this.leancloudEnv.APPKEY.value,
          APPID: this.leancloudEnv.APPID.value,
          STORAGE_TYPE,
        };
      } else if (STORAGE_TYPE === "mysql") {
        changeSetting = {
          MYSQL_USERNAME: this.mysqlEnv.MYSQL_USERNAME.value,
          MYSQL_PASSWORD: this.mysqlEnv.MYSQL_PASSWORD.value,
          MYSQL_IP: this.mysqlEnv.MYSQL_IP.value,
          MYSQL_PORT: this.mysqlEnv.MYSQL_PORT.value,
          MYSQL_DB: this.mysqlEnv.MYSQL_DB.value,
          STORAGE_TYPE,
        };
      } else if (STORAGE_TYPE === "mongodb") {
        changeSetting = {
          MONGODB_URI: this.mongodbEnv.MONGODB_URI.value,
          STORAGE_TYPE,
        };
      }

      // 保存环境变量
      const res = await saveManageCurrentSettings(url, changeSetting);
      console.log(res);
      if (res.code === 200) {
        useSnackbar("保存环境变量配置成功！", 3000);
      }
    },
    /**
     * 重置数据库
     */
    async fetchResetDb() {
      const settingStore = useSettingStore();
      const res = await resetDb(settingStore.currentSettings);
      if (res.code === 200) {
        useSnackbar("保存环境变量配置成功！", 3000);
      }
    },
  },
});

export default useSwitchdbStore;
