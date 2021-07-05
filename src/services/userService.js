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

const editUser = async (user) => {
    const response = await axios.put(`${BASE_URL}/users`, user)
    return response.data
}

const addPostToFavorites = async (favoritesDTO) => {
    const response = await axios.post(`${BASE_URL}/users/favorites`, favoritesDTO)
    return response.data
}

const removePostFromFavorites = async (userEmail, postId) => {
    const response = await axios.delete(`${BASE_URL}/users/favorites`, {
        params: {
            post_id: postId,
            user_mail: userEmail
        }
    })
    return response.data
}

const followUser = async (followRequest) => {
    const response = await axios.post(`${BASE_URL}/users/following`, followRequest)
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


const userService = {
    getUser,
    editUser,
    addPostToFavorites,
    removePostFromFavorites,
    getUserByUsername,
    checkIfUserIsFollowing,
    followUser
}

export default userService