import { combineReducers } from 'redux'
// 一级导航菜单所在的栏，用key保存这个全局状态
import { SIGNIN_INFO } from 'src/store/actions/signinInfo'

function signinInfo(state={}, action) {
  switch (action.type) {
    case SIGNIN_INFO:
      return action.signinInfo
    default:
      return state
  }
}

const signin = combineReducers({
  signinInfo
})

export default signin