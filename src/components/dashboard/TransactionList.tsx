import { useEffect } from 'react'
import { useFinanceStore } from '../../store/useFinanceStore'
import { useAuthStore } from '../../store/useAuthStore';
import TransactionCard from './TransactionCard';
import Message from './Message';
import PaginationControls from '../pagination/PaginationControls';
import { messageProps } from '../../data/messageProps';

const TransactionList = () => {
  const { grabTransactions, transactions,  currentPage } = useFinanceStore();
  const { userId } = useAuthStore();

  useEffect(() => {
    grabTransactions({ page: currentPage, limit: 5 });
  }, [userId, currentPage]);

  
  return (
    <div className='flex flex-col items-center gap-3 py-2'>
     { transactions.length > 0  ?(
       <>
         <PaginationControls />
               {transactions.map ((item, id) => (
          <TransactionCard key={id} transaction={item}/> 
               ))}
       </>
    ) : (
      <>
      <Message text={messageProps.noitems}/>
      </>
    )}

    </div>
  )
}

export default TransactionList