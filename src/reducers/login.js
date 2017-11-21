import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../action-creators/login'

export default (state = { status: 'logged-out' }, payload) => {
    switch (payload.type) {
        case LOGIN: return { ...state, status: 'pending' }
        case LOGIN_SUCCESS: return { ...state, status: 'success', response: payload.response }
        case LOGIN_ERROR: return { ...state, status: 'error', response: payload.response }
        case LOGOUT: return { ...state, status: 'logged-out', response: {} }
        default: return { ...state }
    }
}