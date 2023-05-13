<script setup lang="ts">
import emitter from "@/utils/mitt";
import mixin from "@/mixins/mixin";

const { num, fav, favBtn } = mixin();

let msgA = ref("A组件的内容");
const HandleSend = () => {
  emitter.emit("send", msgA);
};

const list = [
  { id: 1, name: "zhangsan", age: 18 },
  { id: 2, name: "lisi", age: 30 },
  { id: 3, name: "wangwu", age: 20 },
];
</script>

<template>
  <div style="height: 600px">
    <div style="border: 1px solid blue">
      {{ num }}
      <button @click="favBtn">
        {{ fav ? "收藏中..." : "收藏" }}
      </button>
    </div>

    <div>
      <p>这是A组件--{{ msgA }}</p>

      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <div v-for="item in list" :key="item.id">
          <slot :data="item"></slot>
        </div>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
    <button @click="HandleSend">按钮</button>
  </div>
</template>
