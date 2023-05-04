<!--
 * @Description: 文章列表
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-11-01 09:28:25
 * @LastEditTime: 2023-05-02 13:23:44
 * @LastEditors: 安知鱼
-->
<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import useHomeStore from "@/stores/modules/home";
import FishPondItem from "./components/fish-pond-item.vue";
import FishFooter from "./components/fish-footer.vue";
// 从Store中获取数据
const homeStore = useHomeStore();
let sort = ref("created");
homeStore.fetchAllArticleInfoData(sort.value);
const { allArticleInfo } = storeToRefs(homeStore);

const changeSort = (val: any) => {
  sort.value = val;
  homeStore.fetchAllArticleInfoData(sort.value);
};
</script>
<template>
  <div class="fish-pond">
    <div class="title-h2-a">
      <div class="title-h2-a-left">
        <h2>🐟 鱼塘</h2>
      </div>
    </div>
    <div class="cf-article-group">
      <template v-if="allArticleInfo.article_data.length > 0">
        <FishPondItem :itemData="allArticleInfo.article_data" :sort="sort" />
        <FishFooter
          :footerData="(allArticleInfo.statistical_data as any)"
          @changeSort="changeSort"
        />
      </template>
      <div class="empty-data" v-else>
        <el-empty :image-size="200" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.fish-pond {
  .empty-data {
    margin: 10px auto;
  }
}
.title-h2-a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  .title-h2-a-left {
    display: flex;
    align-items: center;
    h2 {
      padding-top: 0;
      margin: 0.6rem 0 0.6rem;
    }
  }
}

.cf-article-group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 -8px;
}
</style>
