import request from '@/utils/http'
 // 获取一级分类数据
export function getCategoryAPI(id) {
    return request({
        url: '/category',
        params: {
            id
        }
    })
}

/**
 * @description: 获取二级分类列表数据
 * @param {*} id 二级分类id
 * @return {*}
 */
export const getCategoryFilterAPI = (id) => {
  return request({
    url:'/category/sub/filter',
    params:{
      id
    }
  })
}
