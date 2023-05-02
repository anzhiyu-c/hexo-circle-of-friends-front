<!--
 * @Description: 环境变量面板
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-11-03 08:53:55
 * @LastEditTime: 2022-11-04 22:50:33
 * @LastEditors: 安知鱼
-->
<script setup lang="ts">
import useSettingStore from "@/stores/modules/setting";
import useEnvsStore from "@/stores/modules/envs";
import { storeToRefs } from "pinia";
const settingStore = useSettingStore();
const envsStore = useEnvsStore();
let { currentSettings } = storeToRefs(settingStore) as any;
let { allEnv } = storeToRefs(envsStore) as any;
envsStore.fetchGetManageEnvs();

const submitSave = () => {
  envsStore.fetchSaveManageEnvs();
};
const refresh = () => {
  settingStore.fetchGetManageCurrentSettings();
  envsStore.fetchGetManageEnvs();
};
</script>
<template>
  <div class="manage-panel-main-envs">
    <el-alert
      title="当前部署方式"
      type="success"
      :description="currentSettings.DEPLOY_TYPE"
      show-icon
      center
      :closable="false"
    />
    <hr />
    <el-form :model="allEnv" label-width="auto">
      <el-row v-for="(item, key, index) in allEnv" :key="index">
        <el-col :span="22" :offset="2">
          <el-form-item :label="(key as any)">
            <el-input :placeholder="item.placeholder" v-model="item.value" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-form-item>
          <el-button type="primary" @click="submitSave">保存</el-button>
          <el-button type="info" @click="refresh">刷新</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<style scoped lang="less"></style>
