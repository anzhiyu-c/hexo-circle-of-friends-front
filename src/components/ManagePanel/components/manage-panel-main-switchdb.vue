<!--
 * @Description: 数据库管理面板
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-11-03 18:56:23
 * @LastEditTime: 2022-11-04 18:16:20
 * @LastEditors: 安知鱼
-->

<script setup lang="ts">
import useSettingStore from "@/stores/modules/setting";
import useSwitchdbStore from "@/stores/modules/switchdb";
import { storeToRefs } from "pinia";
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const settingStore = useSettingStore();
const switchdbStore = useSwitchdbStore();

let { currentSettings } = storeToRefs(settingStore) as any;
let { sqliteEnv, leancloudEnv, mysqlEnv, mongodbEnv } = storeToRefs(
  switchdbStore
) as any;

const submitSave = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      switchdbStore.fetchSaveManageSwitchdb(currentSettings.value.DATABASE);
    } else {
      console.log("error submit!", fields);
    }
  });
};
const refresh = () => {
  settingStore.fetchGetManageCurrentSettings();
};
const resetDb = () => {
  switchdbStore.fetchResetDb();
};

// 当前配置中选择的数据库（无响应式）
const currentDatabase = switchdbStore.getCurrentDatabase();

// 四个form表单实例
const sqliteFormRef = ref<FormInstance>();
const leancloudFormRef = ref<FormInstance>();
const mysqlFormRef = ref<FormInstance>();
const mongodbFormRef = ref<FormInstance>();

// sqlite校验规则
const sqliteRules = reactive<FormRules>({
  "GH_NAME.value": [
    { required: true, message: "请输入GH_NAME变量。", trigger: "blur" },
  ],
  "GH_EMAIL.value": [
    {
      required: true,
      message: "请输入GH_EMAIL变量。",
      trigger: "blur",
    },
  ],
  "GH_TOKEN.value": [
    {
      required: true,
      message: "请输入GH_TOKEN变量。",
      trigger: "blur",
    },
  ],
});
// leancloud校验规则
const leancloudRules = reactive<FormRules>({
  "APPKEY.value": [
    { required: true, message: "请输入APPKEY变量。", trigger: "blur" },
  ],
  "APPID.value": [
    {
      required: true,
      message: "请输入APPID变量。",
      trigger: "blur",
    },
  ],
});
// mysql校验规则
const mysqlRules = reactive<FormRules>({
  "MYSQL_USERNAME.value": [
    { required: true, message: "请输入MYSQL_USERNAME变量。", trigger: "blur" },
  ],
  "MYSQL_PASSWORD.value": [
    {
      required: true,
      message: "请输入MYSQL_PASSWORD变量。",
      trigger: "change",
    },
  ],
  "MYSQL_IP.value": [
    {
      required: true,
      message: "请输入MYSQL_IP变量。",
      trigger: "blur",
    },
  ],
  "MYSQL_PORT.value": [
    {
      required: true,
      message: "请输入MYSQL_PORT变量。",
      trigger: "blur",
    },
  ],
  "MYSQL_DB.value": [
    {
      required: true,
      message: "请输入MYSQL_DB变量。",
      trigger: "blur",
    },
  ],
});
// mongodb校验规则
const mongodbRules = reactive<FormRules>({
  "MONGODB_URI.value": [
    { required: true, message: "请输入MONGODB_URI变量。", trigger: "blur" },
  ],
});
</script>

<template>
  <div class="manage-panel-main-switchdb">
    <el-alert
      title="当前使用数据库"
      type="success"
      :description="currentDatabase"
      show-icon
      center
      :closable="false"
    />
    <div class="cf-manage-tip">
      如需切换数据库，请配置对应环境变量，然后点击保存：
    </div>
    <el-radio-group v-model="currentSettings.DATABASE">
      <el-radio label="sqlite">sqlite</el-radio>
      <el-radio label="leancloud">leancloud</el-radio>
      <el-radio label="mysql">mysql</el-radio>
      <el-radio label="mongodb">mongodb</el-radio>
    </el-radio-group>
    <el-form
      v-if="currentSettings.DATABASE === 'sqlite'"
      :model="sqliteEnv"
      label-width="120px"
      ref="sqliteFormRef"
      :rules="sqliteRules"
    >
      <el-row v-for="(item, key, index) in sqliteEnv" :key="index">
        <el-col :span="22" :offset="2">
          <el-form-item :label="key + ''" :prop="key + '.value'">
            <el-input :placeholder="item.placeholder" v-model="item.value" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form
      v-if="currentSettings.DATABASE === 'leancloud'"
      :model="leancloudEnv"
      label-width="120px"
      ref="leancloudFormRef"
      :rules="leancloudRules"
    >
      <el-row v-for="(item, key, index) in leancloudEnv" :key="index">
        <el-col :span="22" :offset="2">
          <el-form-item :label="key + ''" :prop="key + '.value'">
            <el-input :placeholder="item.placeholder" v-model="item.value" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form
      v-if="currentSettings.DATABASE === 'mysql'"
      :model="mysqlEnv"
      label-width="120px"
      ref="mysqlFormRef"
      :rules="mysqlRules"
    >
      <el-row v-for="(item, key, index) in mysqlEnv" :key="index">
        <el-col :span="22" :offset="2">
          <el-form-item :label="key + ''" :prop="key + '.value'">
            <el-input :placeholder="item.placeholder" v-model="item.value" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form
      v-if="currentSettings.DATABASE === 'mongodb'"
      :model="mongodbEnv"
      label-width="120px"
      ref="mongodbFormRef"
      :rules="mongodbRules"
    >
      <el-row v-for="(item, key, index) in mongodbEnv" :key="index">
        <el-col :span="22" :offset="2">
          <el-form-item :label="key + ''" :prop="key + '.value'">
            <el-input :placeholder="item.placeholder" v-model="item.value" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row justify="center">
      <el-form-item class="Operation-btns">
        <el-button
          type="primary"
          @click="
            submitSave(
              currentSettings.DATABASE === 'sqlite'
                ? sqliteFormRef
                : currentSettings.DATABASE === 'leancloud'
                ? leancloudFormRef
                : currentSettings.DATABASE === 'mysql'
                ? mysqlFormRef
                : mongodbFormRef
            )
          "
          >保存并使用{{ currentSettings.DATABASE }}</el-button
        >
        <el-button type="primary" @click="resetDb"
          >重置{{ currentSettings.DATABASE }}</el-button
        >
        <el-button type="info" @click="refresh">刷新</el-button>
      </el-form-item>
    </el-row>
  </div>
</template>

<style scoped lang="less">
.cf-manage-tip {
  margin: 20px;
}
.Operation-btns .el-button {
  @media (max-width: 992px) {
    padding: 2px 8px;
    margin-left: 6px;
  }
  @media (max-width: 768px) {
    padding: 2px 5px;
    margin-left: 4px;
  }
}
</style>
