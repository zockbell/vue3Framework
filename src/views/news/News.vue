<script setup lang="ts">
import { getCurrentInstance, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia"; // 使用storeToRefs方法解构
import { useCounterStore } from "@/stores/counter";
import Child from "@/components/Child.vue";

const route = useRoute();
const router = useRouter();
console.log(router);
console.log("参数：", route.params.id);

const instance = getCurrentInstance();
const _this = instance.appContext.config.globalProperties; // vue3中的this实例
// console.log(instance);
// console.log(_this.$route.params.id);

// pinia
const counterStore = useCounterStore();
// 解构 可以保证解构出来的数据也是响应式的
let { count, doubleCount, name } = storeToRefs(counterStore);
// console.log(counterStore);

const change = () => {
  count.value = 5;
};

let obj = reactive({
  nick: "zhangsan",
  age: 18,
});

let { nick, age } = toRefs(obj);

const btn = () => {
  nick.value = "wangwu";
};

// 组件
let msg = "这是父组件传过去的数据";
</script>

<template>
  <div>这是新闻页面</div>
  <ul>
    <li>{{ nick }}</li>
    <li>{{ age }}</li>
  </ul>

  <div class="pinia_test">
    <!-- <el-button type="primary" @click="counterStore.increment(2)"
      >按钮</el-button
    > -->
    <el-button type="primary" @click="counterStore.increment()">按钮</el-button>
    <div>{{ count }}--{{ doubleCount }}</div>
    <div>{{ name }}</div>

    <el-button type="warning" @click="change">修改state数据</el-button>

    <el-button type="default" @click="btn">修改obj数据</el-button>
  </div>

  <Child :msg="msg" />
  <hr />
</template>

<style lang="scss" scoped>
.pinia_test {
  text-align: center;
}
</style>
