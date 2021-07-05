import axios from 'axios'

const BASE_URL = process.env.REACT_APP_GATEWAY_URL || process.env.REACT_APP_AUTH_URL

const register = async (registrationRequest) => {
    const response = await axios.post(`${BASE_URL}/register`, registrationRequest)
    return response.data
}

const authService = {
    register
}

export default authService
