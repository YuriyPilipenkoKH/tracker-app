import { useEffect } from 'react'
import { useFinanceStore } from '../../store/useFinanceStore'
import { useAuthStore } from '../../store/useAuthStore';
import TransactionCard from './TransactionCard';

const TransactionList = () => {
  const {grabTransactions,  transactions } = useFinanceStore()
  const {userId} = useAuthStore();
  useEffect(() => {
    async function grab() {
      await grabTransactions()
    }
    grab().then(() =>{
      // if(!pending)  console.log('transactions',transactions)
    })
  }, [userId])

  // Sort transactions by `createdAt` in descending order
  const sortedTransactions = [...transactions].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

    return dateB - dateA; // Newest transactions first
  });
  
  return (
    <div className='flex flex-col gap-3 py-2'>
      {sortedTransactions.map ((item, id) => (
        <TransactionCard key={id} transaction={item}/> 
      ))}
    </div>
  )
}

export default TransactionList