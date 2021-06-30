import axios from 'axios'

const BASE_URL = process.env.REACT_APP_USERS_URL

const getAgent = async (email) => {
    const response = await axios.get(`${BASE_URL}/agents`, { params: { email: email } })
    return response.data
}

const editAgent = async (agent) => {
    const response = await axios.put(`${BASE_URL}/agents`, agent)
    return response.data
}

const agentService = {
    getAgent,
    editAgent
}

export default agentService