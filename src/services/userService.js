import axios from 'axios'

const BASE_URL = process.env.REACT_APP_GATEWAY_URL || process.env.REACT_APP_USERS_URL

const getUser = async (email) => {
    const response = await axios.get(`${BASE_URL}/users`, { params: { email: email } })
    return response.data
}

const getUserByUsername = async (username) => {
    const response = await axios.get(`${BASE_URL}/users/${username}`)
    return response.data
}

const editUser = async (user, token) => {
    const response = await axios.put(`${BASE_URL}/users`, user, { headers: { Authorization: `Bearer ${token}` } })
    return response.data
}

const addPostToFavorites = async (favoritesDTO, token) => {
    const response = await axios.post(`${BASE_URL}/users/favorites`, favoritesDTO,  { headers: { Authorization: `Bearer ${token}` } })
    return response.data
}

const removePostFromFavorites = async (userEmail, postId, token) => {
    const response = await axios.delete(`${BASE_URL}/users/favorites`, {
        params: {
            post_id: postId,
            user_mail: userEmail
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

const followUser = async (followRequest, token) => {
    const response = await axios.post(`${BASE_URL}/users/following`, followRequest, { headers: { Authorization: `Bearer ${token}` } })
    return response.data
}

const checkIfUserIsFollowing = async (userEmail, loggedInUser) => {
    const response = await axios.get(`${BASE_URL}/users/following`, {
        params: {
            user: loggedInUser,
            following_user: userEmail
        }
    })
    return response.data
}

const muteUser = async (muteRequest, token) => {
    const response = await axios.post(`${BASE_URL}/users/muted`, muteRequest, { headers: { Authorization: `Bearer ${token}` } })
    return response.data
}

const checkIfUserIsMuted = async (userEmail, loggedInUser) => {
    const response = await axios.get(`${BASE_URL}/users/muted`, {
        params: {
            user: loggedInUser,
            muted_user: userEmail
        }
    })
    return response.data
}


const userService = {
    getUser,
    editUser,
    addPostToFavorites,
    removePostFromFavorites,
    getUserByUsername,
    checkIfUserIsFollowing,
    followUser,
    checkIfUserIsMuted,
    muteUser
}

export default userService