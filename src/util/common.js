let add = (arg1, arg2) => {
  let r1
  let r2
  let m
  let c
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  c = Math.abs(r1 - r2)
  m = Math.pow(10, Math.max(r1, r2))
  if (c > 0) {
    let cm = Math.pow(10, c)
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''))
      arg2 = Number(arg2.toString().replace('.', '')) * cm
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm
      arg2 = Number(arg2.toString().replace('.', ''))
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''))
    arg2 = Number(arg2.toString().replace('.', ''))
  }
  return (arg1 + arg2) / m
}

let sub = (arg1, arg2) => {
  let r1
  let r2
  let m
  let n
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  n = (r1 >= r2) ? r1 : r2
  return Number(((arg1 * m - arg2 * m) / m).toFixed(n))
}

let mul = (arg1, arg2) => {
  let m = 0
  let s1 = arg1.toString()
  let s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

let div = (arg1, arg2) => {
  let t1 = 0
  let t2 = 0
  let r1
  let r2
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {}
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}

// 获取cookie值
let getCookie = function(objname) {
  var arrstr = document.cookie.split('; ')
  for (var i = 0; i < arrstr.length; i++) {
    var temp = arrstr[i].split('=');
    if (temp[0] === objname) return unescape(temp[1])
  }
}

// 设置cookie
let setCookie = function (name, value, days) {
  var d = new Date()
  d.setTime(d.getTime() + 24*60*60*1000*days)
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString()
}

// 加载腾讯地图
let loadTenMapScript = function () {
  var script = document.createElement("script")
  script.type = "text/javascript"
  script.src = "https://map.qq.com/api/js?v=2.exp&key=TDCBZXVQ34XQFUEDG6F37SBHT42FU5&callback=initMap";
  document.body.appendChild(script)
}

// 价格过滤器
let priceFilter = (price) => {
  return Math.abs(price) / 100
}

// 获取连接query参数
let getQuery = (string) => {
  var reg = new RegExp("(^|&)" + string + "=([^&]*)(&|$)")
  var r = window.location.search.substr(1).match(reg)
  if (r)return decodeURI(r[2])
  return false
}

// null undefined 空 值剔除判断
let nullValueFilter = (test) => {
  for (var propName in test) { 
      if (test[propName] === null || test[propName] === undefined || test[propName] === '') {
        delete test[propName]
      }
  }
  return test
}

let timeTextListEvent =() => {
  let timeTextList = []
    for(let i=0; i<=23; i++){
      for(let j=0; j<=1; j++){
        let text = null
        if(j === 0){
          text = '00'
        } else {
          text = '30'
        }
        if(i>=10) {
          timeTextList.push(i.toString() + ':' + text)
        } else {
          timeTextList.push('0' + i + ':' + text)
        }
      }
      if (i===23) {
        timeTextList.push(i.toString() + ': 59')
      }
    }
    return timeTextList || []
}

export {
  add, // 加
  sub, // 减
  mul, // 乘
  div, // 除
  getCookie, // 获取cookie值
  setCookie, // 设置cookie值
  loadTenMapScript, // 异步加载腾讯地图
  priceFilter, // 价格过滤
  getQuery, // 获取连接query参数
  nullValueFilter,
  timeTextListEvent  //时间区段
}