<!-- <script setup>
import { defineProps } from "vue";
defineProps({
  msg: {
    type: String,
    default: "默认数据",
  },
});
</script> -->

<script>
export default {
  props: ["msg"],
  setup(props) {
    let message = props.msg; // 这种方式可对参数进行改造
    return { message };
  },
};
</script>

<template>这是子组件 {{ msg }}--{{ message }}</template>

<style scoped></style>
