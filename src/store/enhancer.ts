import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'
import routeHistory from 'route-history'

const middleware = [thunk, routerMiddleware(routeHistory)]

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger)
}
const enhancer = applyMiddleware(...middleware)

export default enhancer
