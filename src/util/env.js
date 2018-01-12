/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl : 路由地址域名
 *
 */
let baseUrl
let routerMode

if (process.env.NODE_ENV === 'development') {
  baseUrl = ''
  routerMode = 'history'
} else {
  baseUrl = 'https://piaoapi.vikduo.com'
  routerMode = 'history'
}

export {baseUrl, routerMode}
