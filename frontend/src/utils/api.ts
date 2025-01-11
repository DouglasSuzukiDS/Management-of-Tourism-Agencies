import axios, { AxiosInstance } from 'axios'

const url = axios.create({
   baseURL: 'http://localhost:3001',
})

const token = localStorage.getItem('token')

url.defaults.headers.common['Authorization'] = `Bearer ${token}`

export const api: AxiosInstance = url;