import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { log } from 'console'
export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      cartList: [], // 购物车数据
      select: [], // 选中的商品id
    }
  },
  getters: {  // Getter 完全等同于 store 的 state 的计算值
    isChecked() {
      return this.select.length == this.cartList.length;
    },
    // 总价和数量
    total() {
      let total = {
        price: 0,
        number: 0
      }

      this.cartList.forEach(item => {
        if(this.select.indexOf(item.id) != -1) {
          total.price += item.counter * item.discountPrice;
          total.number += item.counter;  // 像京东一样，一个产品的数量可以是多个
          // total.number = this.select.length;
        }
      })

      return total;
    }
  },
  actions: {
    addCart(list) {
      list.forEach(v => {
        v['check'] = true;
        this.select.push( v.id );
      })
      this.cartList = list;
      // console.log(this.cartList);
    },
    // 全选
    all() {
      this.select = this.cartList.map((item) => {
        item['check'] = true;
        return item.id;
      })
    },
    // 全不选
    unAll() {
      this.cartList.forEach((item) => {
        item['check'] = false;
      })
      this.select = []
    },
    // 单选
    radio(item, i) {
      if(item.check) {
        this.select.push(item.id);
      }else{
        let index = this.select.indexOf(item.id);
        this.select.splice(index, 1);
      }
      // console.log(item.id);

      /*
      let id = this.cartList[i].id;
      let idx = this.select.indexOf(id);
      if(idx > -1) {
        this.cartList[i].check = false;
        this.select.splice(idx ,1);
      } else {
        this.cartList[i].check = true;
        this.select.push(id);
      }
      */
    }
  },
})