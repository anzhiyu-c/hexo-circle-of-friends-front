/*
 * @Description: 加载默认图片
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-11-01 13:42:45
 * @LastEditTime: 2022-11-01 13:45:51
 * @LastEditors: 安知鱼
 */
import DefaultConfig from "@/utils/config";

export function useloadDefaultImg(event: any) {
  // 当图片出错时，用默认图片替换
  event.target.setAttribute("src", DefaultConfig.error_img);
}
