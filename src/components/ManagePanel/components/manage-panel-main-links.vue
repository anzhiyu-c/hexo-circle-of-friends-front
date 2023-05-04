<!--
 * @Description: 自定义友链管理面板
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-11-03 15:31:38
 * @LastEditTime: 2023-05-02 13:06:27
 * @LastEditors: 安知鱼
-->

<script setup lang="ts">
import { onUnmounted } from "vue";
import useSettingStore from "@/stores/modules/setting";
import useLinksStore from "@/stores/modules/links";
import { storeToRefs } from "pinia";

const settingStore = useSettingStore();
const linksStore = useLinksStore();
const submitSave = () => {
  linksStore.fetchSaveManageLinks();
};
const refresh = () => {
  settingStore.fetchGetManageCurrentSettings();
};

let { jsonList, enable, jsonApi } = storeToRefs(linksStore) as any;
linksStore.fetchGetManageLinks();
onUnmounted(() => {
  linksStore.$reset();
});
</script>

<template>
  <div class="manage-panel-main-links">
    <el-form-item label="当前自定义友链状态">
      <el-switch v-model="enable" />
    </el-form-item>
    <el-form label-width="auto">
      <div v-if="enable">
        <el-col :span="24">
          <el-form-item label="json友链地址" label-width="auto">
            <el-input
              placeholder="可以是网络地址，也可以是路径（私有部署），示例：https://blogroll.ccknbc.cc/fcircle.json 或 /home/data/fcircle/friends.json"
              v-model="jsonApi"
              type="textarea"
              :rows="2"
            />
          </el-form-item>
        </el-col>
        <el-row>
          <el-form-item label="点击添加一条友链" label-width="auto">
          </el-form-item>
          <el-col :span="2">
            <el-button circle @click="linksStore.addLink">
              <i class="anzhiyufont anzhiyu-icon-circle-plus"></i>
            </el-button>
          </el-col>
        </el-row>
        <el-row v-for="(value, index) in jsonList" :key="index">
          <el-col :span="6">
            <el-form-item label="名称" label-width="50px">
              <el-input v-model="value[0]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="主页" label-width="50px">
              <el-input v-model="value[1]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="头像" label-width="50px">
              <el-input v-model="value[2]" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="后缀" label-width="50px">
              <el-input v-model="value[3]" />
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-button circle @click="linksStore.delLink(index)">
              <i class="anzhiyu-icon-circle-minus"></i>
            </el-button>
          </el-col>
        </el-row>
      </div>
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
