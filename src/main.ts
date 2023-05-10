import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import stores from './stores/index'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/main.css'
import './assets/fonts/iconfont.css'

const app = createApp(App)

// app.use(createPinia())
// app.use(router)
// app.mount('#app')

app.use(ElementPlus).use(stores).use(router).mount('#app')
