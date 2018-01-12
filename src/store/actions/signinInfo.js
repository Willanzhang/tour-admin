/**
 * action 类型
 */
export const SIGNIN_INFO = 'SIGNIN_INFO'

/**
 * action创建函数
 * @param {info}  登录信息
 */
export function signinInfo(signinInfo) {
  return {
    type: SIGNIN_INFO,
    signinInfo: signinInfo
  }
}