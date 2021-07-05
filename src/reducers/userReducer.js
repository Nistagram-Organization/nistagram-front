import userService from '../services/userService'

export const addPostToFavorites = (userEmail, postId, favorite) => {
    return async () => {
        if (!favorite) {
            let favoritesDTO = {
                'PostID': postId,
                'UserEmail': userEmail
            }
            await userService.addPostToFavorites(favoritesDTO)
        } else {
            await userService.removePostFromFavorites(userEmail, postId)
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
        const user = await userService.getUserByUsername(username)

        dispatch({
            type: 'GET_USER_BY_USERNAME',
            user
        })
    }
}

export const editUser = (user) => {
    return async dispatch => {
        user = await userService.editUser(user)

        dispatch({
            type: 'EDIT_USER',
            user
        })
    }
}

export const followUser = (userEmail, loggedInUser) => {
    return async dispatch => {
        let followRequest = {
            User: loggedInUser,
            UserToFollow: userEmail
        }
        await userService.followUser(followRequest)

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