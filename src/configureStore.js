import { compose, applyMiddleware, createStore } from 'redux'
import { persistCombineReducers, persistStore } from 'redux-persist'
import session from 'redux-persist/lib/storage/session'
import localForage from 'localforage'

import root from './reducers/root'

const config = { 
    key: 'primary', 
    storage: localForage,
    whitelist: ['login'],
    debug: true
}
const reducer = persistCombineReducers(config, root)
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function configureStore() {
    let store = createStore(reducer, undefined, enhancer(applyMiddleware()))
    let persistor = persistStore(store)
    return { store, persistor }
}

export default configureStore