<script setup lang="ts">
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import { AllBook } from "@/api/getAllBook";

const str = inject("str");
console.log(str.value);

// vue3中 reactive 定义的引用类型直接赋值导致数据失去响应式，我们可以通过修改对象的属性的形式，实现修改数据
let poetrys = ref([]);
// 请求接口
const useAllBookEffect = async () => {
  let res = await AllBook();
  let { content } = res.data;
  poetrys.value = content[2]["二年级上册"];
};
// onBeforeMount(() => {
useAllBookEffect();
// });

// 页面跳转
const useToNewPageEffect = () => {
  const router = useRouter();
  const handleNewpage = () => {
    router.push({
      name: "news",
      params: { id: "123" },
    });
  };
  return { handleNewpage };
};
const { handleNewpage } = useToNewPageEffect();

/*
  AllBook().then((res) => {
    poetrys.value = res.data.content[1]["一年级下册"];
    // console.log(poetrys);
  });
  */
</script>

<template>
  <main>
    <el-button type="success" @click="handleNewpage">跳转到新闻页</el-button>
    <h1 class="iconfont icon-paizhao">古诗词</h1>
    <div v-for="poetry in poetrys" :key="poetry.chapter_id">
      <div class="all"><img :src="poetry.img[0].url" /></div>
      <div class="list">
        <dl>
          <dd>{{ poetry.title }}--{{ poetry.recite }}</dd>
        </dl>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
