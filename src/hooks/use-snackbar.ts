/*
 * @Description: 使用弹窗消息
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-11-01 21:11:58
 * @LastEditTime: 2022-11-01 21:13:18
 * @LastEditors: 安知鱼
 */
import Snackbar from "node-snackbar";

export function useSnackbar(text: string, duration = 2000) {
  Snackbar.show({
    text: text,
    duration: duration,
    pos: "top-center",
    showAction: false,
  });
}
