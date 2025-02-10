
import { useEffect } from 'react'
import { useFinanceStore } from '../../store/useFinanceStore'
import { useAuthStore } from '../../store/useAuthStore';

const TransactionList = () => {
  const {grabTransactions, pending, transactions } = useFinanceStore()
  const {userId} = useAuthStore();
  useEffect(() => {
    async function grab() {
      await grabTransactions()
    }
    grab().then(() =>{
      if(!pending)  console.log('transactions',transactions)
    })
  }, [userId])
  
  return (
    <div>TransactionList</div>
  )
}

export default TransactionList