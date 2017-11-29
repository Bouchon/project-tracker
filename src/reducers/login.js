import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../action-creators/login'

const defaultState = { id: '', email: '', name: '', token: '' }

export default (state, action) => {
    state = state === undefined ? defaultState : state
    switch (action.type) {
        case LOGIN:
        case LOGOUT:
            return { ...action.payload }
        case 'persist/REHYDRATE':
            return action.payload === undefined ? { ...state } : { ...action.payload.login }
        default: 
            return { ...state }
    }
}