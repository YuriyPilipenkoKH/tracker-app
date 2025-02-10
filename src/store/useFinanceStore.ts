import  { AxiosError } from 'axios'
import {create} from 'zustand'
import {  loginResponse } from '../types'
import { axios } from '../lib/axios'
import { Transaction } from '../models/transaction'


interface FinanceStoreTypes {
  totalBalance: number 
  transactions: Transaction[]
  pending: boolean

  setTotalBalance: (data: number) => void
  grabTransactions: () => Promise<loginResponse | undefined>
  newTransaction: (data:Transaction) => Promise<loginResponse | undefined>

}
export const useFinanceStore = create<FinanceStoreTypes>((set, get) => ({
  totalBalance: Number(localStorage.getItem("tracker-totalBalance")) || 0,
  transactions: [],
  pending: false,

  setTotalBalance: (value) => {
    set({ totalBalance: value });
  },



  grabTransactions: async() => {
    set({ pending: true });
    try {
      const response = await axios.get('/transaction/grab')
      if(response.data){
        set((state) => ({
          ...state,
          transactions: response.data.payload,
          }));
     }
      return { success: true, message:  response.data.message} //
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
     const { transactions } = get();
     try {
       const response = await axios.post('/transaction/new', data)
      set ({ transactions:[...transactions, response.data.payload,] })

      return { success: true, message:  response.data.message} 
      
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