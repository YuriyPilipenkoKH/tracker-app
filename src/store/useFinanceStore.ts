import  { AxiosError } from 'axios'
import {create} from 'zustand'
import { loginResponse } from '../types'
import { axios } from '../lib/axios'
import { Transaction } from '../models/transaction'

interface FinanceStoreTypes {
  totalBalance: number | undefined
  pending: boolean

  newTransaction: (data:Transaction) => Promise<loginResponse | undefined>

}
export const useFinanceStore = create<FinanceStoreTypes>((set, get) => ({
  totalBalance: Number(localStorage.getItem("tracker-totalBalance")) || undefined,
  pending: false,

  newTransaction: async(data) => {
     set({ pending: true });
     try {
       const response = await axios.post('/auth/signup', data)
      
     } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.log(error.response.data.message);
        return { success: false, message: error.response.data.message };
     } 
     return { success: false, message: "An unexpected error occurred" };
    }
     finally{  set({ pending: false }) }
  }

}))