import {create} from 'zustand'
import { User } from '../types/userTypes';
import { axios } from '../lib/axios';

const HOST = import.meta.env.VITE_HOST;
const BASE_URL = HOST;

interface AuthStoreTypes {
  authUser: User | null 
  isCheckingAuth: boolean
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStoreTypes>((set,get) => ({
  authUser: null,
  isCheckingAuth: true,
  checkAuth: async() =>{
    try {
      const response = await axios.get('/auth/check')
      // console.log('response',response.data);
      set({authUser: response.data})

    } catch (error) {
      set({authUser: null})
      console.log('error in checkAuth', error)
    }
    finally{
      set({isCheckingAuth: false})
    }
  },
}))