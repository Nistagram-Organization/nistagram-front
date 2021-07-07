import axios from 'axios'

const BASE_URL = process.env.REACT_APP_GATEWAY_URL || process.env.REACT_APP_ADMIN_URL

const decideOnPost = async (decision, token) => {
    const response = await axios.post(`${BASE_URL}/administration/content`, decision, { headers: { Authorization: `Bearer ${token}` } })
    return response.data
}

const adminService = {
    decideOnPost
}


export default adminService