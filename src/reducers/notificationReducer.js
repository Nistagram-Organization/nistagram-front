export const setNotification = (message, severity) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            message,
            severity
        })
    }
}

const reducer = (state = { message: null, severity: null }, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION': {
            return {
                ...action
            }
        }
        default:
            return state
    }
}

export default reducer