import { combineReducers } from 'redux'
import { MINI_REGISTER } from 'src/store/actions/miniRegister'

function canPublish(state=false, action) {
  switch (action.type) {
    case MINI_REGISTER:
      return action.registerState
    default:
      return state
  }
}

const registerState = combineReducers({
  canPublish
})

export default registerState