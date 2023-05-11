# web前端vue3+vite+Pinia架构开发文档

## 1. 简介

此文档是web前端基于vue3+vite+vue-router+Pinia架构，可直接使用。

---

## 2. [vite](https://cn.vitejs.dev/guide/)

> - 一个开发服务器，它基于 [原生 ES 模块](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 提供了 [丰富的内建功能](https://cn.vitejs.dev/guide/features.html)，如速度快到惊人的 [模块热更新（HMR）](https://cn.vitejs.dev/guide/features.html#hot-module-replacement)。
> - 一套构建指令，它使用 [Rollup](https://rollupjs.org/) 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

### 2.1 vue-cli

在`vue2.x`中更习惯`vue-cli`去搭建项目，它是`vue2`版本中的官方脚手架工具，是基于 `webpack` 构建，并带有合理的默认配置。

工作原理：

![](https://github.com/zockbell/vue3Framework/blob/master/src/assets/screenshot/vue-cli.png)

Vue cli 在服务启动之前，要把所有代码打包成 Bundle 再启动服务。这就是为什么启动一些大型项目时，特别慢的原因。这一点上 Vite 做了大幅改善。

### 2.2 vite

`vite` 通过在一开始将应用中的模块区分为 **依赖** 和 **源码** 两类，改进了开发服务器启动时间。

Vite 以 [原生 ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。

![](https://github.com/zockbell/vue3Framework/blob/master/src/assets/screenshot/vite.png)

### 2.3 [为什么选vite](https://cn.vitejs.dev/guide/why.html)

* Vite 基于浏览器的原生功能，省掉了打包过程，在开发环境中快速体验。

* Vite 使用 esbuild 预构建依赖，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。

* Vite 天然支持引入 `.ts` 文件。

---

### 2.4 使用 vite 创建项目

> 兼容性注意
>
> Vite 需要 [Node.js](https://nodejs.org/en/) 版本 14.18+，16+。然而，有些模板需要依赖更高的 Node 版本才能正常运行，当你的包管理器发出警告时，请注意升级你的 Node 版本。

```node
npm create vite@latest   or   yarn create vite 
```

---

## 3. vue3

### 3.1 函数式组件之 `this` 

> 函数式组件是一种定义自身没有任何状态的组件的方式。它们很像纯函数：接收 props，返回 vnodes。函数式组件在渲染过程中不会创建组件实例 (也就是说，没有 `this`)，也不会触发常规的组件生命周期钩子。

```js
import { getCurrentInstance } from "vue";

const instance = getCurrentInstance();
const _this = instance.appContext.config.globalProperties; // vue3中的this实例
console.log(_this.$route.params.id); // 可获取相应参数
```

### 3.2 核心

* **toRefs**

  > 将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用 [`toRef()`](https://cn.vuejs.org/api/reactivity-utilities.html#toref) 创建的。

  ```typescript
  let obj = reactive({
    nick: "zhangsan",
    age: 18,
  });
  
  let { nick, age } = toRefs(obj);
  
  const btn = () => {
    nick.value = "wangwu";
  };
  ```

* **computed**

  > 接受一个 getter 函数，返回一个只读的响应式 [ref](https://cn.vuejs.org/api/reactivity-core.html#ref) 对象。该 ref 通过 `.value` 暴露 getter 函数的返回值。它也可以接受一个带有 `get` 和 `set` 函数的对象来创建一个可写的 ref 对象。

  示例：

  ```typescript
  const count = ref(1)
  const plusOne = computed(() => count.value + 1)
  
  console.log(plusOne.value) // 2
  
  plusOne.value++ // 错误
  ```

  

* **watch**

  1. 监听一个数据

     ```typescript
     watch(name, (newVal, oldVal) => {
     	console.log(newval, oldVal);
     })
     ```

  2. 同时监听多个数据

     ```typescript
     watch([name, age], (newVal, oldVal) => {
     	console.log(newval, oldVal);
     })
     ```

  3. 初始化监听（打开页面执行一次）

     ```typescript
     watch(name, (newVal, oldVal) => {
     	console.log(newval, oldVal);
     }, {
     	immediate: true
     })
     ```

  4. 监听对象

     ```typescript
     watch( obj, (newVal) => {
     	console.log(newVal)
     }, {
     	immediate: true,
     })
     ```

  5. 监听对象某一个key，并且深度监听

     ```typescript
     watch( ()=> obj.name, (newVal, oldVal) => {
     	console.log(newVal, oldVal)
     }, {
     	immediate: true,
     	deep: true
     })
     ```

  6. 监听路由

     ```typescript
     let router = useRouter();
     watch(() => router.currentRoute.value, (newVal) => {
       console.log(newVal);
     }, {
       immediate: true
     })
     ```

     

* **watchEffect**

  > 立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。

  ```js
  const count = ref(0)
  
  watchEffect(() => console.log(count.value))
  // -> 输出 0
  
  count.value++
  // -> 输出 1
  ```


### 3.2 [生命周期钩子](https://cn.vuejs.org/api/composition-api-lifecycle.html)

下表包含如何在`setup()`内部调用生命周期钩子：

| 选项式API       | Hook inside       |
| :-------------- | ----------------- |
| beforeCreate    | Not needed*       |
| created         | Not needed*       |
| beroreMount     | onBeforeMount     |
| mounted         | onMounted         |
| beforeUpdate    | onBeforeUpdate    |
| updated         | onUpdated         |
| beforeUnmount   | onBeforeUnmount   |
| unmounted       | onUnmounted       |
| errorCaptured   | onErrorCaptured   |
| renderTracked   | onRenderTracked   |
| renderTriggered | onRenderTriggered |
| activated       | onActivated       |
| deactivated     | onDeactivated     |

### 3.3 组件传参

* **父传子**

  父：

  ```typescript
  <script setup>
  import Child from "@/components/Child.vue";
  // 组件
  let msg = "这是父组件传过去的数据";
  </script>
  
  <template>
  	<Child :msg="msg" />    
  </template>
  ```

  子：

  ```typescript
  <script setup>
  import { defineProps } from "vue";
  defineProps({
    msg: {
      type: String,
      default: "默认数据",
    },
  });
  </script>
  
  <template>这是子组件 {{ msg }}</template>
  ```

  ​	或

  ​	

  ```typescript
  <script>
  export default {
    props: ["msg"],
    setup(props) {
      let message = props.msg; // 这种方式可对参数进行改造
      return { message };
    },
  };
  </script>
  
  <template>这是子组件 {{ message }}</template>
  ```

  

* **子传父**

  子：

  ​	`ts`

  ```typescript
  <script setup lang="ts">
  let num = ref(100);
  const emit = defineEmits<{
    (e: "change", id: number): void;
  }>();
  const changeNum = () => {
    emit("change", num);
  };
  </script>
  
  <template>
    <div>
      <p>这是子组件内容</p>
      <p>{{ num }}</p>
      <button @click="changeNum">按钮</button>
    </div>
  </template>
  ```

  ​	`js`

  ```js
  <script setup>
  let num = ref(101);
  const emit = defineEmits(["change"]);
  const changeNum = () => {
    emit("change", num);
  };
  </script>
  
  <template>
    <div>
      <p>这是子组件内容</p>
      <p>{{ num }}</p>
      <button @click="changeNum">按钮</button>
    </div>
  </template>
  
  ```

  父：

  ```typescript
  <script setup>
  import Item from "@/components/Item.vue";
  const getItem = (n) => {
    n.value = 200;
  };
  </script>
  
  <template>
    <div>这是列表页</div>
    <Item @change="getItem"></Item>
  </template>
  
  ```

* **[组件双向数据绑定 `v-model`](https://cn.vuejs.org/guide/components/v-model.html#v-model-arguments)**

  > `v-model` 可以在组件上使用以实现双向绑定
  >
  > 解决子组件不可以直接修改父组件的数据问题

  父：

  ```js
  <script setup>
  import Item from "@/components/Item.vue";
  let msg = ref("这是父组件的内容");
  const getItem = (n) => {
    n.value = 202;
  };
  </script>
  
  <template>
    <div>这是列表页--{{ msg }}</div>
    <Item @change="getItem" v-model:msg="msg"></Item>
  </template>
  
  ```

  子：

  ```js
  <script setup>
  let num = ref(101);
  const props = defineProps({
    msg: String,
  });
  const emit = defineEmits(["change", "update:msg"]);
  const changeNum = () => {
    emit("change", num);
    emit("update:msg", "子修改了父的内容");
    // console.log(props.msg);
  };
  </script>
  
  <template>
    <div>
      <p>这是子组件内容</p>
      <p>{{ num }}--{{ msg }}</p>
      <button @click="changeNum">按钮</button>
    </div>
  </template>
  
  ```

* **兄弟组件传值**

  > 可使用 `mitt` 插件

  a. 安装

  ```node
  npm install --save mitt
  ```

  b. 新建 `utils/mitt.js`

  ```typescript
  import mitt from 'mitt'
  const emitter = mitt();
  export default emitter; 
  ```

  c.  A组件

  ```js
  <script setup>
  import emitter from "@/utils/mitt.js";
  
  let msgA = ref("A组件的内容");
  const HandleSend = () => {
    emitter.emit("send", msgA);
  };
  </script>
  
  <template>
    <div>这是A组件--{{ msgA }}</div>
    <button @click="HandleSend">按钮</button>
  </template>
  ```

  d. B组件

  ```js
  <script setup>
  import emmiter from "@/utils/mitt.js";
  const msgB = ref("");
  const HandleMsg = (n) => {
    msgB.value = n.value;
  };
  emmiter.on("send", HandleMsg);
  </script>
  
  <template>
    <div>这是B组件--{{ msgB }}</div>
  </template>
  ```

### 3.4 插槽

> 在某些场景中，我们可能想要为子组件传递一些模板片段，让子组件在它们的组件中渲染这些片段。
>
> 插槽是父给子传，父组件中为：插槽内容，子组件的`<slot>`为*插槽出口*

#### 3.4.1 匿名插槽

* 父：

  ```vue
  <A>
  	A组件插槽内容
  </A>
  ```

* 子：

  ```vue
  <div>
  	这是A组件
  	<slot></slot>
  </div>
  ```

#### 3.4.2 具名插槽

* 父：

  ```vue
  <A>
  	<template v-slot:header> 这里是header内容 	</template>
  	<template #default> 这里是main内容 </template>
  	<template v-slot:footer> 这里是footer内容 </template>
  </A>
  ```

  ​	`v-slot:header`可缩写为：`#header`

* 子：

  ```vue
  <header>
  	<slot name="header"></slot>
  </header>
  <main>
  	<slot></slot>
  </main>
  <footer>
  	<slot name="footer"></slot>
  </footer>
  ```

3.4.3 动态插槽

> [动态指令参数](https://cn.vuejs.org/guide/essentials/template-syntax.html#dynamic-arguments)在 `v-slot` 上也是有效的，即可以定义下面这样的动态插槽名

```vue
...
let str = ref('动态插槽');
...

<base-layout>
  <template v-slot:[str]>
    ...
  </template>

  <!-- 缩写为 -->
  <template #[str]>
    ...
  </template>
</base-layout>
```

#### 3.4.4 作用域插槽

> 插槽的内容可以同时使用父组件域内（可直接取）和子组件域内（需要子传给父）的数据

* 父：

  ```vue
  <A>
  	<template v-slot:header> 这里是header内容 {{ msgA }} </template>
      <template v-slot="{ data }"> {{ data }} </template>
      <template v-slot:footer> 这里是footer内容 </template>
  </A>
  ```

  

* 子：

  ```vue
  <script setup>
  const list = [
    { id: 1, name: "zhangsan", age: 18 },
    { id: 2, name: "lisi", age: 30 },
    { id: 3, name: "wangwu", age: 20 },
  ];
  </script>
  
  <template>
    <div>
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <div v-for="item in list" :key="item.id">
          <slot :data="item"></slot>
        </div>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  </template>
  ```

### 3.5 Teleport

> `<Teleport>` 是一个内置组件，它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。

有时我们可能会遇到这样的场景：一个组件模板的一部分在逻辑上从属于该组件，但从整个应用视图的角度来看，它在 DOM 中应该被渲染在整个 Vue 应用外部的其他地方。

这类场景最常见的例子就是全屏的模态框。

父：

```vue
<div class="main">这里是main内容</div>
```

子：

```vue
<script setup>
let flag = ref(false);

const showModal = () => {
  flag.value = true;
};
</script>

<template>
  <!-- Teleport -->
  <Teleport to=".main" v-if="flag">
    <div class="teleport">
      <div class="modal">这是一个模态框</div>
    </div>
  </Teleport>
  <div @click="showModal">显示teleport模态框</div>
</template>

<style scoped>
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
```

![](https://github.com/zockbell/vue3Framework/blob/master/src/assets/screenshot/teleport.png)



PS: 

​	`<Teleport>` 接收一个 `to` prop 来指定传送的目标。`to` 的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象。

```vue
<Teleport to=".main"></Teleport>
<Teleport to="#main"></Teleport>
<Teleport to="body"></Teleport>
```

### 3.6 [动态组件](https://cn.vuejs.org/guide/essentials/component-basics.html#dynamic-components)

> 有些场景会需要在两个组件间来回切换，比如 Tab 界面

父：

```vue
<script setup>
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
```

三个子组件：

```vue
<template>
  <div>tab1 组件内容</div>
</template>

<template>
  <div>tab2 组件内容</div>
</template>

<template>
  <div>tab3 组件内容</div>
</template>
```

### 3.7 异步组件

> 主要用于提升性能

* 在父组件中可以直接使用 [`defineAsyncComponent`](https://cn.vuejs.org/api/general.html#defineasynccomponent) 方法来实现组件的异步加载。

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

const AdminPage = defineAsyncComponent(() =>
  import('./components/AdminPageComponent.vue')
)
</script>

<template>
  <AdminPage />
</template>
```

* 组件按需引入

  > 当用户访问到组件再对该组件进行加载

  a. 使用`vueuse` 一款基于Vue组合式API的函数工具集

  ```vue
  #安装
  npm i @vueuse/core
  ```

  b. 引入并使用

  ```vue
  <script setup>
  import A from "@/views/mitt/components/A.vue";
  // import B from "@/views/mitt/components/B.vue";
  
  import { useIntersectionObserver } from "@vueuse/core";
  
  import { defineAsyncComponent, useDark, useToggle } from "vue";
  const B = defineAsyncComponent(() => import("@/views/mitt/components/B.vue"));
  
  const target = ref(null);
  const targetIsVisible = ref(false);
  
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      console.log(isIntersecting);
      if (isIntersecting) {
        targetIsVisible.value = isIntersecting;
      }
    }
  );
  </script>
  
  <template>
    <div>
      <A></A>	// 高度超过了第一屏
      <div ref="target">
        <B v-if="targetIsVisible"></B>
      </div>
    </div>
  </template>
  ```

  c. 可使用vueuse实现暗黑模式

  template:

  ```vue
  const isDark = useDark({
    selector: "body", //class渲染的标签
    valueDark: "dark", //暗黑class名字
    valueLight: "light", //高亮class名字
  });
  const toggleDark = useToggle(isDark);
  
  <div @click="toggleDark()">黑色皮肤切换</div>
  ```

  script:

  ```
  import { useDark, useToggle } from "@vueuse/core";
  
  const isDark = useDark({
    selector: "body", //class渲染的标签
    valueDark: "dark", //暗黑class名字
    valueLight: "light", //高亮class名字
  });
  const toggleDark = useToggle(isDark);
  ```

### 3.8 Mixins

> 混入，用来分发 Vue 组件中的可复用的功能
>
> 功能可复用，数据不共享

* /mixins/mixin.js

  ```js
  import { ref } from 'vue';
  export default function () {
    let num = ref(1)
    let fav = ref(false)
  
    // 可复用的收藏功能
    let favBtn = () => {
      num.value += 1;
      fav.value = true;
      setTimeout(() => {
        fav.value = false;
      }, 2000)
    }
    return {
      num,
      fav,
      favBtn
    }
  }
  ```

* 复用的组件

  ```vue
  <script setup>
  import emitter from "@/utils/mitt.js";
  import mixin from "@/mixins/mixin.js";
  
  const { num, fav, favBtn } = mixin();
  </script>
  
  <template>
  	<div>
        {{ num }}
        <button @click="favBtn">
          {{ fav ? "收藏中..." : "收藏" }}
        </button>
      </div>
  </template>
  ```

### 3.9 依赖注入

* provide()

  > 提供一个值，可以被后代组件注入。
  >
  > 数据为共享数据

  ```vue
  <script setup>
      import { ref, provide } from "vue";
      const str = ref("zhangsan-provide");
  	provide("str", str);
  </script>
  ```

  

* inject()

  > 子或孙组件都可以注入数据
  >
  > 注入一个由祖先组件或整个应用 (通过 `app.provide()`) 提供的值。

  ```vue
  <script setup>
      import { inject } from "vue";
      const str = inject("str");
      console.log(str.value);
  </script>
  ```

  

---

## 4. vue-router

### 4.1 安装

> 使用vite构建项目时可直接选择安装，则不用单独安装

```js
npm install vue-router@4      or      yarn add vue-router@4
```

### 4.2 route 和 router

- route

> **route 是用来获取路由信息的**
>
> **route相当于当前正在跳转的路由对象。每一个路由都会有一个router对象，可以从里面获取name、meta、path、hash、query、params、fullPath、matched、redirectedFrom等。**

```js
const route = useRoute();
```

![](https://github.com/zockbell/vue3Framework/blob/master/src/assets/screenshot/route.png)

- router

>  **router是用来操作路由的**
>
>  **router为VueRouter的实例，相当于一个全局的路由器对象，里面含有很多属性和子对象，例如history对象。经常用的跳转链接就可以用this.$router.push，和router-link跳转一样。**

```js
const router = useRouter();

router.push({
    name: "news",
    params: { id: "123" },
});
```

![](https://github.com/zockbell/vue3Framework/blob/master/src/assets/screenshot/router.png)

```js
const router = useRouter();

console.log("参数：", route.params.id);
```

### 4.3 导航守卫

1. 全局路由守卫

   ```typescript
   beforeEach(to, from, next) 全局前置守卫，路由跳转前触发
   beforeResolve(to, from, next) 全局解析守卫 在所有组件内守卫和异步路由组件被解析之后触发
   afterEach(to, from) 全局后置守卫，路由跳转完成后触发
   ```

   1. 全局前置守卫

   ```typescript
   // 全局前置守卫
   router.beforeEach((to, from, next) => {
     if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
     // if (to.name !== 'news') next({ name: 'news' })
     else next()
   })
   ```

   ​	    b. 全局解析守卫

   ```typescript
   router.beforeEach((to, from, next) => {
       if (to.meta.title) {
           document.title = to.meta.title
       }
       if (to.matched.some((item) => item.meta.login)) {
           let user_id = getCookie("userId");
           if (user_id) {
               next()
           } else {
               next({ name: 'Login' })
           }
       }
       next()
   })
   ```

   

2. 路由独享守卫

   ```
   beforeEnter(to,from,next) 路由对象单个路由配置 ，单个路由进入前触发
   ```

   ```typescript
   {
   	path: '/news/:id?',
   	name: 'news',
   	beforeEnter: (to, from, next) => {
   		if (localStorage.getItem('userId')) next() // 登录状态
   		else next('/login') // 未登录状态
   	},
   	component: () => import('../views/news/News.vue')
   },
   ```

   

3. 组件路由守卫

   ```
   beforeRouteEnter(to,from,next) 在组件生命周期beforeCreate阶段触发
   beforeRouteUpdadte(to,from,next) 当前路由改变时触发
   beforeRouteLeave(to,from,next) 导航离开该组件的对应路由时触发
   ```

   <u>to： 即将要进入的目标路由对象
   from： 即将要离开的路由对象
   next(Function)：是否可以进入某个具体路由，或者是某个具体路由的路径</u>

### 4.4 vue2 与 vue3 中的差异

> [从vue2迁移](https://router.vuejs.org/zh/guide/migration/)

- `vue2` 中 `router/index.js`

  > 导入 `Vue` 和 `vue-router` 并将其挂载，创建一个 `router` 实例，配置规则然后将其导出

  ```js
  import Vue from 'vue'
  import VueRouter from 'vue-router'
   
  Vue.use(VueRouter)
   
  const routes = []
   
  const router = new VueRouter({
      mode: "history",
      base: "/dist/h5/",
    	routes
  })
   
  export default router
  ```

  

- `vue3` 中 `router/index.js`

  > 不再将 `vue-router` 整个导入，而是导入 `createRouter` 函数来创建 `router` 实例，配置路由模式也适用导入的函数来指定，`createWebHashHistory` 是哈希模式，`createWebHistory` 是历史模式

  ```js
  import { createRouter, createWebHistory } from 'vue-router'
  
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: []
  })
  
  export default router
  ```

  

1. vue3中当浏览器访问路径 不匹配 routes时， **不会跳转到根路径，而是匹配空**

2. [动态路由匹配针对（*） 需要使用pathMatch属性](https://router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes)

   ```js
   // NotFound
   {
       path: '*',  // 在vue3中会失效抛出错误
   	name: 'NotFound',
   	component: () => import('@/views/NotFound/index'),
   	meta: {
   		title: "NotFound"
   	}
   }
   ```

   ![](https://github.com/zockbell/vue3Framework/blob/master/src/assets/screenshot/not_found.png)

   `vue3` 中配置：

   ```js
   {	
       // path: '*',  // vue2  使用*
       path: '/:pathMatch(.*)*', // vue3 使用带有自定义regexp的参数定义
       name: 'NotFound',
       component: () => import('../views/noteFound/NotFound.vue')
   },
   ```

3. 引用方式变化 ，routes属性加入强制判断

4. 不再给路径默认添加`/`，redirect重定向需要写全路径

5. 命名路由不匹配跳转

   ```js
   mounted() {
     // vue3特性 -> 不匹配的命名路由 既不会推送到not-found -> 也不会推送到 / 
       router.push({name: 'errorName'})
   }
   ```

   ![](https://github.com/zockbell/vue3Framework/blob/master/src/assets/screenshot/nomatch.png)

6. [`RouterLink` 标签化](https://router.vuejs.org/zh/api/#router-link-%E7%9A%84-v-slot)

   > vue2 使用 tag
   > [vue3 不能使用tag 使用slot](https://router.vuejs.org/zh/guide/migration/#%E5%88%A0%E9%99%A4-router-link-%E4%B8%AD%E7%9A%84-event-%E5%92%8C-tag-%E5%B1%9E%E6%80%A7)

   ```js
   <RouterLink to="/" custom v-slot="{ navigate }">
   	<span @click="navigate">Home</span>
   </RouterLink>
   <RouterLink to="/about" custom v-slot="{ navigate }">
   	<span @click="navigate">about</span>
   </RouterLink>
   ```

   ![](https://github.com/zockbell/vue3Framework/blob/master/src/assets/screenshot/v-slot.png)



---

## 5. Vuex

vuex数据持久化存储

> 开发中会遇到vuex中的数据刷新页面后消失，则需要数据持久化存储

方式一：

将vuex中的数据直接保存到[浏览器缓存](https://www.csdn.net/so/search?q=%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98&spm=1001.2101.3001.7020)中（sessionStorage、localStorage、cookie）

方式二：

[**vuex-persistedstate插件**](https://www.npmjs.com/package/vuex-persistedstate)

```js
npm install vuex-persistedstate --save
可以选择数据存储的位置，可以是localStorage/sessionStorage/cookie，此处以存储到sessionStorage为例，配置如下：
import createPersistedState from "vuex-persistedstate"

const store = new Vuex.Store({
  // ...
  plugins: [createPersistedState({
      storage: window.sessionStorage
  })]
})
```

## 6. Pinia

> Pinia 是 Vue 的存储库，它允许您跨组件/页面共享状态。一个围绕Vue 3 Composition API的封装器。

### 特点

- dev-tools 支持
  - 跟踪动作、突变的时间线
  - Store 出现在使用它们的组件中
  - time travel 和 更容易的调试
- 热模块更换
  - 在不重新加载页面的情况下修改您的 Store
  - 在开发时保持任何现有状态
- 插件：使用插件扩展 Pinia 功能
- 为 JS 用户提供适当的 TypeScript 支持或 **autocompletion**
- 服务器端渲染支持

### 安装

```js
yarn add pinia
# 或者使用 npm
npm install pinia
```

### `main.ts` 引入

```tsx
import { createPinia } from 'pinia'

app.use(createPinia())
```

### `store/index.js` 中定义 `State` 数据

```tsx
import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  state: () => {
    return {
      count: 0,
      name: 'zhangsan',
      arr:['a','b','c']
    }
  },
  getters:{},
  actions:{}
})
```

### 使用

```js
<script>
import { storeToRefs } from "pinia"; // 使用storeToRefs方法解构
import { useCounterStore } from "../../stores/counter";

const counterStore = useCounterStore();
console.log(counterStore);

// 解构 可以保证解构出来的数据也是响应式的
let { count, name } = storeToRefs(counterStore);

const change = () => {
  count.value = 5;
};
</script>


<template>
	<el-button type="warning" @click="change">
        修改state数据
	</el-button>
</template>
```

![](https://github.com/zockbell/vue3Framework/blob/master/src/assets/screenshot/pinia.png)



### [批量改变`state`状态](https://pinia.web3doc.top/core-concepts/state.html#%E6%94%B9%E5%8F%98%E7%8A%B6%E6%80%81)

>  调用 `$patch` 方法。 它允许您使用部分“state”对象同时应用多个更改

```js
// 批量修改多个值
store.$patch({
    counter: store.count ++,
    title: 'work',
)}
// $patch工厂函数方式
store.$patch((state) => {
    state.count = 99;
    state.title = 'work'
})
//  $state 缺点是必须修改整个对象
store.$state = { count: 88, title: '修改值' }
// 使用action 修改
store.increment()

// 重置 初始值
store.$reset()
```



```js
<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '../store'
const store = useStore();
let { name,counter,arr }  = storeToRefs(store);
const btn = ()=>{
	//批量更新
	store.$patch(state => {
		state.count++;
        state.name = 'lisi';
		state.arr.push('d');
	})
}
</script>
```

### `Pinia` 分模块使用

> Pinia不需要像Vuex一样使用modules分模块，Pinia可在store目录中直接定义对应模块就可以了

* 目录结构

  ```js
  store/user.js
  store/book.js
  store/cart.js
  ...
  ```

* 使用时单独引入

### `Pinia` 持久化存储

1. 安装插件 [`pinia-plugin-persistedstate`](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/) ：

   ```
   npm i pinia-plugin-persistedstate
   ```

   - 使用 [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) 进行存储

   - [`store.$id`](https://pinia.vuejs.org/api/interfaces/pinia.StoreProperties.html) 作为 storage 默认的 key

   - 使用 [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)/[`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) 进行序列化/反序列化

   - 整个 state 默认将被持久化

     

2. 在 `store/index.js` 中引入

   ```js
   import { createPinia } from 'pinia'
   import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
   
   const pinia = createPinia()
   pinia.use(piniaPluginPersistedstate)
   
   export default pinia
   ```

3. `main.js` 引入 `store/index.js`

   ```typescript
   // import { createPinia } from 'pinia'
   import stores from './stores/index.js'
   ......
   
   // app.use(ElementPlus).use(createPinia()).use(router).mount('#app')
   app.use(ElementPlus).use(stores).use(router).mount('#app')
   ```

   

4. `store/counter.js` 多种方式配置数据缓存

   1. `persist: true` 开启数据缓存

   2. 这个 Store 将被持久化存储在 `localStorage` 中的 `counter` key 中。

   3. 将数据持久化到的 storage 中，这个 store 将被持久化存储在 [`sessionStorage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage)中。

   4. paths 用于指定 state 中哪些数据需要被持久化。该 store 中, 只有 `count` 被持久化，而 `name` 不会被持久化。

      ```typescript
      persist: {
        key: 'counter', // Key 用于引用 storage 中的数据
        storage: sessionStorage,
        paths: ['count'],
      }
      ```

      

   ```typescript
   import { ref, computed } from 'vue'
   import { defineStore } from 'pinia'
   
   
   export const useCounterStore = defineStore('counter', () => {
     const count = ref(0)
     const name = ref('zhangsan')
     const doubleCount = computed(() => count.value * 2)
     function increment() {
       count.value++;
       name.value = 'lisi'
     }
   
     return { count, name, doubleCount, increment }
   
   },
     // {
     //   persist: true,  // 开启数据缓存
     // }
     {
       persist: {
         key: 'counter', // Key 用于引用 storage 中的数据
         storage: sessionStorage,
         paths: ['count'],
       }
     }
   )
   
   
   /*
   setup() {
     const count = ref(0)
     const doubleCount = computed(() => count.value * 2)
     function increment() {
       count.value++
     }
   
     return { count, doubleCount, increment }
   },
   computed: {
     quadrupleCounter() {
       return useCounterStore.doubleCounter * 2
     },
   }
   */
   
   
   /*
   export const useCounterStore = defineStore('counter', {
     state: () => {
       return {
         count: 0,
       }
     },
     getters: {
       doubleCount(state) {
         return state.count * 2
       }
     },
     actions: {
       increment(payload) {
         this.count += payload;
       }
     },
     persist: true,    // 开启数据缓存
     persist: {
       key: 'counter', // Key 用于引用 storage 中的数据
       storage: sessionStorage,
     }
   })
   */
   ```

   ![](https://github.com/zockbell/vue3Framework/blob/master/src/assets/screenshot/pinia-plugin-persistedstate.png)

### **`Pinia` 和 `Vuex` 的区别**

- 支持选项式api和组合式api写法
- Pinia 没有 mutations, 只有： state、getters、actions（支持同步和异步）
- Pinia 分模块不需要modules（如果想使用多个store，直接定义多个store传入不同的id，不同Store 之间可以相互调用）
- TypeScript 支持很好，与 TypeScript 一起使用具有可靠的类型推断支持
- 自动化代码拆分
- Pinia体积小，约1kb

---

## 7. [volar](https://www.imooc.com/article/317810)

### 	7.1 简介

​		`vetur`是一个`vscode`插件，用于为`.vue`单文件组件提供代码高亮以及语法支持。

​		`vue`以及`vetur`对于`ts`的支持，并不友好，随着vue3全新的`composition-api`推出，与此同时，`volar`顺应而生。

### 	7.2 安装

直接在`vscode`的插件市场搜索`volar`，然后点击安装即可。

![](https://github.com/zockbell/vue3Framework/blob/master/src/assets/screenshot/volar.png)

### 	7.3 功能

1. 不再需要唯一根标签

   ![](https://github.com/zockbell/vue3Framework/blob/master/src/assets/screenshot/root.png)

2. 编辑器快捷分割

   `vue`单文件组件，按照功能，存在`template`、`script`、`style`三个根元素。`volar`将此拆分成多个视窗。

   ![](https://github.com/zockbell/vue3Framework/blob/master/src/assets/screenshot/split_ico.png)

   volar`v1.0.11`版本删除了这个拆分图标，社区提问为啥拆分图标没了，[作者的回答是为了节省视图空间](https://github.com/johnsoncodehk/volar/issues/2162)

   目前，此功能用户可以通过设置自行决定开启此拆分功能

   ![](https://github.com/zockbell/vue3Framework/blob/master/src/assets/screenshot/split_editor.png)

   ![](https://github.com/zockbell/vue3Framework/blob/master/src/assets/screenshot/split.png)

3. `style`里面的`class`引用，样式中出现`reference`的小图标时，代表着当前`class`的引用，点击可以弹出具体的使用位置，可对其进行修改及追溯。

   ![](https://github.com/zockbell/vue3Framework/blob/master/src/assets/screenshot/reference.png)

---

## 8. @ 目录配置

1. 方式一：
   1. 在`vite.config.js`文件中引入：

   ```js
   import { fileURLToPath, URL } from 'node:url'
   ```

   2. 配置别名：

      ```js
      export default defineConfig({
        plugins: [vue()],
        resolve: {
          alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
          }
        }
      })
      ```

2.  方式二：

   1. 在`vite.config.js`文件中引入`path`路径

      ```js
      const path = require('path');
      ```

   2. 配置别名：

      ```js
      export default defineConfig({
        plugins: [vue()],
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './src')
          }
        }
      })
      
      ```

`tsconfig.json` 配置：

```typescript
{
  "compilerOptions": {
    "target": "ESNext",
    ...
 
    // 配置@别名
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }, 
  },
}
```

> 如果**运行不了或报错**试下安装下 @types/node  (npm install @types/node )

---

## 9. sass 预处理器

	### 4.1 安装

```
npm install --save-dev sass
```

### 9.2 [配置](https://cli.vuejs.org/zh/guide/css.html#%E5%90%91%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8-loader-%E4%BC%A0%E9%80%92%E9%80%89%E9%A1%B9)

打开`vite.config.js`文件，添加配置信息：

```js
css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/variable/variable.scss";'
      }
    }
  }
