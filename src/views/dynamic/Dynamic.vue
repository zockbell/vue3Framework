<script setup lang="ts">
import Tab1 from "@/views/dynamic/components/Tab1.vue";
import Tab2 from "@/views/dynamic/components/Tab2.vue";
import Tab3 from "@/views/dynamic/components/Tab3.vue";

const currentTab = ref("Tab1");
const tabs = {
  Tab1,
  Tab2,
  Tab3,
};
</script>

<template>
  <div>动态组件</div>

  <div>
    <button
      v-for="(_, tab) in tabs"
      :key="tab"
      :class="['tab-button', { active: currentTab === tab }]"
      @click="currentTab = tab"
    >
      {{ tab }}
    </button>
  </div>

  <!-- <Tab1></Tab1>
  <Tab2></Tab2>
  <Tab3></Tab3> -->
  <component :is="tabs[currentTab]" class="tab"></component>
</template>

<style scoped>
.tab-button {
  background: none;
  margin-right: 10px;
  border: 1px solid #999;
  padding: 10px 20px;
  border-radius: 5px;
  padding: 3px 6px;
}
.active {
  color: #fff;
  background: #999;
}
</style>
