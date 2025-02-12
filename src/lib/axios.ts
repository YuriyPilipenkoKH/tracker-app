import axiosInstance  from 'axios'
import { Transaction } from '../models/transaction';

const HOST = import.meta.env.VITE_HOST

export const axios = axiosInstance.create({
  
  baseURL:  `${HOST}/api`,
  withCredentials:true,
  headers: { "Content-Type": "application/json" }
})

