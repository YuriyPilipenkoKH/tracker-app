import {create} from 'zustand'
import { img, loginResponse, User } from '../types/userTypes';
import { axios } from '../lib/axios';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import capitalize from '../lib/capitalize';
import { wait } from '../lib/wait';
import { signUpSchemaType } from '../models/signUpSchema';
import { LoginSchemaType } from '../models/loginSchema';
import { profileSchemaType } from '../models/profileSchema';

interface AuthStoreTypes {
  userId: string
  authUser: User | null 
  pending: boolean
  logError: string

  checkAuth: () => Promise<void>
  signUp: (data: signUpSchemaType) => Promise<boolean | undefined>
  login: (data: LoginSchemaType) => Promise<loginResponse | undefined>
  logOut: () => Promise<void>
  updateProfile: (data: profileSchemaType) => Promise<boolean | undefined>
  uploadAvatar: (data: img) => Promise<void>
  clearLogError: () => void
}

export const useAuthStore = create<AuthStoreTypes>((set, get) => ({
  userId: localStorage.getItem("tracker-userId") || '',
  authUser:  null,
  pending: false,
  logError: '',

  checkAuth: async() =>{
    set({ pending: true });

    try {
      const response = await axios.get('/auth/check')
      set({authUser: response.data})

    } catch (error) {
      set({authUser: null})
      console.log('error in checkAuth', error)
    }
    finally{ set({pending: false}) }
  
  },

  signUp : async (data) => {
    set({ pending: true });
    try {
      const response = await axios.post('/auth/signup', data)
      if (response.data) {
        set({authUser: response.data.user})
        set({userId: response.data.user._id})
        localStorage.setItem("tracker-userId",response.data.user._id)

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
    finally{ set({pending: false}) }
  
  },

  login : async (data) => {
    set({ pending: true });
      try {
      const response = await axios.post('/auth/login', data)
      if (response.data) {
        set({authUser: response.data.user})
        set({userId: response.data.user._id})
        localStorage.setItem("tracker-userId",response.data.user._id)
        set({logError: ''})

        await wait(1000)
        toast.success(`Hello, ${capitalize(response.data.user.name)} !`)


      return {success: true, message: response.data?.message}
    } 
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {

        console.log(error.response.data.message);
        set({logError: error.response.data.message})
        return { success: false, message: error.response.data.message };
      }
      return { success: false, message: "An unexpected error occurred" };
    }
    finally{ set({pending: false}) }
  },

  logOut: async () => {
    set({ pending: true });
    const { authUser } = get();
    try {
      const response = await axios.post('/auth/logout')
      if (response.status === 200) {
        toast.success(`Goodbye, ${authUser?.name}!`)
        set({authUser: null})
        set({userId: ''})
        localStorage.setItem("tracker-userId",'')
      }

    }  catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      }
    }
    finally{set({pending: false})}
  },

  updateProfile: async (data) => {
    set({ pending: true });
      try {
      const response = await axios.patch('/auth/update-profile', data)
      if (response.data) {
        set({ authUser: response.data.user });
        await wait(1000)
        toast.success(`Updated ${capitalize(response.data.user.name)} info !`)
      return true
    } 
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      }
      return false
    }
    finally { set({ pending: false }) }
  },
  
  uploadAvatar: async (data) => {
    set({ pending: true });
    try {
      const formData = new FormData();
      formData.append('file', data.image);
      const response = await axios.put("/auth/upload-avatar", formData,{
          headers: { "Content-Type": "multipart/form-data", },
      });
      if(response.data){
      set({ authUser: response.data.user });
      toast.success(response.data.message);
    }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      }
    } finally {  set({ pending: false })  }
  },

  clearLogError: () => {
    set({logError: ''})
  }
}))


    //
    // const token = Cookies.get("tracker-token"); // Read token from cookies
    // if (token) {
    //   set({authUser: dummyUser})
    //   wait(500)
    // }
