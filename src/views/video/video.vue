<script setup lang="ts">
import { reactive } from "vue";

const options = reactive({
  width: "800px", //播放器宽度
  height: "450px", //播放器高度
  color: "#409eff", //主题色
  title: "绝句-杜甫", //视频名称
  currentTime: 10, // 跳转到固定播放时间
  src: "https://czpt.mypep.cn/jxw/textbook/chinese/media/121100120217120190516150536165.mp4", //视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
  ], //显示所有按钮,
});

const onTimeupdate = (ev) => {
  console.log(ev);
};
</script>

<template>
  <div>
    <vue3VideoPlay
      v-bind="options"
      @timeupdate="onTimeupdate"
      poster="https://czpt.mypep.cn/jxw/textbook/chinese/media/12110012021710311021555310930462.jpeg"
    />
  </div>
</template>

<style scoped></style>
