import ROLE from '../roles'
import userService from '../services/userService'
import agentService from '../services/agentService'

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

export const getUser = (email, role) => {
    return async dispatch => {
        let user
        if(role === ROLE.USER) {
            user = await userService.getUser(email)
        } else {
            user = await agentService.getAgent(email)
        }

        dispatch({
            type: 'GET_USER',
            user
        })
    }
}

export const editUser = (user, role) => {
    return async dispatch => {
        if(role === ROLE.USER) {
            user = await userService.editUser(user)
        } else {
            user = await agentService.editAgent(user)
        }

        dispatch({
            type: 'EDIT_USER',
            user
        })
    }
}

const reducer = (state = { user: null }, action) => {
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
        default:
            return state
    }
}

export default reducer