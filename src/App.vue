<!--
 * @Description: APP
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-10-31 13:27:51
 * @LastEditTime: 2023-05-02 13:18:48
 * @LastEditors: 安知鱼
-->
<script setup lang="ts">
import { storeToRefs } from "pinia";
import useManageStore from "@/stores/modules/manage";
// import HomeTop from "./components/Home/home-top.vue";
// import RandomPost from "./components/Home/random-post.vue";
import FishPond from "./components/Home/fish-pond.vue";
import ManagePanel from "./components/ManagePanel/manage-panel.vue";

// 从Store中获取数据
const manageStore = useManageStore();
const { managePanelShow } = storeToRefs(manageStore);
</script>

<template>
  <!-- 命名空间防止elment样式冲突 -->
  <el-config-provider namespace="anzhiyu">
    <main class="fcircle_page">
      <!-- <HomeTop />
      <RandomPost /> -->
      <FishPond />

      <Transition name="anzhiyu">
        <ManagePanel v-if="managePanelShow" />
      </Transition>
    </main>
  </el-config-provider>
</template>

<style scoped>
.fcircle_page {
  display: flex;
  flex-direction: column;
  flex: 1 auto;
  margin: 0 auto;
  width: 100%;
  max-width: 1450px;
  overflow: hidden;
}
.anzhiyu-enter-active,
.anzhiyu-leave-active {
  transition: all 0.3s;
}

.anzhiyu-enter-from,
.anzhiyu-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>
