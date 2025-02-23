import axiosInstance  from 'axios'

const HOST = import.meta.env.VITE_HOST

export const axios = axiosInstance.create({
  
  baseURL:  `${HOST}/api`,
  withCredentials:true,
  headers: { "Content-Type": "application/json" }
})

export const setAuthHeader = (token:string ) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const clearAuthHeader =  () =>  {
  axios.defaults.headers.common.Authorization = '';
}