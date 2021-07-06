import postService from '../services/postService'
import { setNotification } from './notificationReducer'
import SEVERITY from '../severity'

export const getUsersPosts = (shownUser, loggedInUser) => {
    return async dispatch => {
        const posts = await postService.getUsersPosts(shownUser, loggedInUser)

        dispatch({
            type: 'GET_POSTS',
            posts
        })
    }
}

export const getPostsFeed = (loggedInUser) => {
    return async dispatch => {
        const posts = await postService.getPostsFeed(loggedInUser)

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
        'user_email': userEmail,
        'text': comm,
    }

    return async () => {
        await postService.postComment(commentToPost)
    }
}

export const searchTags = (tag, userEmail) => {
    return async dispatch => {
        let posts = null
        try {
            posts = await postService.searchTags(tag, userEmail)
        } catch (e) {
            dispatch(setNotification(e.response.data.message, SEVERITY.ERROR))
        }

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