<script lang="ts" setup>
import { onMounted, ref, type Ref } from "vue";
import useHomeStore from "@/stores/modules/home";
import DefaultConfig from "@/utils/config";
import { BASE_URL } from "@/services/request/config";
import { storeToRefs } from "pinia";

// 定义store
const homeStore = useHomeStore();

const frdata = {
  apiurl: BASE_URL,
  defaultFish: DefaultConfig.defaultFish,
  hungryFish: DefaultConfig.hungryFish,
};
// 随机文章前面的tips
let randomPostTipsOne: Ref<string> = ref("");
// 随机文章信息
const { homeRandompostInfo } = storeToRefs(homeStore) as any;
// 加载状态
let loading: Ref<Boolean> = ref(true);
// 称号
let honor: Ref<string> = ref("");
// 过于饥饿
let hungerError: Ref<Boolean> = ref(false);
let randomPostTimes = ref(0),
  randomPostWorking = 0,
  randomPostTips = [
    "钓到了绝世好文！",
    "在河边打了个喷嚏，吓跑了",
    "你和小伙伴抢夺着",
    "你击败了巨龙，在巢穴中发现了",
    "挖掘秦始皇坟时找到了",
    "在路边闲逛的时候随手买了一个",
    "从学校班主任那拿来了孩子上课偷偷看的",
    "你的同桌无情的从你的语文书中撕下了那篇你最喜欢的",
    "考古学家近日发现了",
    "外星人降临地球学习地球文化，落地时被你塞了",
    "从图书馆顶层的隐秘角落里发现了闪着金光的",
    "徒弟修炼走火入魔，为师立刻掏出了",
    "在大山中唱山歌，隔壁的阿妹跑来了，带着",
    "隔壁家的孩子数学考了满分，都是因为看了",
    "隔壁家的孩子英语考了满分，都是因为看了",
    "小米研发了全新一代MIX手机，据说灵感",
    "修炼渡劫成功，还好提前看了",
    "库克坐上了苹果CEO的宝座，因为他面试的时候看了",
    "阿里巴巴大喊芝麻开门，映入眼帘的就是",
    "师傅说练武要先炼心，然后让我好生研读",
    "科考队在南极大陆发现了被冰封的",
    "飞机窗户似乎被一张纸糊上了，仔细一看是",
    "历史上满写的仁义道德四个字，透过字缝里却全是",
    "十几年前的录音机似乎还能够使用，插上电发现正在播的是",
    "新版语文书拟增加一篇熟读并背诵的",
    "经调查，99%的受访者都没有背诵过",
    "今年的高考满分作文是",
    "唐僧揭开了佛祖压在五指山上的",
    "科学家发现能够解决衰老的秘密，就是每日研读",
    "英特尔发布了全新的至强处理器，其芯片的制造原理都是",
    "新的iPhone产能很足，新的进货渠道是",
    "今年亩产突破了八千万斤，多亏了",
    "陆隐一统天上宗，在无数祖境高手的目光下宣读了",
    "黑钻风跟白钻风说道，吃了唐僧肉能长生不老，他知道是因为看了",
    "上卫生间没带纸，直接提裤跑路也不愿意玷污手中",
    "种下一篇文章就会产生很多很多文章，我种下了",
    "三十年河东，三十年河西，莫欺我没有看过",
    "踏破铁血无觅处，得来全靠",
    "今日双色球中了两千万，预测全靠",
    "因为卷子上没写名字，老师罚抄",
    "为了抗议世间的不公，割破手指写下了",
    "在艺术大街上被贴满了相同的纸，走近一看是",
    "这区区迷阵岂能难得住我？其实能走出来多亏了",
    "今日被一篇文章顶上了微博热搜，它是",
    "你送给乞丐一个暴富秘籍，它是",
    "UZI一个走A拿下五杀，在事后采访时说他当时回想起了",
    "科学家解刨了第一个感染丧尸病毒的人，发现丧尸抗体存在于",
    "如果你有梦想的话，就要努力去看",
    "决定我们成为什么样人的，不是我们的能力，而是是否看过",
    "有信心不一定会成功，没信心就去看",
    "你真正是谁并不重要，重要的是你看没看过",
    "玄天境重要的是锻体，为师赠你此书，好好修炼去吧，这是",
    "上百祖境高手在天威湖大战三天三夜为了抢夺",
    "这化仙池水乃上古真仙对后人的考校，要求熟读并背诵",
    "庆氏三千年根基差点竟被你小子毁于一旦，能够被我拯救全是因为我看了",
    "我就是神奇宝贝大师！我这只皮卡丘可是",
    "我就是神奇宝贝大师！我这只小火龙可是",
    "我就是神奇宝贝大师！我这只可达鸭可是",
    "我就是神奇宝贝大师！我这只杰尼龟可是",
    "上古遗迹中写道，只要习得此书，便得成功。你定睛一看，原来是",
    "奶奶的，玩阴的是吧，我就是双料特工代号穿山甲，",
    "你的背景太假了，我的就逼真多了，学到这个技术全是因为看了",
    "我是云南的，云南怒江的，怒江芦水市，芦水市六库，六库傈僳族，傈僳族是",
    "我真的栓Q了，我真的会谢如果你看",
    "你已经习得退退退神功，接下来的心法已经被记录在",
    "人生无常大肠包小肠，小肠包住了",
    "你抽到了普通文章，它是",
    "你收到了稀有文章，它是",
    "你抽到了金色普通文章，它是",
    "你抽到了金色稀有文章，它是",
    "你抽到了传说文章！它是",
    "哇！金色传说！你抽到了金色传说文章，它是",
    "报告！侦察兵说在前往300米有一个男子在偷偷看一本书，上面赫然写着",
    "芷莲姑娘大摆擂台，谁若是能读完此书，便可娶了她。然后从背后掏出了",
    "请问你的梦想是什么？我的梦想是能读到",
    "读什么才能增智慧？当然是读",
    "纳兰嫣然掏出了退婚书，可是发现出门带错了，结果拿出了一本",
    "你要尽全力保护你的梦想。那些嘲笑你的人，他们必定会失败，他们想把你变成和他们一样的人。如果你有梦想的话，就要努力去读",
    "走人生的路就像爬山一样，看起来走了许多冤枉的路，崎岖的路，但终究需要读完",
    "游戏的规则就是这么的简单，你听懂了吗？管你听没听懂，快去看",
  ],
  opacity = false,
  randomPostClick = 0;
