/**
 * 时间过滤器
 * @param {*} timestamp 时间戳
 * @param {*} format 格式化的自定义格式，默认为YYYY-MM-DD hh:mm:ss
 */
let timestampFormat = (timestamp, format) => {
  let result = ''
  let zeroFill = val => val < 10 ? '0' + val : val

  timestamp = parseInt(timestamp, 10) * 1000
  format = format || 'YYYY-MM-DD hh:mm:ss'

  if (!timestamp) {
    result = '-'
  } else {
    let sFormat = format
    format = format.split(' ')
    let dateFormat = format[0]
    let timeFormat = format[format.length - 1]
    let dateSymbol = dateFormat.match(/[^Y,^M,^D]/)[0]
    let timeSymbol = timeFormat.match(/[^h,^m,^s]/)[0]
    let clearance = sFormat.replace(dateFormat, '').replace(timeFormat, '')
    let datetime = new Date(timestamp)
    let year = datetime.getFullYear()
    let month = zeroFill(datetime.getMonth() + 1)
    let day = zeroFill(datetime.getDate())
    let hours = zeroFill(datetime.getHours())
    let minute = zeroFill(datetime.getMinutes())
    let second = zeroFill(datetime.getSeconds())
    if (dateFormat.match(/Y/)) {
      result += year
    }
    if (dateFormat.match(/M/)) {
      result += dateSymbol + month
    }
    if (dateFormat.match(/D/)) {
      result += dateSymbol + day
    }
    if (timeFormat.match(/h/)) {
      result += clearance + hours
    }
    if (timeFormat.match(/m/)) {
      result += timeSymbol + minute
    }
    if (timeFormat.match(/s/)) {
      result += timeSymbol + second
    }
  }

  return result.replace(/^[^\d]+/, '')
}

/**
 * 
 */
let hoursFormat = (val) => {
  // return new Date(time * 1000).toLocaleTimeString()
  let time = new Date(val * 1000)
  let hour = time.getHours()
  if(hour < 10) hour = '0'+ hour
  let min =  time.getMinutes()
  if(min < 10) min = '0'+ min
  return `${hour}:${min}`
}

/**
 * 价格过滤器，/100 && 保留两位小数
 */
let priceFilterNoPrefix = (price) => {
  return (price / 100).toFixed(2)
}

/**
 * 有货币符号的价格，保留两位小数
 * @param {*} price 分为单位
 * @param {*} prefix 货币单位
 * @param {*} type 当值为2时，三位一个单元，例：333,444,555
 */
let priceFilter = (price, prefix = '¥', type) => {
  let money = (price / 100).toFixed(2)
  if (type === 2) {
    money = money.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  }
  return prefix + money
}

let priceFilterFloat = (price, prefix = '¥') => {
  return prefix + parseFloat((price / 100))
}

/*
 *格式化手机号码
 */
let codeFilter = (val) => {
  if (val) {
    let str = ''
    for (let i = 0, len = val.length; i < len; i++) {
      str += val[i]
      if ((i + 1) % 4 === 0) {
        str += ' '
      }
    }
    return str
  }
}

/**
 *格式化时间
 */
let timeFilter = (val) => {
  let now = new Date(new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate())
  let time = new Date(new Date(val * 1000).getFullYear() + '/' + (new Date(val * 1000).getMonth() + 1) + '/' + new Date(val * 1000).getDate())
  let less = (now - time) / 86400000
  let hour = new Date(val * 1000).getHours()
  let minu = new Date(val * 1000).getMinutes()
  hour = hour < 10 ? '0' + hour : hour
  minu = minu < 10 ? '0' + minu : minu
  switch (less) {
    case 0:
      return '今天' + hour + ':' + minu
    case 1:
      return '昨天' + hour + ':' + minu
    default:
      return parseInt(less, 10) + '天前'
  }
}

/**
 * fmt 格式 'yyyy-MM-dd' 'yyyy-MM-dd HH:mm:ss'
 *时间格式化
 */
