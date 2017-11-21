import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../action-creators/login'

export default (state, payload) => {
    switch (payload.type) {
        case LOGIN:
        case LOGOUT:
            return { ...payload.payload }
        case 'persist/REHYDRATE':
            return { ...payload.payload.login }
        default: 
            return { ...state }
    }
}