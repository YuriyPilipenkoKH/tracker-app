import {create} from 'zustand'
import { User } from '../types/userTypes';
import { axios } from '../lib/axios';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { signIn } from "next-auth/react";
// import { wait } from '../lib/wait';
// import capitalize from '../lib/capitalize';



interface AuthStoreTypes {
  authUser: User | null 
  isCheckingAuth: boolean
  isLoggingIn: boolean,
  handleGoogleLogin: () => Promise<void>
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
  handleGoogleLogin: async () => {
    try {
      set({ isLoggingIn: true });
  
      const response = await signIn("google", { redirect: false });
  
      if (!response || response.error) {
        console.error("Google sign-in error:", response?.error);
        toast.error("Google sign-in failed!");
        return;
      }
  
      if (!response.url) {
        console.error("No URL returned from Google sign-in.");
        toast.error("Authentication failed. Try again.");
        return;
      }
  
      // Extract authorization code from URL
      const codeMatch = response.url.match(/code=([^&]*)/);
      if (!codeMatch) {
        console.error("Authorization code not found in URL:", response.url);
        toast.error("Invalid authentication response.");
        return;
      }
      const authorizationCode = codeMatch[1];
  
      // Send the authorization code to the backend
      const { data } = await axios.post(
        `/auth/google`,
        { code: authorizationCode },
        { withCredentials: true }
      );
  
      console.log("Login successful:", data);
      toast.success("Login successful!");
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      }
    } finally {
      set({ isLoggingIn: false });
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