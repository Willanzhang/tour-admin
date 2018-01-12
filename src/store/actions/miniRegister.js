/**
 * action 类型
 */
export const MINI_REGISTER = 'MINI_REGISTER'

/**
 * action创建函数
 * @param {registerState} 小程序注册状态：true 注册成功，false 未注册
 */
export function changeRegisterState(registerState) {
  return {
    type: MINI_REGISTER,
    registerState: registerState
  }
}