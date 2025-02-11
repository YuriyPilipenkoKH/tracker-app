import { useEffect, useState } from 'react'
import { useFinanceStore } from '../../store/useFinanceStore'
import { useAuthStore } from '../../store/useAuthStore';
import TransactionCard from './TransactionCard';
import PaginationControls from '../Pagination/PaginationControls';

const TransactionList = () => {
  const {grabTransactions,  transactions, totalPages, currentPage } = useFinanceStore()
  const {userId} = useAuthStore();
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    grabTransactions({page:page, limit: 5});
  }, [page, userId]);


  
  return (
    <div className='flex flex-col items-center gap-3 py-2'>
      <PaginationControls
      page={page}
      setPage={setPage}
      totalPages={totalPages}
      />
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