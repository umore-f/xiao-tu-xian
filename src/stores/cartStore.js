// 封装购物车模块
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // 1.定义state - cartList
  const cartList = ref([])
  // 2.定义action - addCart
  const addCart = (goods) => {
    // 添加购物车操作
    // 添加过 - count + 1
    // 没添加过 - 直接push
    const item = cartList.value.find((item) => goods.skuId === item.skuId)
    if(item) {
      // 找到了
      item.count++
    } else {
      // 没找到
      cartList.value.push(goods)
    }
  }
  // 删除购物车
  const delCart = (skuId) => {
    const idx = cartList.value.findIndex((item)=>{skuId===item.skuId})
    cartList.value.splice(idx,1)
  }
  // 计算属性
  // 1.总的数量 所有项的count之和
  const allCount = computed(() => cartList.value.reduce((a,c) => a + c.count,0))
  // 2.总价 所有项的count*price之和
  const allPrice = computed(() => cartList.value.reduce((a,c) => a + c.count*c.price,0))

  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
  }
},{
  persist:true
})
