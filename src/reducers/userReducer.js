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

const reducer = (state = { user: null, shown: null }, action) => {
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
        default:
            return state
    }
}

export default reducer