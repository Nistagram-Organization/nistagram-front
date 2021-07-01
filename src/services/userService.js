import axios from 'axios'

const BASE_URL = process.env.REACT_APP_USERS_URL

const getUser = async (email) => {
    const response = await axios.get(`${BASE_URL}/users`, { params: { email: email } })
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


const userService = {
    getUser,
    editUser,
    addPostToFavorites,
    removePostFromFavorites
}

export default userService