// 封装购物车模块
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user'
import {insertCartAPI,findNewCartListAPI} from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
  const useStore = useUserStore()
  const isLogin = computed(() => useStore.userInfo.token)
  // 1.定义state - cartList
  const cartList = ref([])
  // 2.定义action - addCart
  const addCart = async (goods) => {
    const {skuId,count} = goods
    if (isLogin.value) {
      // 登录之后的加入购车逻辑
      await insertCartAPI({ skuId, count })
      const res = await findNewCartListAPI()
      cartList.value = res.result
      // updateNewList()
    } else {
      // 添加购物车操作
      // 添加过 - count + 1
      // 没添加过 - 直接push
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        // 找到了
        item.count++
      } else {
        // 没找到
        cartList.value.push(goods)
      }
    }
  }
  // 删除购物车
  const delCart = (skuId) => {
    const idx = cartList.value.findIndex((item) => skuId === item.skuId)
    cartList.value.splice(idx, 1)
  }
  // 单选功能
  const singleCheck = (skuId, selected) => {
    // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }
  // 全选功能
  const allCheck = (selected) => {
    // 把cartList中的每一项的selected都设置为当前的全选框状态
    cartList.value.forEach((item) => { item.selected = selected })
  }
  // 计算属性
  // 1.总的数量 所有项的count之和
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  // 2.总价 所有项的count*price之和
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
  // 3.已选择数量
  const selectCount = computed(() => cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count, 0))
  // 4.已选择商品价钱合计
  const selectCountPrice = computed(() => cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count * c.price, 0))
  // 是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))
  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    allCheck,
    selectCount,
    selectCountPrice
  }
}, {
  persist: true
})
