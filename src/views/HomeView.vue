<script setup lang="ts">
import { ref, provide } from "vue";
// import TheWelcome from '../components/TheWelcome.vue'
import AllTextbook from "@/components/AllTextbook.vue";

const str = ref<string | number>("zhangsan-provide");
provide("str", str);
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <AllTextbook></AllTextbook>
  </main>
</template>

<style lang="scss">
@import "@/assets/home.scss";

.div {
  color: $orange;
}
</style>
