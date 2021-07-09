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

export const getPostsFeed = (loggedInUser, token) => {
    return async dispatch => {
        const posts = await postService.getPostsFeed(loggedInUser, token)

        dispatch({
            type: 'GET_POSTS',
            posts
        })
    }
}

export const likePost = (userEmail, postId, liked, token) => {
    return async dispatch => {
        if (!liked) {
            let likeRequestDTO = {
                'PostID': postId,
                'UserEmail': userEmail
            }
            await postService.likePost(likeRequestDTO, token)
        } else {
            await postService.unlikePost(userEmail, postId, token)
        }

        dispatch({
            type: 'LIKE_POST'
        })
    }
}

export const dislikePost = (userEmail, postId, disliked, token) => {
    return async dispatch => {
        if (!disliked) {
            let dislikeRequestDTO = {
                'PostID': postId,
                'UserEmail': userEmail
            }
            await postService.dislikePost(dislikeRequestDTO, token)
        } else {
            await postService.undislikePost(userEmail, postId, token)
        }

        dispatch({
            type: 'DISLIKE_POST'
        })
    }
}

export const reportPost = (postId, token) => {
    return async dispatch => {
        await postService.report(postId, token)

        dispatch({
            type: 'REPORT_POST'
        })
    }
}

export const sendComment = (userEmail, postId, comm, token) => {
    let commentToPost = {
        'PostID': postId,
        'user_email': userEmail,
        'text': comm,
    }

    return async dispatch => {
        await postService.postComment(commentToPost, token)

        dispatch({
            type: 'POST_COMMENT'
        })
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