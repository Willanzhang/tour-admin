import { combineReducers } from 'redux'
// 一级导航菜单所在的栏，用key保存这个全局状态
import { INIT_PLATFORM } from 'src/store/actions/initPlatform'

function platformInfo(state={}, action) {
  switch (action.type) {
    case INIT_PLATFORM:
      return action.info
    default:
      return state
  }
}

const platform = combineReducers({
  platformInfo
})

export default platform