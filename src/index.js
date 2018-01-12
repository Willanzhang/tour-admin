import React from 'react'
import ReactDOM from 'react-dom'
import { Router,browserHistory } from 'react-router'
import routes from 'src/routes'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from 'src/store/reducers'
import './common.less'

const store = createStore(reducers)
console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      { routes }
    </Router>
  </Provider>,
  document.getElementById('root')
)