let timeFormat = (val, fmt) => {
  let data = new Date(val * 1000)
  let o = {
    'M+': data.getMonth() + 1, // 月份
    'd+': data.getDate(), // 日
    'h+': data.getHours(), // 小时
    'm+': data.getMinutes(), // 分
    's+': data.getSeconds(), // 秒
    'q+': Math.floor((data.getMonth() + 3) / 3), // 季度
    'S': data.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

/**
 * 支付状态过滤
 */
let payStatusFilter = (val) => {
  let payStatus = {
    1: '未支付',
    2: '已支付',
    3: '已过期已取消'
  }
  return payStatus[Number(val)]
}

/**
 * 支付方式过滤
 */
let payTypeFilter = (val) => {
  let payType = {
    1: '微信支付'
  }
  return payType[Number(val)]
}

/**
 * 退款状态过滤
 */
let refundStatusFilter = (val) => {
  console.log(val)
  let refundStatus = {
    1: '未退款',
    2: '已退款',
    3: '部分退款',
    4: '已拒绝'
  }
  return refundStatus[Number(val)]
}

/**
 * 退款状态过滤
 */
let refundStatusOrder = (val) => {
  let refundStatus = {
    0: '—',
    1: '退款中',
    2: '全退款',
    3: '部分退款',
    4: '已拒绝'
  }
  return refundStatus[Number(val)]
}

/**
 * 票务模式过滤
 */
let modeTypeFilter = (val) => {
  let modeType = {
    1: '自主模式',
    2: '接口对接模式'
  }
  return modeType[Number(val)]
}

/*
*售后状态
*/
let afterSalesStatus = (val) => {
  var status = {
    1: '处理中',
    2: '退款完成',
    3: '退款取消'
  }
  return status[Number(val)]
}

/*
* 退款状态
*/
let refundStatusText = (val) => {
  var status = {
    1: '退款中',
    2: '已退款',
    3: '退款拒绝',
    4: '退款取消'
  }
  return status[Number(val)]
}

/**
 * 订单状态
 */
let orderStatus = (val) => {
  var status = {
    1: '待付款',
    2: '已完成',
    3: '退款中',
    4: '已关闭',
    5: '已付款'
  }
  return status[Number(val)]
}

/*
*定点类型
*/
let orderType = (val) => {
  var status = {
    1: '景区门票',
    2: '车船票'
  }
  return status[Number(val)]
}

/*
*维权原因
*/
let refundReason = (val) => {
  var status = {
    1: '买/卖双方协商一致',
    2: '买错/多买/不想要',
    3: '第三方未出票',
    4: '其他'
  }
  return status[Number(val)]
}
/*
*订单详情状态
*/
let extStatus = (val) => {
  var status = {
    1: '未出票',
    2: '出票中',
    3: '出票失败',
    4: '未使用',
    5: '已使用',
    6: '退款中',
    7: '已退款'
  }
  return status[Number(val)]
}

/**
 * 权限判断
 * 110为创始人，最高管理权限的人
 */
let roleFilter = val => {
  switch (Number(val)) {
    case 1:
      return '普通管理员'
    case 2:
      return '高级管理员'
    case 3:
      return '核销员'
    case 110:
      return '高级管理员'
    default:
      return '未知类型'
  }
}

/**
 * 数据百分比化，保留两位小数， 本身是0的情况，返回0
 */
let toPercentage = val => {
  if (typeof val !== "number") throw new Error('toPercentage输入数据错误')
  if (!val) return '0%'
  return (val * 100).toFixed(2) + '%'
}

export {
  timestampFormat, // 时间过滤器
  priceFilterNoPrefix, //价格过滤器，/100 && 保留两位小数
  hoursFormat, // 小时过滤
  priceFilter, //有货币符号的价格，保留两位小数
  priceFilterFloat, //价格过滤
  codeFilter, //格式化手机号码
  timeFilter, //格式化时间
  timeFormat, //格式 'yyyy-MM-dd' 'yyyy-MM-dd HH:mm:ss'
  payStatusFilter, //支付状态过滤
  payTypeFilter, //支付方式过滤
  refundStatusFilter, //退款状态过滤
  refundStatusOrder, //退款状态过滤
  modeTypeFilter,  //票务模式过滤
  refundStatusText, //退款状态
  afterSalesStatus,// 售后状态
  orderStatus, // 订单状态
  orderType, //订单类型
  refundReason, //维权原因
  extStatus, //订单详情状态
  roleFilter, // 权限判断
  toPercentage, //数据百分比化，保留两位小数
}
