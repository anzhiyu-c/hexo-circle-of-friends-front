/*
 * @Description:
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-10-31 17:59:28
 * @LastEditTime: 2022-11-04 14:58:08
 * @LastEditors: 安知鱼
 */
import AnRequest from "../index";
import type { IfetchHomeRandompostData } from "../type";

export function getHomeRandompost() {
  return AnRequest.get<IfetchHomeRandompostData>({
    url: "randompost",
  });
}

export function getAllArticleInfo(rule = "created") {
  return AnRequest.get({
    url: "all?rule=" + rule,
  });
}

export function getCardPostlist(num: number, link?: string) {
  return AnRequest.get({
    url: `post?num=${num}&link=${link}`,
    params: {},
  });
}