function getRandomPost() {
  loading.value = true;
  let randomNum: number;
  if (0 == randomPostWorking && document.getElementById("random-post")) {
    randomPostTipsOne.value =
      randomPostTips[Math.floor(Math.random() * randomPostTips.length)];
    honor.value =
      1e4 < randomPostTimes.value
        ? "愿者上钩"
        : 1e3 < randomPostTimes.value
        ? "俯览天下"
        : 1e3 < randomPostTimes.value
        ? "超越神了"
        : 100 < randomPostTimes.value
        ? "绝世渔夫"
        : 75 < randomPostTimes.value
        ? "钓鱼王者"
        : 50 < randomPostTimes.value
        ? "钓鱼宗师"
        : 20 < randomPostTimes.value
        ? "钓鱼专家"
        : 5 < randomPostTimes.value
        ? "钓鱼高手"
        : "钓鱼新手";

    randomNum = getRandomNum(1e3, 3e3);
    0 == randomPostTimes.value && (randomNum = 0);
    opacity = true;

    if (
      randomPostClick * frdata.hungryFish + frdata.defaultFish <
        randomPostTimes.value &&
      0 == Math.round(Math.random())
    ) {
      hungerError.value = true;
    } else {
      homeStore.fetchHomeRandompostData();
      if (document.querySelector("#random-post")) {
        window.setTimeout(function () {
          loading.value = false;
          randomPostTimes.value += 1;
          localStorage.setItem("randomPostTimes", randomPostTimes.value + "");
          opacity = false;
        }, randomNum);
      }
    }
  }
}
function setRotation(rotate: any) {
  let obj = {
    transform: rotate,
    transitionDuration: "0.3s",
  };

  return obj;
}
function initRandomPost() {
  if (
    document.querySelector(".random-post-start") &&
    localStorage.randomPostTimes
  ) {
    randomPostTimes.value = parseInt(localStorage.randomPostTimes, 10);
    randomPostClick = parseInt(localStorage.randomPostClick, 10);
  }
  getRandomPost();
}

