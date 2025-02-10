import  { AxiosError } from 'axios'
import {create} from 'zustand'
import { loginResponse } from '../types'
import { axios } from '../lib/axios'
import { Transaction } from '../models/transaction'

interface FinanceStoreTypes {
  totalBalance: number | undefined
  transactions: [Transaction] | undefined
  pending: boolean

  grabTransactions: () => Promise<loginResponse | undefined>
  newTransaction: (data:Transaction) => Promise<loginResponse | undefined>

}
export const useFinanceStore = create<FinanceStoreTypes>((set, get) => ({
  totalBalance: Number(localStorage.getItem("tracker-totalBalance")) || undefined,
  transactions: undefined,
  pending: false,

  grabTransactions: async() => {
    set({ pending: true });
    try {
      const response = await axios.get('/transaction/grab')
      set(() => ({
        // ...state,
        transactions: response.data,
        // userId: response.data._id,
      }));
      return { success: true, message:  'Transactions`re grabbed '} //response.data.message
      
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.log(error.response.data.message);
        return { success: false, message: error.response.data.message };
     } 
     return { success: false, message: "An unexpected error occurred" };
    }
    finally{  set({ pending: false }) }
  },

  newTransaction: async(data) => {
     set({ pending: true });
     try {
       const response = await axios.post('/transaction/new', data)
      
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