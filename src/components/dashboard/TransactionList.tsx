
import { useEffect } from 'react'
import { useFinanceStore } from '../../store/useFinanceStore'
import { useAuthStore } from '../../store/useAuthStore';
import TransactionCard from './TransactionCard';

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
    <div className='flex flex-col gap-3 py-2'>
      {transactions.map ((item, id) => (
     <TransactionCard key={id} transaction={item}/> 

      ))}
    </div>
  )
}

export default TransactionList