function getRandomNum(o: any, t: any) {
  switch (arguments.length) {
    case 1:
      return Number(Math.random() * o + 1);
    case 2:
      return Number(Math.random() * (t - o + 1) + o);
    default:
      return 0;
  }
}

function randomClickLink() {
  randomPostClick += 1;
  localStorage.setItem("randomPostClick", randomPostClick + "");
}
onMounted(() => {
  initRandomPost();
});
</script>

<template>
  <div class="title-h2-a">
    <div class="title-h2-a-left">
      <h2>🎣 钓鱼</h2>
      <a
        :class="opacity ? 'random-post-start opacity' : 'random-post-start'"
        :style="setRotation('rotate(' + 360 * randomPostTimes + 'deg)')"
        @click="getRandomPost"
        rel="external nofollow"
        ><i class="fa-solid fa-arrow-rotate-right"></i
      ></a>
    </div>
    <div class="title-h2-a-right">
      <a class="random-post-all" href="/link/" data-pjax-state="">全部友链</a>
    </div>
  </div>
  <div id="random-post">
    <div v-if="loading">
      {{
        5 <= randomPostTimes
          ? "钓鱼中... （Lv." + randomPostTimes + " 当前称号：" + honor + "）"
          : "钓鱼中..."
      }}
    </div>
    <template v-else-if="hungerError">
      因为只钓鱼不吃鱼，过分饥饿导致本次钓鱼失败...(点击任意一篇钓鱼获得的文章即可恢复）
    </template>
    <template v-else>
      {{ randomPostTipsOne }} 来自友链
      <b> {{ homeRandompostInfo.author }} </b> 的文章：
      <a
        class="random-friends-post"
        target="_blank"
        :href="homeRandompostInfo.link"
        rel="external nofollow"
        @click="randomClickLink"
      >
        {{ homeRandompostInfo.title }}
      </a>
    </template>
  </div>
</template>

<style scoped lang="less">
.title-h2-a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  line-height: 2;
  .title-h2-a-left {
    display: flex;
    align-items: center;
    .opacity {
      opacity: 0.2;
    }
  }
  h2 {
    position: relative;
    margin: 0 0;
    font-weight: 700;
  }
  a {
    cursor: pointer;
    margin-left: 0.5rem;
    font-weight: 700;
    color: var(--anzhiyu-fontcolor);
    &:hover {
      color: var(--anzhiyu-main);
    }
  }
}
#random-post {
  min-height: 32px;
  background: var(--anzhiyu-card-bg);
  border: var(--style-border-always);
  box-shadow: var(--anzhiyu-shadow-border);
  padding: 20px 30px;
  border-radius: 12px;
  margin-top: 8px;
  .random-friends-post {
    font-weight: 500;
    border-bottom: solid 2px var(--anzhiyu-lighttext);
    color: var(--anzhiyu-fontcolor);
    padding: 0 0.2em;
    text-decoration: none;
    &:hover {
      box-shadow: var(--anzhiyu-shadow-lightblack);
      border-radius: 0.25em;
      border-bottom: 2px solid var(--anzhiyu-none) !important;
      color: var(--anzhiyu-white);
      background: var(--anzhiyu-main);
    }
  }
}
</style>
