import userService from '../services/userService'
import { setNotification } from './notificationReducer'
import SEVERITY from '../severity'

export const addPostToFavorites = (userEmail, postId, favorite, token) => {
    return async () => {
        if (!favorite) {
            let favoritesDTO = {
                'PostID': postId,
                'UserEmail': userEmail
            }
            await userService.addPostToFavorites(favoritesDTO, token)
        } else {
            await userService.removePostFromFavorites(userEmail, postId, token)
        }
    }
}

export const getUser = (email) => {
    return async dispatch => {
        const user = await userService.getUser(email)

        dispatch({
            type: 'GET_USER',
            user
        })
    }
}

export const getUserByUsername = (username) => {
    return async dispatch => {
        let user = null
        try {
            user = await userService.getUserByUsername(username)
        } catch (e) {
            dispatch(setNotification(e.response.data.message, SEVERITY.ERROR))
        }

        dispatch({
            type: 'GET_USER_BY_USERNAME',
            user
        })
    }
}

export const editUser = (user, token) => {
    return async dispatch => {
        user = await userService.editUser(user, token)

        dispatch({
            type: 'EDIT_USER',
            user
        })
    }
}

export const followUser = (userEmail, loggedInUser, token) => {
    return async dispatch => {
        let followRequest = {
            User: loggedInUser,
            UserToFollow: userEmail
        }
        await userService.followUser(followRequest, token)

        dispatch({
            type: 'FOLLOWING_USER',
            following: true
        })
    }
}

export const checkIfUserIsFollowing = (userEmail, loggedInUser) => {
    return async dispatch => {
        let following = await userService.checkIfUserIsFollowing(userEmail, loggedInUser)

        dispatch({
            type: 'FOLLOWING_USER',
            following
        })
    }
}

const reducer = (state = { user: null, shown: null, following: false }, action) => {
    switch (action.type) {
        case 'GET_USER': {
            return {
                ...action
            }
        }
        case 'EDIT_USER': {
            return {
                ...action
            }
        }
        case 'GET_USER_BY_USERNAME': {
            return {
                ...state,
                shown: action.user
            }
        }
        case 'FOLLOWING_USER': {
            return {
                ...state,
                following: action.following
            }
        }
        default:
            return state
    }
}

export default reducer