export const LOGIN = '@@LOGIN'
export const LOGOUT = '@@LOGOUT'
export const LOGIN_SUCCESS = '@@LOGIN_SUCCESS'
export const LOGIN_ERROR = '@@LOGIN_ERROR'

export function logIn (id, password) {
    return (dispatch) => {
        setTimeout(() => handleLogin(id, password), 1000)
    }
}
function handleLogin (dispatch, id, password) {
    if(id === password)
        dispatch(loginSuccess({
            name: id,
            email: id + '@sandbox.com'
        }))
    else
        dispatch(loginError())
}

export function loginSuccess (user) {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            status: 'success',
            response: user
        }
    }
}

export function loginError () {
    return {
        type: LOGIN_ERROR,
        payload: {
            status: 'error',
            response: 'Invalid "id" or "password"'
        }
    }
}

export function logOut () {
    return { 
        type: LOGOUT,
        payload: {
            status: 'logged-out',
            response: {}
        }
    }
}