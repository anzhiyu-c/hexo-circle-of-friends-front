<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import useHomeStore from "@/stores/modules/home";
import { useloadDefaultImg } from "@/hooks";
import Snackbar from "node-snackbar";
// 定义props
const props = defineProps({
  itemData: {
    type: Array,
    default: () => [],
  },
  sort: {
    type: String,
    default: () => "created",
  },
});
const cardShow = ref(false);
// 从Store中获取数据
const homeStore = useHomeStore();
let { cardPostlist, currentArcitleNum, isEnded } = storeToRefs(
  homeStore
) as any;

function showCardAction(link: string) {
  const cardPostlist = homeStore.fetchCardPostlistData(5, link);
  cardPostlist.then((res) => {
    if (res === 404) {
      Snackbar.show({
        text: "未找到文章。",
        backgroundColor: "#ffc107",
        duration: 2000,
        pos: "top-center",
        showAction: false,
      });
    } else {
      cardShow.value = true;
    }
  });
}
</script>
<template>
  <div
    class="fish-pond-item"
    v-for="(item, index) in (props.itemData.slice(0,currentArcitleNum) as any)"
    :key="index + ''"
  >
    <div class="cf-article">
      <a
        class="cf-article-title"
        :href="item.link"
        target="_blank"
        rel="noopener nofollow"
        :data-title="item.title"
      >
        {{ item.title }}
      </a>
      <div class="cf-article-bottom no-lightbox flink-item-icon">
        <img
          class="cf-img-avatar avatar no-lightbox"
          :src="item.avatar"
          alt="avatar"
          @error="useloadDefaultImg($event)"
        />
        <span class="cf-article-author" @click="showCardAction(item.link)">{{
          item.author
        }}</span>
        <span class="cf-article-time">
          <span class="cf-time-created">
            <i class="far fa-calendar-alt"></i>
            {{ sort === "created" ? item.created : item.updated }}
          </span>
        </span>
      </div>
    </div>
  </div>

  <div class="cf-more-container">
    <div
      id="cf-more"
      class="cf-new-add"
      @click="homeStore.loadMoreArticle()"
      v-if="!isEnded"
    >
      <i class="fas fa-angle-double-down"></i>
    </div>
    <div v-else class="empty">------- 没有更多了喔 -------</div>
  </div>

  <div id="cf-overlay" :class="cardShow ? 'cf-show-now' : ''"></div>
  <div id="cf-overshow" :class="cardShow ? 'cf-show-now' : ''">
    <div class="cf-overshow-close" @click="cardShow = false"></div>
    <div class="cf-overshow">
      <div class="cf-overshow-head" v-if="cardShow">
        <img
          class="cf-img-avatar avatar"
          :src="cardPostlist?.statistical_data?.avatar"
          alt="avatar"
          @error="useloadDefaultImg($event)"
        />
        <a target="_blank" rel="noopener nofollow" href="https://bio-w.cn/">
          {{ cardPostlist?.statistical_data?.name }}
        </a>
      </div>
      <div class="cf-overshow-content" v-if="cardShow">
        <p v-for="(item, index) in cardPostlist?.article_data" :key="index">
          <a
            class="cf-article-title"
            :href="item.link"
            target="_blank"
            rel="noopener nofollow"
            :data-title="item.title"
            >{{ item.title }}</a
          ><span>{{ item.created }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
// 卡片css
.fish-pond-item {
  width: 25%;
  @media (max-width: 1280px) {
    width: 50%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  .cf-article {
    margin: 8px;
    border-radius: 8px;
    font-weight: bolder;
    overflow: hidden;
    transition: all 0.3s ease-out;
    position: relative;
    padding: 1rem;
    border: var(--style-border-always);
    height: 160px;
    display: flex;
    align-content: space-between;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: var(--anzhiyu-shadow-border);
    background: var(--anzhiyu-card-bg);
    &:hover {
      transition: 0.3s;
      border: var(--style-border-hover);
      box-shadow: var(--anzhiyu-shadow-main);
    }
    .cf-article-title {
      text-decoration: none;
      color: var(--anzhiyu-fontcolor);
      transition: 0.3s;
      font-weight: 500;
      position: relative;
      z-index: 2;
      width: 100%;
      letter-spacing: 1.5px;
      font-size: 18px;
      align-self: start;
      text-align: left;
      line-height: 21px;
      padding: 0;
      margin-bottom: 10px;
      transition: 0.3s;
      -webkit-line-clamp: 3;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      &:hover {
        color: var(--anzhiyu-lighttext);
      }
    }
    .cf-article-bottom {
      line-height: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      z-index: 1;
      .cf-img-avatar {
        display: inline-block;
        position: absolute;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin: 0 0 -4px;
        background: #fff;
        opacity: 0.2;
        z-index: 0;
        right: -20px;
        bottom: -20px;
        align-self: center;
        text-align: center;
        transition: 0.3s;
      }
      .cf-article-author {
        line-height: 1;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        z-index: 1;
        color: var(--anzhiyu-fontcolor);
        font-size: 0.7rem;
        background-color: var(--anzhiyu-gray-op);
        padding: 8px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        align-self: center;
        text-align: center;
        transition: 0.3s;
        &:hover {
          background: var(--anzhiyu-main);
          color: var(--anzhiyu-white);
        }
      }
      .cf-article-time {
        font-size: 12px;
        text-align: right;
        float: right;
        font-weight: 400;
        transition: 0.3s;
        margin-left: auto;
        z-index: 1;
        .cf-time-created,
        .cf-time-updated {
          display: inline-block;
          text-align: left;
          white-space: nowrap;
          i.far,
          i.fas {
            padding-right: 8px;
          }
        }
      }
    }
  }
}

.cf-more-container {
  width: 100%;
  // 底部区域css
  #cf-more {
    max-width: 810px;
    height: 30px;
    width: 40%;
    margin: auto;
    margin-top: 1rem;
    border-radius: 12px;
    font-weight: bolder;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      width: 60%;
      background: var(--anzhiyu-main);
      color: var(--anzhiyu-white);
      border: var(--style-border-hover);
      box-shadow: var(--anzhiyu-shadow-main);
    }
  }
}

