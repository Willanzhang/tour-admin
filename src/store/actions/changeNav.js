/**
 * action 类型
 */
export const CHANGE_NAV1 = 'CHANGE_NAV1'

/**
 * action创建函数
 * @param {} nav1Num 
 */
export function changeNav1(nav1Num) {
  return {
    type: CHANGE_NAV1,
    nav1Num: nav1Num
  }
}