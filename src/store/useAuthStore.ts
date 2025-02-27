import {create} from 'zustand'
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useFinanceStore } from './useFinanceStore';
import { User } from '../models/UserSchema';
import { signUpSchemaType } from '../models/signUpSchema';
import { AuthResponse, bal, img, loginResponse } from '../types';
import { LoginSchemaType } from '../models/loginSchema';
import { profileSchemaType } from '../models/profileSchema';
import { axios, clearAuthHeader, setAuthHeader } from '../lib/axios';
import capitalize from '../lib/capitalize';
import { wait } from '../lib/wait';

interface AuthStoreTypes {
  userId: string
  authUser: User | undefined
  token: string | null;
  isAdmin: boolean
  ischeckingAuth: boolean
  pending: boolean
  logError: string | null;

  checkAuth: () => Promise<void>
  signUp: (data: signUpSchemaType) => Promise<loginResponse | undefined>
  login: (data: LoginSchemaType) => Promise<loginResponse | undefined>
  logOut: () => Promise<void>
  updateProfile: (data: profileSchemaType) => Promise<boolean | undefined>
  uploadAvatar: (data: img) => Promise<void>
  uploadAvatar_b64: (data: img) => Promise<void>
  clearLogError: () => void
  updateBalance: (data: bal) =>Promise<void>
}

export const useAuthStore = create<AuthStoreTypes>((set, get) => ({
  userId: '',
  authUser:  undefined,
  token: localStorage.getItem('tracker-token') || null,
  isAdmin: false,
  ischeckingAuth: false,
  pending: false,
  logError: '',

  checkAuth: async() =>{
    set({ ischeckingAuth: true });
    const setTotalBalance = useFinanceStore.getState().setTotalBalance
      const { token: persistedToken } = get()
    if (persistedToken === null) {
      console.log('Unable to fetch user');
      return 
      }
    try {
      setAuthHeader(persistedToken);
      const response = await axios.get<AuthResponse>('/auth/check')
      if (response.data.user) {
        set(() => ({
          authUser: response.data.user,
          userId: response.data.user._id,
          isAdmin: response.data.user.role === 'admin',
        }));

        setTotalBalance(response.data.user.balance ||  0)
        localStorage.setItem("tracker-totalBalance", response.data.user.balance?.toString() || '' )
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
      const response = await axios.post<AuthResponse>('/auth/signup', data)
      if (response.data) {
        set(() => ({
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
    const setTotalBalance = useFinanceStore.getState().setTotalBalance
    try {
      const response = await axios.post<AuthResponse>('/auth/login', data)
      setAuthHeader(response.data.token);
      localStorage.setItem("tracker-userId",response.data.user._id)
      localStorage.setItem("tracker-token",response.data.token)

      if (response.data) {
        set((state) => ({
          ...state,
          authUser: response.data.user,
          userId: response.data.user._id,
          token: response.data.token,
          isAdmin: response.data.user.role === 'admin',
          logError: '',
        }));

        setTotalBalance(response.data.user.balance ||  0)
        localStorage.setItem("tracker-totalBalance", response.data.user.balance?.toString() || '' )

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
    const setTotalBalance = useFinanceStore.getState().setTotalBalance
    try {
      const response = await axios.post<AuthResponse>('/auth/logout')
      if (response.data.success) {
        toast.success(`Goodbye, ${capitalize(authUser?.name)}!`)
        set(() => ({
          authUser: undefined,
          token: null,
          isAdmin: false,
          userId: '',
          logError: '',
        }));
        setTotalBalance(0)
        localStorage.setItem("tracker-totalBalance", '' )
        clearAuthHeader();
        localStorage.setItem("tracker-userId",'')
        localStorage.setItem("tracker-token",'')
        localStorage.setItem("tracker-totalBalance", '')
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

  uploadAvatar_b64: async (data) => {
    set({ pending: true });
    try {
      const response = await axios.put("/auth/upload-avatar_b64", data);
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
    const {balance} = data
    const setTotalBalance = useFinanceStore.getState().setTotalBalance
    set({ pending: true });
    try {
      const response = await axios.put('/auth/update-balance', data)
      if(response.data){
        set({ authUser: response.data.user })
        setTotalBalance(balance)
        // toast.success(response.data.message)
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.log(error.response.data.message);
     } 
    }
    finally{  set({ pending: false }) }
  },

}))

