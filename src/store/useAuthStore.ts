import {create} from 'zustand'
import { User } from '../types/userTypes';
import { axios } from '../lib/axios';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import capitalize from '../lib/capitalize';
import { wait } from '../lib/wait';
import { signUpSchemaType } from '../models/signUpSchema';
import { LoginSchemaType } from '../models/loginSchema';



interface AuthStoreTypes {
  authUser: User | null 
  pending: boolean

  signUp: (data: signUpSchemaType) => Promise<boolean | undefined>
  login: (data: LoginSchemaType) => Promise<boolean | undefined>
  checkAuth: () => Promise<void>
  logOut: () => Promise<void>
}

export const useAuthStore = create<AuthStoreTypes>((set,get) => ({
  authUser: null,
  pending: false,

  checkAuth: async() =>{
    set({ pending: true });
    try {
      const response = await axios.get('/auth/session')
      // console.log('response',response.data);
      set({authUser: response.data})

    } catch (error) {
      set({authUser: null})
      console.log('error in checkAuth', error)
    }
    finally{
      set({pending: false})
    }
  },
  signUp : async (data) => {
    set({ pending: true });
    try {
      const response = await axios.post('/auth/signup', data)
      if (response.data) {
        set({authUser: response.data.user})
        toast.success('Account created!')
        await wait(1000) 
        toast.success(`Welcome, ${capitalize(response.data.user.name)} !`)

        return true
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      }
      console.log('error in signUp', error)
      return false
    }
    finally{
      set({pending: false})
    }
  
  },
  login : async (data) => {
    set({ pending: true });
  
    try {
      const response = await axios.post('/auth/login', data)
      if (response.data) {
        set({authUser: response.data.user})
        await wait(1000)
        toast.success(`Hello, ${capitalize(response.data.user.name)} !`)

      return true
    } 
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      }
      return false
    }
    finally{
      set({pending: false})
    }
  },
  logOut: async () => {
    set({ pending: true });
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
    finally{
      set({pending: false})
    }
  },
}))


