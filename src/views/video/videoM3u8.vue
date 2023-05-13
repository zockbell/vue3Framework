<template>
  <div>
    <vue3VideoPlay
      width="800px"
      title="研究土壤中小动物类群的丰富度"
      :src="options.src"
      :type="options.type"
      :autoPlay="false"
      @timeupdate="onTimeupdate"
    />
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
const options = reactive({
  src: "http://jx-file10.mypep.cn/zhangxd/14430011322010201011683341820066/index.m3u8", //视频源
  type: "m3u8", //视频类型
});

const onTimeupdate = (ev) => {
  console.log(ev.target.currentTime);
};
</script>

<style scoped></style>
