import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(`${baseUrl}`)
    return response.data
}

const create = async (blog) => {
    console.log(blog)
    const config = {
        headers: {
            'Authorization': token
        }
    }
    const response = await axios.post(`${baseUrl}`,blog, config)
    return response.data
}

const update = async (blogId,blog) => {
    const config = {
        headers: {
            'Authorization': token
        }
    }
    const response = await axios.put(`${baseUrl}/${blogId}`,blog, config)
    return response.data
}

export default { getAll, create, setToken, update }