import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../action-creators/login'

const defaultState = { id: '', email: '', token: '' }

export default (state, payload) => {
    state = state === undefined ? defaultState : state
    switch (payload.type) {
        case LOGIN:
        case LOGOUT:
            return { ...payload.payload }
        case 'persist/REHYDRATE':
            return payload.payload === undefined ? { ...state } : { ...payload.payload.login }
        default: 
            return { ...state }
    }
}