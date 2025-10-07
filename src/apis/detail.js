import request from '@/utils/http'
// 获取详情页数据
export const getDetail = (id)  => {
  return request({
    url:'/goods',
    params:{
      id
    }
  })
}
