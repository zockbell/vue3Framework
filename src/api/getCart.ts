import request from '@/utils/request'

// 获取token
export function createToken() {
  return request({
    url: 'http://testapi.xuexiluxian.cn/api/token/createToken',
    method: "get"
  })
}

// 获取购物车商品
export function getShopCarList(params, token) {
  return request({
    url: 'http://testapi.xuexiluxian.cn/api/shopcar/getShopCarList',
    method: "get",
    params
    // headers: {
    //   token
    // }
  })
}
