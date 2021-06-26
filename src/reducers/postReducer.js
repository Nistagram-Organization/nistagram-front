import postService from '../services/postService'

export const getPosts = () => {
    return async dispatch => {
        const posts = await postService.getPosts()

        dispatch({
            type: 'GET_POSTS',
            posts
        })
    }
}

const reducer = (state = { list: [] }, action) => {
    switch (action.type) {
        case 'GET_POSTS': {
            return {
                ...state,
                list: action.posts
            }
        }
        default:
            return state
    }
}

export default reducer