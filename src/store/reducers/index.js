import { combineReducers } from 'redux'
// 导航菜单变更
import changeNav from './changeNav'
// 小程序是否已注册
import registerState from './miniRegister'
// 运营商信息
import platform from './initPlatform'
// 登录人信息
import signin from './signinInfo'

const reducers = combineReducers({
  changeNav,
  registerState,
  platform,
  signin,
})
export default reducers