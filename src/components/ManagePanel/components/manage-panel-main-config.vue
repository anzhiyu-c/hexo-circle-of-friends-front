<!--
 * @Description: 配置管理
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2022-11-02 11:11:00
 * @LastEditTime: 2023-05-26 10:55:53
 * @LastEditors: 安知鱼
-->
<script setup lang="ts">
import useSettingStore from "@/stores/modules/setting";
import { storeToRefs } from "pinia";
const settingStore = useSettingStore();
// link字段主题选项
const themeOptions = [
  {
    label: "普通主题",
    options: [
      {
        value: "butterfly",
      },
      {
        value: "fluid",
      },
      {
        value: "matery",
      },
      {
        value: "nexmoe",
      },
      {
        value: "stun",
      },
      {
        value: "Yun",
      },
      {
        value: "sakura",
      },
      {
        value: "volantis",
      },
      {
        value: "stellar",
      },
    ],
  },
  {
    label: "通用主题",
    options: [
      {
        value: "common1",
      },
      {
        value: "common2",
      },
    ],
  },
];

let { currentSettings } = storeToRefs(settingStore) as any;
settingStore.fetchGetManageCurrentSettings();

const submitSave = () => {
  settingStore.fetchSaveManageCurrentSettings();
};
const refresh = () => {
  settingStore.fetchGetManageCurrentSettings();
};
</script>

<template>
  <div class="setting-panel-main-config">
    <el-form :model="currentSettings" label-width="130px">
      <div
        v-for="(item, index) in currentSettings.LINK"
        :key="index"
        class="settings-item"
      >
        <div class="item-col">
          <el-form-item label="link">
            <el-tooltip
              content="爬取起始页面，填写你的友链页地址"
              placement="left"
              :hide-after="50"
              effect="light"
            >
              <el-input
                v-model="item.link"
                placeholder="示例：https://anzhiy.cn/link/"
                class="input"
              />
            </el-tooltip>
          </el-form-item>
        </div>
        <div class="item-col">
          <el-form-item label="theme" label-width="130px">
            <el-tooltip
              content="爬取起始页面的主题"
              placement="left"
              :hide-after="50"
              effect="light"
            >
              <el-select
                v-model="item.theme"
                placeholder="Select"
                style="width: 130px"
              >
                <el-option-group
                  v-for="group in themeOptions"
                  :key="group.label"
                  :label="group.label"
                >
                  <el-option
                    v-for="iten in group.options"
                    :key="iten.value"
                    :value="iten.value"
                  />
                </el-option-group>
              </el-select>
            </el-tooltip>
          </el-form-item>
          <el-button
            v-if="index === 0"
            circle
            class="cf-setting-main-add-btn"
            @click="settingStore.addLink()"
          >
            <i class="anzhiyufont anzhiyu-icon-circle-plus"></i>
          </el-button>
          <el-button
            v-if="index !== 0"
            circle
            class="cf-setting-main-add-btn"
            @click="settingStore.delLink(index)"
          >
            <i class="anzhiyufont anzhiyu-icon-circle-minus"></i>
          </el-button>
        </div>
      </div>
      <el-row v-for="(item, index) in currentSettings.BLOCK_SITE" :key="index">
        <el-form-item label="BLOCK_SITE">
          <el-tooltip
            content="屏蔽站点，支持正则表达式"
            placement="left"
            effect="light"
          >
            <el-input
              placeholder="非必填，示例：https://example.com/"
              v-model="currentSettings.BLOCK_SITE[index]"
              class="input"
            />
          </el-tooltip>
        </el-form-item>
        <el-button
          v-if="index === 0"
          circle
          class="cf-setting-main-add-btn"
          @click="settingStore.addBlocksite"
        >
          <i class="anzhiyufont anzhiyu-icon-circle-plus"></i>
        </el-button>
        <el-button
          v-if="index !== 0"
          circle
          class="cf-setting-main-add-btn"
          @click="settingStore.delBlocksite(index)"
        >
          <el-icon>
            <i class="anzhiyufont anzhiyu-icon-circle-minus"></i>
          </el-icon>
        </el-button>
      </el-row>
      <el-row>
        <el-form-item label="OUTDATE_CLEAN">
          <el-tooltip
            content="数据库文章过期清除时间"
            placement="left"
            effect="light"
          >
            <el-input
              placeholder="示例：60"
              v-model="currentSettings.OUTDATE_CLEAN"
            />
          </el-tooltip>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="HTTP_PROXY">
          <el-tooltip
            content="是否开启http代理，如需开启，打开此选项同时还要在环境变量配置一个代理地址"
            placement="left"
            effect="light"
          >
            <el-switch v-model="currentSettings.HTTP_PROXY" />
          </el-tooltip>
        </el-form-item>
      </el-row>
      <el-row justify="center">
        <el-button type="primary" @click="submitSave">保存</el-button>
        <el-button type="info" @click="refresh">刷新</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.setting-panel-main-config {
  .settings-item {
    display: flex;
    @media (max-width: 992px) {
      flex-direction: column;
    }

    .input {
      width: 300px;
      @media (max-width: 992px) {
        width: 200px;
      }
    }
  }
  .item-col {
    display: flex;
  }
  .input {
    width: 300px;
    @media (max-width: 992px) {
      width: 200px;
    }
    @media (max-width: 768px) {
      width: 130px;
    }
  }
  .cf-setting-main-add-btn {
    margin-left: 8px;
  }
}
</style>
