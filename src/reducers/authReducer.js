import jwt_decode from 'jwt-decode'

const ROLES_KEY = 'https://nistagram/roles'

export const setAuth = (getToken) => {
    return async dispatch => {
        const token = await getToken()
        const roles = jwt_decode(token)[ROLES_KEY]

        dispatch({
            type: 'SET_AUTH',
            token,
            roles
        })
    }
}

const reducer = (state = { token: null, roles: null }, action) => {
    switch (action.type) {
        case 'SET_AUTH': {
            return {
                ...action
            }
        }
        default:
            return state
    }
}

export default reducer