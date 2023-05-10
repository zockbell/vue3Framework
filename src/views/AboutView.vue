<script setup lang="ts">
import { ref } from "vue";
const flag = ref("about page");
</script>

<template>
  <div class="about">
    <div class="div">{{ flag }}</div>
  </div>
</template>

<style lang="scss">
.about {
  .div {
    font-size: $fs18;
    padding: 5px 15px;
    color: $colActive;
    background: $commonColor;
  }
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
