export const LOGIN = '@@LOGIN'
export const LOGOUT = '@@LOGOUT'

export function logIn (id, email, name, token) {
    return {
        type: LOGIN,
        payload: { id, email, name, token }
    }
}

export function logOut () {
    return { 
        type: LOGOUT,
        payload: { id: '', email: '', name: '', token: '' }
    }
}