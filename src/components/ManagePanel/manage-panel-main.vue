<!--
 * @Description: 管理面板内部主体区域
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-11-01 19:48:57
 * @LastEditTime: 2023-02-01 13:21:29
 * @LastEditors: 安知鱼
-->
<script setup lang="ts">
import ManagePanelMainAbout from "./components/manage-panel-main-about.vue";
import ManagePanelMainConfig from "./components/manage-panel-main-config.vue";
import ManagePanelMainEnvs from "./components/manage-panel-main-envs.vue";
import ManagePanelMainLinks from "./components/manage-panel-main-links.vue";
import ManagePanelMainSwitchdb from "./components/manage-panel-main-switchdb.vue";
import ManagePanelMainStatus from "./components/manage-panel-main-status.vue";

import { useLogout } from "@/hooks";

// 退出登录
const logout = function () {
  useLogout();
};
</script>

<template>
  <div class="manage-panel-main">
    <div class="top-info">
      <h2 class="title">友链朋友圈管理面板</h2>
      <el-button @click="logout" class="cf-manage-exit-btn" round
        >退出登录</el-button
      >
    </div>

    <el-tabs type="border-card">
      <el-tab-pane label="配置管理">
        <ManagePanelMainConfig />
      </el-tab-pane>
      <el-tab-pane label="环境变量管理" lazy>
        <ManagePanelMainEnvs />
      </el-tab-pane>
      <el-tab-pane label="自定义友链管理" lazy>
        <ManagePanelMainLinks />
      </el-tab-pane>
      <el-tab-pane label="数据库管理" lazy>
        <ManagePanelMainSwitchdb />
      </el-tab-pane>
      <el-tab-pane label="状态监控" lazy>
        <ManagePanelMainStatus />
      </el-tab-pane>
      <el-tab-pane label="关于">
        <ManagePanelMainAbout />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="less">
.manage-panel-main {
  height: 100%;
  line-height: 1;
  .top-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      margin: 10px 0;
      text-align: left;
    }
  }
}

:deep(.anzhiyu-tabs__content) {
  overflow: scroll;
  height: calc(100% - 39px);
}
:deep(.anzhiyu-tabs) {
  height: 95%;
}
</style>
