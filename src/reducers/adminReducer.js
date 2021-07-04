import postService from '../services/postService'

export const getInappropriateContent = () => {
    return async dispatch => {
        const reports = await postService.getInappropriateContent()

        dispatch({
            type: 'GET_INAPPROPRIATE_CONTENT',
            reports
        })
    }
}

const reducer = (state = { reports: null, adminRequests: null }, action) => {
    switch (action.type) {
        case 'GET_INAPPROPRIATE_CONTENT': {
            return {
                ...state,
                reports: action.reports
            }
        }
        default:
            return state
    }
}

export default reducer