/*
 * @Description: 首页数据
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-10-31 17:42:11
 * @LastEditTime: 2023-01-30 11:18:33
 * @LastEditors: 安知鱼
 */
import {
  getHomeRandompost,
  getAllArticleInfo,
  getCardPostlist,
} from "@/services/modules/home";
import { defineStore } from "pinia";

import DefaultConfig from "@/utils/config";

const useHomeStore = defineStore("home", {
  state: () => ({
    homeRandompostInfo: {
      author: "",
      link: "",
      title: "",
    },
    allArticleInfo: {
      article_data: new Array(),
      statistical_data: null as any,
    },

    cardPostlist: {
      article_data: [],
      statistical_data: null,
    },
    currentArcitleNum: DefaultConfig.page_turning_number,

    // 数据加载完, 到底了
    isEnded: false,
  }),
  actions: {
    async fetchHomeRandompostData() {
      const res = await getHomeRandompost();
      this.homeRandompostInfo = res as any;
    },
    loadMoreArticle() {
      this.currentArcitleNum += DefaultConfig.page_turning_number;
      console.log(this.currentArcitleNum);
      console.log(this.allArticleInfo?.statistical_data);

      if (
        this.currentArcitleNum >=
        this.allArticleInfo?.statistical_data?.article_num
      ) {
        this.isEnded = true;
      }
    },
    async fetchAllArticleInfoData(rule: string) {
      const res = await getAllArticleInfo(rule);
      this.currentArcitleNum =
        res?.statistical_data?.article_num > DefaultConfig.page_default_number
          ? DefaultConfig.page_default_number
          : res?.statistical_data?.article_num;
      this.allArticleInfo = res;
    },
    fetchCardPostlistData(num = 5, link?: string) {
      return new Promise((resolve, reject) => {
        getCardPostlist(num, link)
          .then((res) => {
            this.cardPostlist = res;
            if (res.message === "not found") {
              resolve(404);
            } else {
              resolve(res);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});

export default useHomeStore;
