/**
 * action 类型
 */
export const INIT_PLATFORM = 'INIT_PLATFORM'

/**
 * action创建函数
 * @param {info}  平台信息
 */
export function initPlatform(info) {
  return {
    type: INIT_PLATFORM,
    info: info
  }
}