```

![](https://github.com/zockbell/vue3Framework/blob/master/src/assets/screenshot/sass1.png)

可直接使用：

![](https://github.com/zockbell/vue3Framework/blob/master/src/assets/screenshot/sass2.png)

也可按需引入：

![](https://github.com/zockbell/vue3Framework/blob/master/src/assets/screenshot/sass3.png)

---

## 10.  [开发配置 host、port、浏览器自动打开及反向代理跨域配置](https://cn.vitejs.dev/config/server-options.html)

`vite.config.js`中添加server：

```js
server: {
    port: 3001,			//端口号
    strictPort: false,	//是否是严格的端口号，如果true，端口号被占用的情况下，vite会退出
    host: 'localhost',
    cors: true,			//为开发服务器配置CORS,默认启用并允许任何源
    https: false,		//是否支持http2
    open: true,			//是否自动打开浏览器
    // 反向代理 跨域配置
    proxy: {
      '/api': {
        target: "https://xxx.xxx.cn/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
```

---

## 11. axios

1. 安装

   ```node
   npm install axios --save
   ```

2. 二次封装

   > 新建utils/request.js

   ```js
   import axios from 'axios';
   
   console.log(process.env.NODE_ENV, '环境')
   let dev_pro = process.env.NODE_ENV;
   
   let baseURL = '';
   
   if (dev_pro == 'production') {
     baseURL = '/'; // 生产环境配置
   } else {
     baseURL = '/api/'; // 开发环境配置
   }
   
   //1. 创建axios对象
   const service = axios.create({
     baseURL: baseURL,
     timeout: 10000, // request timeout
   });
   
   //1. 创建axios对象
   const service = axios.create({
     baseURL: "/api/",
     timeout: 10000, // request timeout
   });
   
   //2. 请求拦截器
   service.interceptors.request.use(config => {
     return config;
   }, error => {
     Promise.reject(error);
   });
   
   //3. 响应拦截器
   service.interceptors.response.use(response => {
     //判断code码
     return response;
   }, error => {
     return Promise.reject(error);
   });
   
   export default service;
   ```

3.  API解耦

   ```js
   import request from '../utils/request'
   
   export function mostNew( data ){
   	return request({
   		url:'/search/request.anys',
   		method:"post",
   		data
   	})
   }
   ```

---

## 12. [vue-devtools](https://chrome.zzzmh.cn/#/extension) [安装](https://github.com/vuejs/devtools)

不翻墙可以使用“[极简插件](https://chrome.zzzmh.cn/#/extension)”搜索并下载，安装。

![](https://github.com/zockbell/vue3Framework/blob/master/src/assets/screenshot/devtools.png)

---

## 13. [element-plus](https://element-plus.gitee.io/zh-CN/guide/quickstart.html) 组件

1. 安装：

   ```js
   npm install element-plus --save  or
   yarn add element-plus
   ```

2. 引入：

   ```tsx
   import { createApp } from 'vue'
   import ElementPlus from 'element-plus'
   import 'element-plus/dist/index.css'
   import App from './App.vue'
   
   const app = createApp(App)
   
   app.use(ElementPlus)
   app.mount('#app')
   ```

3. Volar 支持

   `tsconfig.json` 中通过 `compilerOptions.type` 指定全局组件类型。

   ```js
   // tsconfig.json
   {
     "compilerOptions": {
       // ...
       "types": ["element-plus/global"]
     }
   }
   ```

4. 按需导入：

   > 安装`unplugin-vue-components` 和 `unplugin-auto-import`这两款插件

   ```node
   npm install -D unplugin-vue-components unplugin-auto-import
   ```

5. 配置 vite：

   ```js
   // vite.config.ts
   import { defineConfig } from 'vite'
   import AutoImport from 'unplugin-auto-import/vite'
   import Components from 'unplugin-vue-components/vite'
   import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
   
   export default defineConfig({
     // ...
     plugins: [
       // ...
       AutoImport({
         resolvers: [ElementPlusResolver()],
       }),
       Components({
         resolvers: [ElementPlusResolver()],
       }),
     ],
   })
   ```

6. 使用

   ```vue
   <el-button type="success">Success</el-button>
   ```

   ![](https://github.com/zockbell/vue3Framework/blob/master/src/assets/screenshot/scccess.png)

---

## 14. Normalize

> Normalize.css 是一个可以定制的 CSS 文件，它让不同的浏览器在渲染网页元素的时候形式更统一。

1. 安装：

   ```node
   npm install normalize.css --save
   ```

2. 新建 `base.scss`  ，将`1rem`转换成`100px`

   ```scss
   html { font-size: 100px; } 
   ```

    对不同设备进行适配

   ```js
   <script>
   var width = document.documentElement.clientWidth || document.body.clientWidth;
   var ratio = width / 375;
   var fontSize = ratio * 100;
   document.getElementByTagName('html')[0].style['font-size'] = fontSize  + 'px';
   </script>
   ```

   使用`rem`作为单位

   ```scss
   .div p { font-size: .16rem; }
   ```

---

## 15. iconfont

> 可使用在线链接，也可直接将iconfont图标下载至本地。

1. 将下载的包放入 `/src/assets/` 下

2. 在`main.ts`引入：

   ```js
   import './assets/fonts/iconfont.css'
   ```

3. 使用：

   ```vue
   <h1 class="iconfont icon-paizhao"></h1>
   ```

---

## 16. unplugin-auto-import

> 为 [Vite](https://so.csdn.net/so/search?q=Vite&spm=1001.2101.3001.7020)、Webpack、Rollup 和 esbuild **按需自动导入 API**。支持 TypeScript,解决在开发中的导入问题。

1. 安装

   ```node
   npm i -D unplugin-auto-import
   ```

2. 配置`vite.config.js`

   ```js
   import { defineConfig } from 'vite'
   import vue from '@vitejs/plugin-vue'
   // import AutoImport from "@vitejs/plugin-vue"
   import AutoImport from 'unplugin-auto-import/vite'
   // https://vitejs.dev/config/
   export default defineConfig({
     plugins: [
         vue(),
         AutoImport({
           imports:["vue","vue-router"],
           resolvers: [ElementPlusResolver()], // elemenet-plus
           dts:'src/auto-import.d.ts'    // 路径下自动生成文件夹存放全局指令
         }),
    
     ],
   })
   ```

3. 生成的`auto-import.d.ts` 目录

   **注：上面配置完毕dts后可能并不会自动生成auto-import.d.ts文件，可以重新运行一下项目，或者关闭编辑器重新打开运行即可。**

4. 使用：

   1. 使用前

      ```js
      import { computed, ref } from 'vue'
      const count = ref(0)
      const doubled = computed(() => count.value * 2)
      ```

   2. 使用后

      ```js
      const count = ref(0)
      const doubled = computed(() => count.value * 2)
      ```

---

## 17. [BEM命名规则](https://www.jianshu.com/p/6b3535635b2e?v=1679995362705)

> BEM是指：块（block）、元素（element）、修饰符（modifier）的简写

1. 定义

   ```js
   1、块（block） 
   2、元素（element） 
   3、修饰符（modifier） 
   4、-（中划线）：仅作为连接字符使用，表示某个块或者子元素的多个单词之间的链接符号。 
   5、__（双下划线）：用来链接块与块的子元素 6、--（双中线）：用来链接块元素与修饰符
   ```

2. 使用

   ```vue
   <style>
       .list{}
       .list__item{}
       .list__item--red{}
       .list__item--green{}
   </style>
   
   <div class="list">
       <div class="list__item"></div>
       <div class="list__item--red"></div>
       <div class="list__item--green"></div>
   </div>
   ```

---

## 18. 打包部署

1. `vite.config.js` 中的几项配置：

   ```js
   base: '/vue3',	// 公共基础路径（默认为：/）与vue2版本中的publicPathg相同
   build: {
   	outDir: "vue3",	// 输出目录（默认为：dist）
   	assetsDir: "vue3assets",	// 在输出目录下放置资源的目录（默认为："assets"）
       assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
       cssCodeSplit: true, // 启用/禁用 CSS 代码拆分
       sourcemap: false, // 构建后是否生成 source map 文件
       //自定义底层的 Rollup 打包配置
       rollupOptions: {
         input: {//可以配置多个，表示多入口
           index: path.resolve(__dirname, "index.html"),
           // project:resolve(__dirname,"project.html")
         },
         output: {
           // chunkFileNames:'static/js/[name]-[hash].js',
           // entryFileNames:"static/js/[name]-[hash].js",
           // assetFileNames:"static/[ext]/name-[hash].[ext]"
         }
       },
       emptyOutDir: true, // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
   }
   ```

   正确配置了 `base` 目录，打包后的 `index.html` 中的 `script` 的 `src` 和 `link` 中的 `href` 才会输入正确路径，否则部署后路径会报 `404`

   ```vue
   <title>vue3</title>
   <script type="module" crossorigin src="/vue3/vue3assets/index-6086c509.js"></script>
   <link rel="stylesheet" href="/vue3/vue3assets/index-0677123c.css">
   ```

   

2. 项目打包：

```
npm run build
```

3. nginx 添加 `try_files` 配置

```typescript
location /dist {
	root   /opt/home;
	index  /dist/index.html;
	try_files $uri $uri/ /dist/index.html;
}
```

4. 将项目上传至相应目录，重启`nginx`即可访问

```
nginx -s reload
```

## 19. 线上demo
> http://82.157.205.207/vue3/

