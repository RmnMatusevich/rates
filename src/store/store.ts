import { createStore, Store } from 'redux'

import { IAction, IAppState } from './models'
import rootReducer from './rootReducer'
import enhancer from './enhancer'

export type TAppStore = Store<IAppState>

const store: TAppStore = createStore<IAppState, IAction<any>, any, any>(rootReducer, enhancer)

export default store
