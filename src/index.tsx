import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import store from 'store'
import App from './components/App'

const render = () => {
  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('root'))
}

render()
