import { useEffect } from 'react'
import { useFinanceStore } from '../../store/useFinanceStore'
import { useAuthStore } from '../../store/useAuthStore';
import TransactionCard from './TransactionCard';
import PaginationControls from '../Pagination/PaginationControls';

const TransactionList = () => {
  const { grabTransactions, transactions,  currentPage } = useFinanceStore();
  const { userId } = useAuthStore();

  useEffect(() => {
    grabTransactions({ page: currentPage, limit: 5 });
  }, [userId, currentPage]);

  
  return (
    <div className='flex flex-col items-center gap-3 py-2'>
      <PaginationControls />
      {transactions.map ((item, id) => (
        <TransactionCard key={id} transaction={item}/> 
      ))}
    </div>
  )
}

export default TransactionList


  // // Sort transactions by `createdAt` in descending order
  // const sortedTransactions = [...transactions].sort((a, b) => {
  //   const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
  //   const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

  //   return dateB - dateA; // Newest transactions first
  // });