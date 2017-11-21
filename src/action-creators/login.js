export const LOGIN = '@@LOGIN'
export const LOGOUT = '@@LOGOUT'

export function logIn (id, email, token) {
    return {
        type: LOGIN,
        payload: { id, email, token }
    }
}

export function logOut () {
    return { 
        type: LOGOUT,
        payload: { id: '', email: '', token: '' }
    }
}