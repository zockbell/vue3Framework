<script setup lang="ts">
import { onMounted } from "vue";
import html2canvas from "html2canvas";

onMounted(() => {
  // html2canvas(document.body).then((canvas) => {
  //   document.body.appendChild(canvas);
  // });

  const onMakePicture = () => {
    //这是选择你要进行截屏的dom
    html2canvas(document.body).then(function (canvas) {
      // console.log('canvas',canvas)
      const link = document.createElement("img");
      //将图片转换为base64
      link.src = canvas.toDataURL();
      // link.style.width = "500px";
      // link.style.height = "300px";
      link.style.position = "absolute";
      link.style.top = "0";
      link.style.left = "0";
      document.body.appendChild(link);
    });
  };

  onMakePicture();
});
</script>

<template>
  <div>
    <div
      data-v-73666040=""
      class="v3board v3section v3section_inline bg-default"
      style="margin-top: 5px"
    >
      <div
        data-v-73666040=""
        class="v3title v3title_inner cl-minor"
        style="padding-top: 10px; padding-bottom: 10px"
      >
        <span
          data-v-73666040=""
          class="v3css_icon_title_triangle cl-master"
        ></span>
        <span data-v-73666040="">收不到验证码？</span>
      </div>
      <div data-v-73666040="" class="v3items cl-default bg-default bc-default">
        <div
          data-v-73666040=""
          class="v3item bc-default v3ui v3css_inline cl-minor"
          style="line-height: 180%; font-size: 0.9em"
        >
          <div data-v-73666040="">
            1. 请核实您输入的手机号是否正确、是否欠费或者信号是否良好。
          </div>
          <div data-v-73666040="">
            2.
            请检查您的手机拦截软件是否将该短信自动拦截（安全卫士、手机管家等）。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
