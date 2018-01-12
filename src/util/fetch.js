import 'whatwg-fetch'
import { baseUrl } from './env'
import { message } from 'antd'
import { browserHistory } from 'react-router'

export default (type = 'GET', url = '', data = {}) => {
  let subsystemTourInfo = JSON.parse(localStorage.getItem('subsystemTourInfo')) || {}
  if (!subsystemTourInfo && !subsystemTourInfo.token) {
    subsystemTourInfo = JSON.parse(localStorage.getItem('subsystemTourInfo'))
  }

  return new Promise((resolve, reject) => { //返回一个promise
    type = type.toUpperCase()
    url = baseUrl + url
    let requestObj = {
      method: type,
      headers: {
        'callbackurl': window.location.href
      }
    }

    requestObj.headers['Content-Type'] = 'application/json;charset=UTF-8'
    // 带上store-user-token
    if (subsystemTourInfo && subsystemTourInfo.token) requestObj.headers['store-user-token'] = subsystemTourInfo.token

    if (type === 'GET') {
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        if (data[key] === 0 || data[key]) {
          dataStr += key + '=' + data[key] + '&'
        }
      })
      if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
    } else if (type === 'POST') {
      Object.defineProperty(requestObj, 'body', {
        value: JSON.stringify(data)
      })
    } else {
      reject('error type')
    }

    fetch(url, requestObj).then(res => {
      let status = Number(res.status)
      if (status === 400) {
        res.json().then((data) => {
          message.error(data.errmsg)
        })
        return
      } else if (status === 401 || status === 403) {
        res.json().then((data) => {
          // 401跳转到登录页
          message.error(data.errmsg)
          browserHistory.push('/tour-login')
        })
        return
      } else if (status === 404) {
        message.error(`接口404, ${url}`)
        return reject(res)
      } else if (status === 500) {
        res.json().then((data) => {
          message.error(data.errmsg)
        })
        return
      }
      return res.json()
    }).then(data => {
      if (data) {
        if (parseInt(data.errcode, 10) === 403 || parseInt(data.errcode, 10) === 401) {
          // 登录过期   未登录
          message.error(data.errmsg)
          browserHistory.push('/tour-login')
          return
        } else if (parseInt(data.errcode, 10)) {
          message.error(data.errmsg)
          reject(data.errmsg)
        } else {
          resolve(data)
        }
      } else {
        reject('no data')
      }
    }).catch(err => {
      reject(err)
    })
  })
}
