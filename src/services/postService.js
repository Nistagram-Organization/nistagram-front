import axios from 'axios'

const BASE_URL = process.env.REACT_APP_POSTS_URL

const getPosts = async () => {
    const response = await axios.get(`${BASE_URL}/posts`)
    return response.data
}

const likePost = async (likeRequestDTO) => {
    const response = await axios.post(`${BASE_URL}/posts/like`, likeRequestDTO)
    return response.data
}

const unlikePost = async (userEmail, postId) => {
    const response = await axios.delete(`${BASE_URL}/posts/like?user_mail=${userEmail}&post_id=${postId}`)
    return response.data
}

const dislikePost = async (dislikeRequestDTO) => {
    const response = await axios.post(`${BASE_URL}/posts/dislike`, dislikeRequestDTO)
    return response.data
}

const undislikePost = async (userEmail, postId) => {
    const response = await axios.delete(`${BASE_URL}/posts/dislike?user_mail=${userEmail}&post_id=${postId}`)
    return response.data
}

const report = async (postId) => {
    const response = await axios.post(`${BASE_URL}/posts/report/${postId}`)
    return response.data
}

const postComment = async (comment) => {
    const response = await axios.post(`${BASE_URL}/posts/comment`, comment)
    return response.data
}

const postService = {
    getPosts,
    likePost,
    unlikePost,
    dislikePost,
    undislikePost,
    report,
    postComment
}


export default postService