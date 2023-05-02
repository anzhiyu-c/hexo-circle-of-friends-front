<!--
 * @Description: 
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-11-02 10:55:58
 * @LastEditTime: 2022-11-02 11:01:36
 * @LastEditors: 安知鱼
-->

<script setup lang="ts"></script>

<template>
  <div class="manage-panel-main-about">
    <p>适配友链朋友圈5.0</p>
    <p>
      Powered By：<a href="https://www.yyyzyyyz.cn/" target="_blank">yyyz</a>
    </p>
    <hr />
    鸣谢：
    <p>
      朋友圈logo、样式设计：
      <a href="https://blog.zhheo.com/" target="_blank">Heo </a>
    </p>
    <p>
      原版样式基于：<a href="https://immmmm.com/" target="_blank">林木木</a>
    </p>
    <p>
      前端疑难杂症解决：<a href="https://anzhiy.cn/" target="_blank">安知鱼</a>
    </p>
    <p>
      组件库：<a href="https://element-plus.gitee.io/zh-CN/" target="_blank"
        >Element Plus</a
      >
    </p>
  </div>
</template>

<style scoped lang="less">
.manage-panel-main-about {
  a {
    text-decoration: none;
    border-bottom: 2px solid var(--anzhiyu-lighttext) !important;
    color: var(--anzhiyu-fontcolor);
    font-weight: 700;
    padding: 0 4px;
    &:hover {
      border-bottom: 2px solid var(--anzhiyu-none);
      color: var(--anzhiyu-white);
      background: var(--anzhiyu-main);
      border-radius: 4px;
      box-shadow: var(--anzhiyu-shadow-main);
    }
  }
}
</style>
