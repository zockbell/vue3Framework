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
      storage: localStorage,
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