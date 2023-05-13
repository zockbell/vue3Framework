<script setup lang="ts">
import A from "@/views/mitt/components/A.vue";
// import B from "@/views/mitt/components/B.vue";

import { useIntersectionObserver, useDark, useToggle } from "@vueuse/core";

import { defineAsyncComponent } from "vue";
const B = defineAsyncComponent(() => import("@/views/mitt/components/B.vue"));

const target = ref(null);
const targetIsVisible = ref(false);

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    console.log(isIntersecting);
    if (isIntersecting) {
      targetIsVisible.value = isIntersecting;
    }
  }
);

// const isDark = useDark();
// const toggleDark = useToggle(isDark);

const isDark = useDark({
  selector: "body", //class渲染的标签
  valueDark: "dark", //暗黑class名字
  valueLight: "light", //高亮class名字
});
const toggleDark = useToggle(isDark);
</script>

<template>
  <div>
    <A>
      <template v-slot:header> 这里是header内容</template>
      <template v-slot="{ data }"> {{ data }} </template>
      <template v-slot:footer> 这里是footer内容 </template>
    </A>
    <div ref="target">
      <B v-if="targetIsVisible"></B>
    </div>
  </div>
  <div class="main">这里是main内容</div>
  <div @click="toggleDark()">皮肤切换</div>
</template>

<style>
.dark {
  background: #999;
}
.light {
  background: #eee;
}
</style>
