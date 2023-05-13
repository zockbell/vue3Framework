import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import App from './App.vue'
import stores from './stores/index'
import router from './router'
// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'
// iconfont
import './assets/fonts/iconfont.css'
// vue3-video-play
import vue3videoPlay from "vue3-video-play";
import "vue3-video-play/dist/style.css";

const app = createApp(App)

// app.use(createPinia())
// app.use(router)
// app.mount('#app')

app.use(vue3videoPlay).use(ElementPlus).use(stores).use(router).mount('#app')
