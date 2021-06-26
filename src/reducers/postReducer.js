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

export const likePost = (userId, postId, liked) => {
    return async() => {
        let likeRequestDTO = {
            'PostID': postId,
            'UserID': userId
        }
        !liked ? await postService.likePost(likeRequestDTO) : await postService.unlikePost(likeRequestDTO)
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