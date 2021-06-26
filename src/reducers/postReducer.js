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

export const likePost = (userId, postId) => {
    return async() => {
        let likeRequestDTO = {
            'PostID': postId,
            'UserID': userId
        }
        await postService.likePost(likeRequestDTO)
    }
}

export const unlikePost = (userId, postId) => {
    return async() => {
        let likeRequestDTO = {
            'PostID': postId,
            'UserID': userId
        }
        console.log(likeRequestDTO)
        await postService.unlikePost(likeRequestDTO)
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