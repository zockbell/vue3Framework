<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue";
import domtoimage from "dom-to-image";
let href = ref("");
let divDom = ref();

onMounted(() => {
  let instance = getCurrentInstance();
  divDom.value = instance?.refs.aaa;
  console.log(divDom.value);
});

// 生成图片并可点击下载
/**
 * 详细参数：
 * filter: Function;
    bgcolor: string;
    width: number;
    height: number;
    style: any;
    quality: number;
    imagePlaceholder: string;
    cacheBust: boolean;
 */
const handleDomtoImage = () => {
  domtoimage
    // .toJpeg(divDom.value, {  // png
    // .toSvg(divDom.value, {   // svg  下边相应的格式也要同步修改
    .toJpeg(divDom.value, {
      quality: 0.95,
      width: 500,
      height: 500,
      bgcolor: "#f5f5f5",
    })
    .then((dataUrl) => {
      // 生成图片
      var img = new Image();
      img.src = dataUrl;
      document.body.appendChild(img);

      // 点击下载
      var link = document.createElement("a");
      link.download = "dom2Png.jpeg";
      link.href = dataUrl;
      link.click();
    });
};
</script>

<template>
  <div>
    <el-button type="success" @click="handleDomtoImage"
      >将DOM生成SVG图片</el-button
    >
    <div ref="aaa">
      <img
        src="http://img63.ddimg.cn/2023/7/31/2023073110182789596.jpg"
        alt=""
        width="200"
        height="200"
      />
      <p>
        要使Vue项目兼容安卓手机的低版本，可以采取以下措施： <br />
        1.
        使用Babel转换器将ES6代码转换为ES5。这可以通过在项目中添加babel-loader和相关依赖项来实现。<br />
        2. 使用Polyfill填补浏览器缺失的API和功能。可以使用core-js等库来实现。<br />
        3.
        避免使用较新的CSS属性和选择器，因为老版本的安卓浏览器可能无法识别它们。
      </p>
    </div>
  </div>
</template>
