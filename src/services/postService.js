import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL

const getPosts = async () => {
    const response = await axios.get(`${BASE_URL}/posts`)
    return response.data
}

const postService = {
    getPosts
}


export default postService