import { compose, applyMiddleware, createStore } from 'redux'
import { persistCombineReducers, persistStore } from 'redux-persist'
import session from 'redux-persist/lib/storage/session'
import localForage from 'localforage'
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import root from './reducers/root'

const config = { 
    key: 'primary', 
    storage: localForage,
    whitelist: ['login', 'project'],
    debug: true
}

function configureStore() {
    const history = createHistory()
    const middleware = routerMiddleware(history)
    const reducer = persistCombineReducers(config, { ...root, router: routerReducer })
    const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose    
    const store = createStore(reducer, undefined, enhancer(applyMiddleware(middleware)))
    const persistor = persistStore(store)
    return { store, persistor, history }
}

export default configureStore