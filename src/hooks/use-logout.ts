/*
 * @Description: 退出登录
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2023-02-01 13:19:04
 * @LastEditTime: 2023-02-01 13:31:07
 * @LastEditors: 安知鱼
 */

import useManageStore from "@/stores/modules/manage";

export function useLogout() {
  const manageStore = useManageStore();
  localStorage.removeItem("fcircle-token");
  // manageStore.managePanelShowSwitch();
  manageStore.managePanelNoLogin();
}
