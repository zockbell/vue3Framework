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