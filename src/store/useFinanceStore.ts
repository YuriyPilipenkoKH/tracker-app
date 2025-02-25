import  { AxiosError } from 'axios'
import {create} from 'zustand'
import {  err,  loginResponse, pagination } from '../types'
import { axios } from '../lib/axios'
import { Transaction } from '../models/transaction'


interface FinanceStoreTypes {
  totalBalance: number 
  transactions: Transaction[]
  pending: boolean
  amountError:string
  nameError:string
  totalPages: number,
  currentPage: number,

  setTotalBalance: (data: number) => void
  grabTransactions: (data: pagination) => Promise<loginResponse | undefined>
  newTransaction: (data:Transaction) => Promise<loginResponse | undefined>
  clearAnyError: (data: err) => void

}
export const useFinanceStore = create<FinanceStoreTypes>((set, get) => ({
  totalBalance: Number(localStorage.getItem("tracker-totalBalance")) || 0,
  transactions: [],
  pending: false,
  amountError: '',
  nameError:'',
  totalPages: 1,
  currentPage: 1,

  setTotalBalance: (value) => {
    set({ totalBalance: value });
  },

  grabTransactions: async({page = 1, limit = 5}) => {
    set({ pending: true });
    try {
      const response = await axios.get(`/transaction/grab?page=${page}&limit=${limit}`);
      if(response.data){
        set({
          transactions: response.data.payload,
          totalPages: response.data.pagination.totalPages,
          currentPage: page,
        });
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
     const { grabTransactions } = get();
     try {
       const response = await axios.post('/transaction/new', data)
      // set ({ transactions:[...transactions, response.data.payload,] })
      if (response.data) {
      await grabTransactions({ page: get().currentPage, limit: 5 });
      // ✅ 2. Update state immediately (optional: avoids small delay in UI update)
      set((state) => ({
        transactions: [ ...state.transactions.slice(0, 5)], // Keep max 5 items
      }));
      }
      return { 
        success: true, 
        message:  response.data.message,
        id: response.data.payload._id
      } 
      
     } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.log(error.response.data.message);
      if (error.response.data.amountError){
        set({amountError:  error.response.data.message})
      }
        
      if (error.response.data.nameError){
        set({nameError:  error.response.data.message})
      }
        return { success: false, message: error.response.data.message };
     } 
     return { success: false, message: "An unexpected error occurred" };
    }
     finally{  set({ pending: false }) }
  },

  clearAnyError: (data) =>{
    const{error} = data
    if(error === 'amountError') {
      set({amountError: '',})
    }
    if(error === 'nameError') {
      set({nameError: '',})
    }
  }

}))