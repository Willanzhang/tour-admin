import fetch from 'src/util/fetch'

// 财务结算数据汇总
const fetchGetTotal = params => fetch('GET', '/store/data_order/get-total', params)

// 财务结算明细
const fetchFindTotal = params => fetch('GET', '/store/data_order/find-total', params)

// 结算明细结算明细数据
const fetchFindList = params => fetch('GET', '/store/data_order/find', params)

// 支付明细
const fetchFindPay = params => fetch('GET', '/store/data_order/find-pay', params)

// 退款明细
const fetchFindRefund = params => fetch('GET', '/store/data_order/find-refund', params)

// 交易分析
// 交易数据汇总
const fetchTransactionTotal = params => fetch('GET', '/store/analysis/find-total', params)

// 交易数据by每天
const fetchTransactionByDate = params => fetch('GET', '/store/analysis/find-date', params)

// 核销
// 核销汇总
const fetchVerificationTotal = params => fetch('GET', '/store/writeoff/find-total', params)

// 核销数据明细
const fetchVerificationByDate = params => fetch('GET', '/store/writeoff/find-total-all', params)

// 核销详情明细
const fetchVerificationDetail = params => fetch('GET', '/store/writeoff/find', params)

export {
  fetchGetTotal,
  fetchFindTotal,
  fetchFindList,  
  fetchFindPay,
  fetchFindRefund,
  fetchTransactionTotal,
  fetchTransactionByDate,
  fetchVerificationTotal,
  fetchVerificationByDate,
  fetchVerificationDetail
}