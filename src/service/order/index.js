import fetch from 'src/util/fetch'

// 订单列表
const fetchOrderList = params => fetch('POST', '/store/scenery_order/find', params)

// 售后订单列表
const fetchOfterSalesList = params => fetch('POST', '/store/after_sales/find', params)

// 订单详情数据
const fetchOrderDetail = params => fetch('POST', '/store/scenery_order/detail', params)

// 售后订单详情数据
const fetchOfterSalesDetail = params => fetch('POST', '/store/after_sales/detail', params)

export {
    fetchOrderList,
    fetchOfterSalesList,
    fetchOrderDetail,
    fetchOfterSalesDetail
}