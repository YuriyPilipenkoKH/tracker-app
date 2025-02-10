import {create} from 'zustand'
import { bal, img, loginResponse} from '../types';
import { axios } from '../lib/axios';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import capitalize from '../lib/capitalize';
import { wait } from '../lib/wait';
import { signUpSchemaType } from '../models/signUpSchema';
import { LoginSchemaType } from '../models/loginSchema';
import { profileSchemaType } from '../models/profileSchema';
import { User } from '../models/UserSchema';

interface AuthStoreTypes {
  userId: string
  authUser: User | undefined
  ischeckingAuth: boolean
  pending: boolean
  logError: string

  checkAuth: () => Promise<void>
  signUp: (data: signUpSchemaType) => Promise<loginResponse | undefined>
  login: (data: LoginSchemaType) => Promise<loginResponse | undefined>
  logOut: () => Promise<void>
  updateProfile: (data: profileSchemaType) => Promise<boolean | undefined>
  uploadAvatar: (data: img) => Promise<void>
  clearLogError: () => void
  updateBalance: (data: bal) =>Promise<void>

}

export const useAuthStore = create<AuthStoreTypes>((set, get) => ({
  userId: localStorage.getItem("tracker-userId") || '',
  authUser:  undefined,
  ischeckingAuth:false,
  pending: false,
  logError: '',

  checkAuth: async() =>{
    set({ ischeckingAuth: true });

    try {
      const response = await axios.get('/auth/check')
      if (response.data) {
        set((state) => ({
          // ...state,
          authUser: response.data,
          userId: response.data._id,
        }));
      }
    } catch (error) {
      set({authUser: undefined})
      console.log('error in checkAuth', error)
    }
    finally{ set({ischeckingAuth: false}) }
  
  },

  signUp : async (data) => {
    set({ pending: true });
    try {
      const response = await axios.post('/auth/signup', data)
      if (response.data) {
        set((state) => ({
          ...state,
          authUser: response.data.user,
          userId: response.data.user._id,
          logError: '',
        }));
        localStorage.setItem("tracker-userId",response.data.user._id)

        toast.success('Account created!')
        // await wait(1000) 
        toast.success(`Welcome, ${capitalize(response.data.user.name)} !`)

        return {success: true, message: response.data?.message}
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        // toast.error(error.response.data.message);

        console.log(error.response.data.message);
        set({logError: error.response.data.message})
        return { success: false, message: error.response.data.message };
      }
      console.log('error in signUp', error)
      return { success: false, message: "An unexpected error occurred" };
    }
    finally{ set({pending: false}) }
  
  },

  login : async (data) => {
    set({ pending: true });
    try {
      const response = await axios.post('/auth/login', data)
      if (response.data) {
        set((state) => ({
          ...state,
          authUser: response.data.user,
          userId: response.data.user._id,
          logError: '',
        }));
        localStorage.setItem("tracker-userId",response.data.user._id)

        // await wait(1000)
        toast.success(`Hello, ${capitalize(response.data.user.name)} !`)

      return {success: true, message: response.data?.message}
    } 
    } catch (error: unknown) {
      console.log("Login error caught:", error)
      if (error instanceof AxiosError && error.response) {

        console.log(error.response.data.message);
        set({logError: error.response.data.message})
        return { success: false, message: error.response.data.message };
      }
      return { success: false, message: "An unexpected error occurred" };
    }
     finally { set({ pending: false }) }
  },

  logOut: async () => {
    set({ pending: true });
    const { authUser } = get();
    try {
      const response = await axios.post('/auth/logout')
      if (response.status === 200) {
        toast.success(`Goodbye, ${authUser?.name}!`)
        set(() => ({
          authUser: undefined,
          userId: '',
          logError: '',
        }));
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
  },

  updateBalance: async(data) => {
    // const {balance} = data
    set({ pending: true });
    try {
      const response = await axios.put('/auth/update-balance', data)
      set({ authUser: response.data.user })
      toast.success(response.data.message)
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.log(error.response.data.message);
     } 
    }
    finally{  set({ pending: false }) }
  },
}))


    //
    // const token = Cookies.get("tracker-token"); // Read token from cookies
    // if (token) {
    //   set({authUser: dummyUser})
    //   wait(500)
    // }
