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
      const response = await axios.get('/auth/session')
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
    //   const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}
    //   &redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URI}
    //   &response_type=code
    //   &scope=profile email`;

    // // Open Google OAuth in a new window
    // const authWindow = window.open(googleAuthUrl, "_blank", "width=500,height=600");

    // // Listen for authentication completion
    // const interval = setInterval(() => {
    //   if (authWindow?.closed) {
    //     clearInterval(interval);
    //     window.location.reload(); // Refresh to check session
    //   }
    // }, 1000);

//=====================================

      const response = await signIn("google", 
        { redirect: false }
      );

      if (!response || response.error) {
        console.error("Google sign-in error:", response?.error);
        toast.error("Google sign-in failed");
        return;
      }
      console.log("Google Sign-in Response:", response);
      // Extract the code from response URL
      const url = new URL(response.url!);
      const code = url.searchParams.get("code");

      console.log("Google Auth URL:", url);
      console.log("Authorization Code:", code);

      if (!code) {
        console.error("Authorization code missing from response.");
        return;
      }

      // Send authorization code to backend
      const { data } = await axios.post("/auth/google", { code });

      console.log("Google Login successful:", data);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      }
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


// handleGoogleLogin: async () => {

//   set({ isLoggingIn: true });
//   try {
//       const response = await signIn("google", { redirect: false });

//     if (!response || response.error) {
//       console.error("Google sign-in error:", response?.error);
//       toast.error("Google sign-in failed!");
//       return;
//     }

//     if (!response.url) {
//       console.error("No URL returned from Google sign-in.");
//       toast.error("Authentication failed. Try again.");
//       return;
//     }

//     // Extract authorization code from URL
//     const codeMatch = response.url.match(/code=([^&]*)/);
//     if (!codeMatch) {
//       console.error("Authorization code not found in URL:", response.url);
//       toast.error("Invalid authentication response.");
//       return;
//     }
//     const authorizationCode = codeMatch[1];

//     // Send the authorization code to the backend
//     const { data } = await axios.post(
//       `/auth/google`,
//       { code: authorizationCode },
//       { withCredentials: true }
//     );

//     console.log("Login successful:", data);
//     toast.success("Login successful!");
//   } catch (error) {
//     if (error instanceof AxiosError && error.response) {
//       toast.error(error.response.data.message);
//     }
//   } finally {
//     set({ isLoggingIn: false });
//   }
// },


// handleGoogleLogin: async () => {
//   set({ isLoggingIn: true });
//   try {
//     const response = await signIn("google", { redirect: false });
//     if (response?.error) {
//       console.error("Google sign-in error:", response.error);
//       return;
//     }
//     await axios.post("/auth/google", {
//       code: response?.url?.split("code=")[1]?.split("&")[0],
//     });
//   } catch (error) {
//     if (error instanceof AxiosError && error.response) {
//       toast.error(error.response.data.message);
//     }
//   } finally {
//     set({ isLoggingIn: false });
//   }
// },