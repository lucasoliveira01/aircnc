import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.0.24:3333'
    // baseURL: 'http://172.20.10.10:3333'
})

export default api;