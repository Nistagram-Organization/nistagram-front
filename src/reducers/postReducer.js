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

export const likePost = (userEmail, postId, liked) => {
    return async () => {
        if (!liked) {
            let likeRequestDTO = {
                'PostID': postId,
                'UserEmail': userEmail
            }
            await postService.likePost(likeRequestDTO)
        } else {
            await postService.unlikePost(userEmail, postId)
        }
    }
}

export const dislikePost = (userEmail, postId, disliked) => {
    return async () => {
        if (!disliked) {
            let dislikeRequestDTO = {
                'PostID': postId,
                'UserEmail': userEmail
            }
            await postService.dislikePost(dislikeRequestDTO)
        } else {
            await postService.undislikePost(userEmail, postId)
        }
    }
}

export const reportPost = (postId) => {
    return async () => {
        await postService.report(postId)
    }
}

export const sendComment = (userEmail, postId, comm) => {
    let commentToPost = {
        'PostID': postId,
        'UserEmail': userEmail,
        'Text': comm,
    }

    return async () => {
        await postService.postComment(commentToPost)
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