import {create} from 'zustand'
import { Transaction } from '../models/transaction';

interface useModalStoreprops{
  modalIsOpen:boolean
  selectedTransaction: Transaction | null;

  onModalOpen: (data: Transaction) => void
  onModalClose: () => void
}

export const useModalStore = create<useModalStoreprops>((set,) => ({

  modalIsOpen:false,
  selectedTransaction:null,

  onModalOpen: (payload) => {
    set({ 
      modalIsOpen: true,
      selectedTransaction: payload
     });
  },
  onModalClose: () => {
    set({ 
      modalIsOpen: false,
      selectedTransaction: null
     });
  },
  
}))