<script setup lang="ts">
import emmiter from "@/utils/mitt";
const msgB = ref("");
const HandleMsg = (n) => {
  msgB.value = n.value;
};
emmiter.on("send", HandleMsg);

let flag = ref(false);

const showModal = () => {
  flag.value = true;
};
</script>

<template>
  <div class="Bwrap">
    <div>这是B组件--{{ msgB }}</div>
    <!-- Teleport -->
    <Teleport to=".main" v-if="flag">
      <div class="teleport">
        <div class="modal">这是一个模态框</div>
      </div>
    </Teleport>
    <div @click="showModal">显示teleport模态框</div>

    <img src="@/assets/vueuse.svg" width="300" />
  </div>
</template>

<style scoped>
.Bwrap {
  margin: 20px 0;
  padding: 20px;
  background: #eee;
  border: 1px solid #999;
}
.teleport {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
}
.modal {
  width: 200px;
  height: 150px;
  top: 50%;
  left: 50%;
  position: absolute;
  background: #fff;
  text-align: center;
  line-height: 2;
  transform: translate(-50%, -50%);
}
</style>
