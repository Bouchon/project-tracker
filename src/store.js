import { createStore } from 'redux'
import { persistReducer } from 'redux-persist'
import session from 'redux-persist/lib/storage/session'
import localForage from 'localforage'

import root from './reducers/root'

const DEFAULT_STATE = {
    login: {
        state: 'logged-out',
        email: '',
        token: ''
    }
}

const persistConfig = { key: 'primary', storage: localForage }
const reducer = persistReducer(persistConfig, root)
const store = createStore(reducer, DEFAULT_STATE, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default store