#cf-more,
#cf-state {
  background: var(--anzhiyu-card-bg);
  color: var(--anzhiyu-fontcolor);
  border: var(--style-border);
  box-shadow: var(--anzhiyu-shadow-border);
}
// 遮罩css
#cf-overlay,
#cf-overshow {
  transition: 0.3s;
  position: fixed;
  width: 100%;
  height: 100%;
}
#cf-overlay {
  top: 0;
  left: 100%;
  background-color: rgba(255, 255, 255, 0.42);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  overflow-y: auto;
  pointer-events: all;
  z-index: 998;
}
#cf-overshow {
  bottom: 100%;
  left: 0;
  z-index: 999;
  transition: 0.3s;
  .cf-overshow-close {
    position: sticky;
    display: block;
    width: 100%;
    height: 100%;
  }
}
#cf-overlay.cf-show-now {
  left: 0;
}
#cf-overshow.cf-show-now {
  bottom: 0;
  transition: 0.3s;
}
.cf-overshow {
  text-align: center;
  border-radius: 20px;
  position: absolute;
  width: 320px;
  min-height: 170px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 12px 40px rgb(0 0 0 / 9%);
  background: var(--anzhiyu-theme);
  line-height: 2;
  p {
    margin: 0.3rem 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    span {
      z-index: 1;
      font-size: 12px;
      margin-left: auto;
      color: var(--anzhiyu-fontcolor);
      opacity: 0.4;
    }
    .cf-article-title {
      text-decoration: none;
      display: block;
      text-align: justify;
      position: relative;
      z-index: 2;
      font-size: 15px;
      line-height: 1.2;
      letter-spacing: normal;
      max-height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      display: box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: var(--anzhiyu-fontcolor);
      &:hover {
        color: var(--anzhiyu-theme);
      }
    }
  }
  .cf-overshow-head {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      object-fit: cover;
      max-height: 900px;
      max-width: 100%;
      background: #fff;
      width: 80px !important;
      height: 80px !important;
      border-radius: 50%;
      margin: 15px auto 0 !important;
      box-shadow: 0 12px 40px rgb(0 0 0 / 9%);
      transform: rotate(-360deg);
      transition: 0.8s;
    }
    a {
      color: var(--anzhiyu-white);
      display: block;
      text-align: center;
    }
  }
  .cf-overshow-content {
    padding: 10px 15px 10px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background: var(--anzhiyu-card-bg);
    display: flex;
    flex-direction: column;
    max-height: 70vh;
    overflow: scroll;
  }
}
.empty {
  width: 100%;
  color: var(--anzhiyu-gray);
  display: flex;
  justify-content: center;
  margin-top: 10px;
  font-size: 14px;
  opacity: 0.8;
}
</style>
