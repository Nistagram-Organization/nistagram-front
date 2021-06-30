import axios from 'axios'

const BASE_URL = process.env.REACT_APP_USERS_URL

const addPostToFavorites = async (favoritesDTO) => {
    const response = await axios.post(`${BASE_URL}/users/favorites`, favoritesDTO)
    return response.data
}

const RemovePostFromFavorites = async (userEmail, postId) => {
    const response = await axios.delete(`${BASE_URL}/users/favorites?post_id=${postId}&user_mail=${userEmail}`)
    return response.data
}

const userService = {
    addPostToFavorites,
    RemovePostFromFavorites
}

export default userService