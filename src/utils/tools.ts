/*
 * @Description: 工具函数
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-10-31 16:13:44
 * @LastEditTime: 2022-11-03 22:08:03
 * @LastEditors: 安知鱼
 */

export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object;
}
