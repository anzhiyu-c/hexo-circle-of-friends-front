<script setup lang="ts">
function goLink(link: string, event: any) {
  let pjax = event.currentTarget.getAttribute("data-pjax-state");
  if (pjax) {
    pjax.loadUrl("/about/");
  } else {
    window.open("/about", "_self");
  }
}
</script>

<template>
  <div class="home_top">
    <div class="card-content">
      <div class="tips">友链</div>
      <span class="title">最新文章订阅</span>
      <div class="content-bottom">
        <div class="left">使用 友链朋友圈 订阅友链最新文章</div>
        <div class="right">
          <a class="button" @click="goLink('link', $event)">
            <i
              class="anzhiyufont anzhiyu-icon-angle-double-down"
              style="font-size: 1.5rem"
            ></i
            ><span class="banner-button-text">关于我</span></a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home_top {
  background: url(https://image.anzhiy.cn/adminuploads/1/2022/08/21/630249e2df20f.jpg)
    left 28% / cover no-repeat;
  border-radius: 15px;
  height: 19rem;
  color: var(--anzhiyu-white);
  overflow: hidden;
  margin-top: 0px;
  width: 100%;
  padding: 1rem 2rem;
  .card-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .tips {
      opacity: 0.8;
      font-size: 0.6rem;
      margin-bottom: 0.5rem;
    }
    .title {
      font-size: 36px;
      font-weight: 700;
      line-height: 1;
      margin-bottom: 0.5rem;
    }
    .content-bottom {
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .right {
        .button {
          height: 40px;
          width: 124px;
          border-radius: 20px;
          justify-content: center;
          background: var(--anzhiyu-card-bg);
          display: flex;
          align-items: center;
          transition: 0.3s;
          cursor: pointer;
          font-weight: 500;
          color: var(--anzhiyu-fontcolor);
          padding: 0 0.2em;
          text-decoration: none;
          i {
            margin-right: 8px;
          }

          &:hover {
            color: var(--anzhiyu-white);
            background: var(--anzhiyu-theme);
            box-shadow: var(--anzhiyu-shadow-lightblack);
          }
        }
      }
    }
  }
}
</style>
