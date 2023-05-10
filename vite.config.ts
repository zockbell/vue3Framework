import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// const path = require('path');


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports:["vue", "vue-router"],
      resolvers: [ElementPlusResolver()], // elemenet-plus
      dts:'src/auto-import.d.ts'    // 路径下自动生成文件夹存放全局指令
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
      // '@': path.resolve(__dirname, './src')
    },
    // extensions: ['.js', '.ts', '.jsx', '.tsx'] // 导入时想要省略的扩展名列表。注意，不 建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持。
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/variable/variable.scss";'
      }
    }
  },
  server: {
    // port: 3001,//端口号
    strictPort: false, //是否是严格的端口号，如果true，端口号被占用的情况下，vite会退出
    // host: '10.53.4.64',
    cors: true, // 允许跨域，为开发服务器配置 CORS , 默认启用并允许任何源
    https: false,//是否支持http2 如果配置成true 会打开https://localhost:3001/xxx;
    open: true,//是否自动打开浏览器
    // 反向代理 跨域配置
    proxy: {
      '/api': {
        target: "https://xxx.cn/",
        changeOrigin: true, // https
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  base: '/vue3',
  build: {
    outDir: "vue3",
    assetsDir: "vue3assets",
    assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
    cssCodeSplit: true, // 启用/禁用 CSS 代码拆分
    sourcemap: false, // 构建后是否生成 source map 文件
    //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
    emptyOutDir: true,
  }
})
