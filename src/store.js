import { compose, applyMiddleware, createStore } from 'redux'
import { persistCombineReducers, persistStore } from 'redux-persist'
import session from 'redux-persist/lib/storage/session'
import localForage from 'localforage'

import root from './reducers/root'

const DEFAULT_STATE = {
    login: {
        id: '',
        email: '',
        token: ''
    }
}

const config = { key: 'primary', storage: localForage }
const reducer = persistCombineReducers(config, root)
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, undefined, enhancer(applyMiddleware()))
persistStore(store, null, () => store.getState())
export default store