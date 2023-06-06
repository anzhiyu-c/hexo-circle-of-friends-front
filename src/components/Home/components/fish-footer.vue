<!--
 * @Description: 
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-11-01 14:54:16
 * @LastEditTime: 2022-11-02 19:01:32
 * @LastEditors: 安知鱼
-->
<script setup lang="ts">
import { ref } from "vue";
import useManageStore from "@/stores/modules/manage";
// 定义props
const props = defineProps({
  footerData: {
    type: Object,
    default: () => {},
  },
});
// 定义emit
const emit = defineEmits(["changeSort"]);
const manageStore = useManageStore();
const sort = ref("created");
function changeSort(val: any) {
  sort.value = val;
  emit("changeSort", sort.value);
}
</script>
<template>
  <div class="fish-footer">
    <div id="cf-footer" class="cf-new-add">
      <span id="cf-version-up" onclick="checkVersion()"></span>
      <div>
        Powered by
        <a
          href="https://github.com/Rock-Candy-Tea/hexo-circle-of-friends"
          target="_blank"
          >FriendCircle</a
        >
      </div>
      <div>
        Design by
        <a href="https://zhheo.com/" target="_blank">Heo</a>
      </div>
      <div>
        FrontEnd by
        <a href="https://blog.anheyu.com/" target="_blank">AnZhiYu</a>
      </div>
      <div id="cf-footer-info">
        <div class="cf-data-friends">
          <span class="cf-label">订阅</span
          ><span class="cf-message">{{ props.footerData?.friends_num }}</span>
        </div>
        <div class="cf-data-active">
          <span class="cf-label">活跃</span
          ><span class="cf-message">{{ props.footerData?.active_num }}</span>
        </div>
        <div class="cf-data-article">
          <span class="cf-label">日志</span
          ><span class="cf-message">{{ props.footerData?.article_num }}</span>
        </div>
      </div>
      <div class="setting-info">
        <span class="cf-data-lastupdated"
          >更新于：{{ props.footerData?.last_updated_time }}</span
        >
        <span
          class="cf-setting-btn"
          @click="manageStore.managePanelShowSwitch()"
          >设置</span
        >
      </div>
      <el-switch
        v-model="sort"
        inactive-color="var(--anzhiyu-main)"
        active-value="created"
        inactive-value="updated"
        inline-prompt
        active-text="创建时间"
        inactive-text="更新时间"
        size="large"
        @change="changeSort"
      />
    </div>
    <div id="cf-overlay" class="cf-new-add" onclick="closeShow()"></div>
    <div id="cf-overshow" class="cf-new-add"></div>
  </div>
</template>

<style scoped lang="less">
.fish-footer {
  line-height: 2;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 0.5rem;
  align-items: flex-end;
  color: var(--anzhiyu-secondtext);
  margin-right: 8px;
  margin-bottom: 8px;
  text-align: right;
  font-size: 13px;
  #cf-footer {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 0.5rem;
    align-items: flex-end;
    color: var(--anzhiyu-secondtext);
    margin-right: 8px;
    margin-bottom: 8px;
    text-align: right;
    font-size: 13px;
  }
  #cf-footer-info {
    display: flex;
    div {
      margin-left: 0.5rem;
    }
  }
  a {
    text-decoration: none;
    line-height: 1.3;
    color: var(--anzhiyu-fontcolor);
    transition: 0.3s;
  }
  .setting-info {
    display: flex;
    align-items: center;
    .cf-setting-btn {
      color: var(--anzhiyu-fontcolor);
      cursor: pointer;
      transition: 0.3s;
      margin-left: 8px;
      &:hover {
        color: var(--anzhiyu-lighttext);
      }
    }
  }
}
</style>
