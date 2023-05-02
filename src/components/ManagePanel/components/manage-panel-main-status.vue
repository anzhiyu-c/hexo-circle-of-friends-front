<!--
 * @Description: 状态监控面板
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-11-04 13:28:11
 * @LastEditTime: 2022-11-04 14:32:19
 * @LastEditors: 安知鱼
-->

<script setup lang="ts">
import useStatusStore from "@/stores/modules/status";
import { storeToRefs } from "pinia";

const statusStore = useStatusStore();
const { status } = storeToRefs(statusStore) as any;

statusStore.fetchGetCrawlerStatus();
</script>

<template>
  <div class="manage-panel-main-status">
    <el-alert
      title="程序运行状态："
      type="success"
      show-icon
      center
      :closable="false"
    >
      <i
        v-if="status === '运行中'"
        :class="
          status === '运行中'
            ? 'fa-duotone fa-loader Rotation'
            : 'fa-duotone fa-loader'
        "
      ></i>
      {{ status }}
    </el-alert>
    <div class="btns">
      <el-button
        class="cf-manage-center-btn"
        type="primary"
        :disabled="status === '运行中'"
        :loading="status === '运行中'"
        @click="statusStore.fetchRunCrawler()"
        >立即运行爬虫
      </el-button>
      <el-button
        class="cf-manage-center-btn"
        type="primary"
        @click="statusStore.fetchGetCrawlerStatus(true)"
        >检测运行状态
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.btns {
  margin: 10px;
}
.fa-duotone {
  margin-right: 4px;
}
.Rotation {
  animation: Rotation 2s linear infinite;
}
@keyframes Rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
