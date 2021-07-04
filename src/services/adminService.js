import axios from 'axios'

const BASE_URL = process.env.REACT_APP_ADMIN_URL

const decideOnPost = async (decision) => {
    const response = await axios.post(`${BASE_URL}/administration/content`, decision)
    return response.data
}

const adminService = {
    decideOnPost
}


export default adminService