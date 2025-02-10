
import { useFinanceStore } from '../../store/useFinanceStore'

const BalanceUI = () => {
  const {totalBalance} = useFinanceStore()
  return (
    <div 
    className='p-2 text-xl flex gap-8'>
      <p>      Balance</p>
      <span className='flex items-center jusify-center px-5 bordered bg-yellow-800 text-xl font-bold'>
        {'$'}{' '}
        {totalBalance}
      </span>
    </div>
  )
}

export default BalanceUI