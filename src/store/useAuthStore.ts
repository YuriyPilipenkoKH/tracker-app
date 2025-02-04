import {create} from 'zustand'
import { User } from '../types/userTypes';
import { axios } from '../lib/axios';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { wait } from '../lib/wait';
import capitalize from '../lib/capitalize';

const HOST = import.meta.env.VITE_HOST;
const BASE_URL = HOST;

interface AuthStoreTypes {
  authUser: User | null 
  isCheckingAuth: boolean
  isLoggingIn: boolean,
  logIn: () => Promise<boolean | undefined>
  checkAuth: () => Promise<void>
  logOut: () => Promise<void>
}

export const useAuthStore = create<AuthStoreTypes>((set,get) => ({
  authUser: null,
  isCheckingAuth: true,
  isLoggingIn: false,
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
  logIn : async () => {
    try {
      const response = await axios.post('/auth/login',)
      if (response.data) {
        set({authUser: response.data.user})
        await wait(1000)
        toast.success(`Hello, ${capitalize(response.data.user.name)} !`)

      return true
    } 
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      }
      return false
    }
    finally{
      set({isLoggingIn: false})
    }
  },
  logOut: async () => {
    try {
      const response = await axios.post('/auth/logout')
      if (response.status === 200) {
        set({authUser: null})
        toast.success(`Logout successful !`)
      }

    }  catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      }
    }
  },
}))