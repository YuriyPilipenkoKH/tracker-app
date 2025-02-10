
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
    <div>
      {transactions.map((item, id) =>(
        <div key={id}>
          <p>{item.name}</p>
          <p>{item.amount}</p>
          <p>{item.dateTime}</p>
          <p>{item.description}</p>
        </div>
     ))}
    </div>
  )
}

export default TransactionList