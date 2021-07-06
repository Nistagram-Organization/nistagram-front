import axios from 'axios'

const BASE_URL = process.env.REACT_APP_GATEWAY_URL || process.env.REACT_APP_POSTS_URL

const likePost = async (likeRequestDTO) => {
    const response = await axios.post(`${BASE_URL}/posts/like`, likeRequestDTO)
    return response.data
}

const unlikePost = async (userEmail, postId) => {
    const response = await axios.delete(`${BASE_URL}/posts/like`, {
        params: {
            post_id: postId,
            user_mail: userEmail
        }
    })
    return response.data
}

const dislikePost = async (dislikeRequestDTO) => {
    const response = await axios.post(`${BASE_URL}/posts/dislike`, dislikeRequestDTO)
    return response.data
}

const undislikePost = async (userEmail, postId) => {
    const response = await axios.delete(`${BASE_URL}/posts/dislike`, {
        params: {
            post_id: postId,
            user_mail: userEmail
        }
    })
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

const createPost = async (post) => {
    const response = await axios.post(`${BASE_URL}/posts`, post)
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

const getInappropriateContent = async () => {
    const response = await axios.get(`${BASE_URL}/posts/inappropriate`)
    return response.data
}

const getPostsFeed = async (loggedInUser) => {
    const response = await axios.get(`${BASE_URL}/posts/feed`, {
        params: {
            user: loggedInUser,
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