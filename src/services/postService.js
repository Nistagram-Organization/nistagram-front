import axios from 'axios'

const BASE_URL = process.env.REACT_APP_GATEWAY_URL || process.env.REACT_APP_POSTS_URL

const likePost = async (likeRequestDTO, token) => {
    const response = await axios.post(`${BASE_URL}/posts/like`, likeRequestDTO, { headers: { Authorization: `Bearer ${token}` } })
    return response.data
}

const unlikePost = async (userEmail, postId, token) => {
    const response = await axios.delete(`${BASE_URL}/posts/like`, {
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

const dislikePost = async (dislikeRequestDTO, token) => {
    const response = await axios.post(`${BASE_URL}/posts/dislike`, dislikeRequestDTO, { headers: { Authorization: `Bearer ${token}` } })
    return response.data
}

const undislikePost = async (userEmail, postId, token) => {
    const response = await axios.delete(`${BASE_URL}/posts/dislike`, {
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

const report = async (postId, token) => {
    const response = await axios.post(`${BASE_URL}/posts/report/${postId}`, null, { headers: { Authorization: `Bearer ${token}` } })
    return response.data
}

const postComment = async (comment, token) => {
    const response = await axios.post(`${BASE_URL}/posts/comment`, comment, { headers: { Authorization: `Bearer ${token}` } })
    return response.data
}

const createPost = async (post, token) => {
    const response = await axios.post(`${BASE_URL}/posts`, post, { headers: { Authorization: `Bearer ${token}` } })
    return response.data
}

const getUsersPosts = async (shownUser, loggedInUser) => {
    const response = await axios.get(`${BASE_URL}/posts`, {
        params: {
            user: shownUser,
            logged_in_user: loggedInUser
        }
    })
    return response.data
}

const getInappropriateContent = async (token) => {
    const response = await axios.get(`${BASE_URL}/posts/inappropriate`, { headers: { Authorization: `Bearer ${token}` } })
    return response.data
}

const getPostsFeed = async (loggedInUser, token) => {
    const response = await axios.get(`${BASE_URL}/posts/feed`, {
        params: {
            user: loggedInUser,
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

const searchTags = async (tag, userEmail) => {
    const response = await axios.get(`${BASE_URL}/posts/search`, {
        params: {
            tag: tag,
            user: userEmail
        }
    })
    return response.data
}

const postService = {
    likePost,
    unlikePost,
    dislikePost,
    undislikePost,
    report,
    postComment,
    createPost,
    getInappropriateContent,
    getUsersPosts,
    getPostsFeed,
    searchTags
}


export default postService