import {create} from 'zustand'

interface FinanceStoreTypes {
  totalBalance: number | undefined

}
export const useFinanceStore = create<FinanceStoreTypes>((set, get) => ({
totalBalance: undefined
}))