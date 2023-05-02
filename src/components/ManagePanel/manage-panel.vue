<!--
 * @Description: 管理面板
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-11-01 16:40:21
 * @LastEditTime: 2022-12-22 13:53:06
 * @LastEditors: 安知鱼
-->
<template>
  <div class="manage-panel">
    <div class="manage-panel-container">
      <div class="close-btn" @click="manageStore.managePanelShowSwitch()">
        <i class="fas fa-circle-xmark"></i>
      </div>
      <ManagePanelMain v-if="loginStatus" />
      <ManagePanelLogin v-else />
    </div>

    <div
      class="cf-manage-overlay"
      @click="manageStore.managePanelShowSwitch()"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import Cache from "@/utils/cache";
import useManageStore from "@/stores/modules/manage";
import ManagePanelLogin from "./manage-panel-login.vue";
import ManagePanelMain from "./manage-panel-main.vue";
const manageStore = useManageStore();
let { loginStatus } = storeToRefs(manageStore) as any;

if (Cache.getCache("fcircle-token")) {
  loginStatus = true;
}
</script>

<style scoped lang="less">
.manage-panel {
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  justify-content: center;
  transition: 0.3s ease-out;
  flex-direction: column;
  align-items: center;
  .cf-manage-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: var(--anzhiyu-maskbgdeep);
    backdrop-filter: blur(10px);
    overflow-y: auto;
    pointer-events: all;
    z-index: -1;
  }
  .manage-panel-container {
    background: var(--anzhiyu-card-bg);
    border-radius: 12px;
    overflow: hidden;
    border: var(--style-border);
    box-shadow: var(--anzhiyu-shadow-border);
    padding: 40px;
    text-align: center;
    position: fixed;
    border-radius: 10px;
    width: 55%;
    height: 75%;
    z-index: 98;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    padding: 45px;
    @media (max-width: 1280px) {
      width: 70%;
    }
    @media (max-width: 992px) {
      width: 60%;
    }
    @media (max-width: 768px) {
      width: 98%;
      padding: 40px 10px;
    }
    .close-btn {
      width: 35px;
      height: 35px;
      position: fixed;
      right: 2%;
      top: 10px;
      font-size: 35px;
      color: var(--font-color);
      cursor: pointer;
      transition: 0.3s;
      display: flex;
      &:hover {
        color: var(--anzhiyu-main);
      }
    }
  }
}
</style>
