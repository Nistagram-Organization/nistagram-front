import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL

const getPosts = async () => {
    const response = await axios.get(`${BASE_URL}/posts`)
    return response.data
}

const likePost = async (likeRequestDTO) => {
    const response = await axios.post(`${BASE_URL}/posts/like`, likeRequestDTO)
    return response.data
}

const unlikePost = async (likeRequestDTO) => {
    console.log(likeRequestDTO)
    const response = await axios.delete(`${BASE_URL}/posts/like`, { data:likeRequestDTO })
    return response.data
}

const postService = {
    getPosts,
    likePost,
    unlikePost
}


export default postService