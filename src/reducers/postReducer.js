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
    return async () => {
        if (!liked) {
            let likeRequestDTO = {
                'PostID': postId,
                'UserID': userId
            }
            await postService.likePost(likeRequestDTO)
        } else {
            await postService.unlikePost(userId, postId)
        }
    }
}

export const dislikePost = (userId, postId, disliked) => {
    return async () => {
        if (!disliked) {
            let dislikeRequestDTO = {
                'PostID': postId,
                'UserID': userId
            }
            await postService.dislikePost(dislikeRequestDTO)
        } else {
            await postService.undislikePost(userId, postId)
        }
    }
}

export const reportPost = (postId) => {
    return async () => {
        await postService.report(postId)
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