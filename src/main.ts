/*
 * @Description:
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-10-31 13:27:51
 * @LastEditTime: 2022-11-10 20:54:14
 * @LastEditors: 安知鱼
 */
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import "normalize.css";
import "./assets/main.css";
import "./assets/snackbar.css";
const app = createApp(App);

app.use(createPinia());
app.mount("#hexo-circle-of-friends-root");
