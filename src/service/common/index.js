import fetch from 'src/util/fetch'

// 获取登陆信息
const fetchLogin = params => fetch('POST', '/store/manager/login', params)

 // 今日实时数据
 const fetchRealTime = params => fetch('GET', '/store/data_order/get-today', params)

export {
  fetchLogin,
  fetchRealTime
}