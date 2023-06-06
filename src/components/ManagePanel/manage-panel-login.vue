<!--
 * @Description: 登录组件
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-11-01 19:18:49
 * @LastEditTime: 2023-06-06 23:54:41
 * @LastEditors: 安知鱼
-->

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Cache from "@/utils/cache";
import useManageStore from "@/stores/modules/manage";

const password = ref("");
const manageStore = useManageStore();

function login() {
  // 本地没有token，使用密码登录
  manageStore.fetchManageLogin(password.value);
}
function checkToken() {
  if (Cache.getCache("fcircle-token")) {
    console.log("有token");
    // 如果本地有缓存token，尝试直接使用token登录
  }
  console.log("未登录");
}
onMounted(() => {
  checkToken();
});
</script>

<template>
  <img
    src="https://npm.elemecdn.com/anzhiyu-theme-static@1.1.2/img/friends-login-logo.svg"
    alt="logo"
  />
  <h1 class="cf-manage-title">友链朋友圈管理面板</h1>
  <el-input
    class="cf-manage-input"
    size="large"
    v-model="password"
    type="password"
    clearable
    show-password
    placeholder="请输入密码"
  />
  <div class="cf-tip">首次登录输入的密码将成为你的管理密码。</div>
  <el-button @click="login" class="cf-manage-login-btn" round
    >立即登录
  </el-button>
</template>

<style scoped lang="less">
.cf-tip {
  opacity: 0.5;
  font-size: 14px;
  margin: 10px;
}
.cf-manage-login-btn {
  margin: 10px;
}
</style>
