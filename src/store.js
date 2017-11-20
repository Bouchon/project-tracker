import { createStore } from 'redux'
import { persistReducer } from 'redux-persist'
import session from 'redux-persist/lib/storage/session'
import localForage from 'localforage'

import root from './reducers/root'

const persistConfig = { key: 'primary', storage: localForage }
const reducer = persistReducer(persistConfig, root)
const store = createStore(reducer, undefined)
export default store