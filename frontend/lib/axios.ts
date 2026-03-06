import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api', // Địa chỉ Laravel của ông giáo
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export default axiosClient
