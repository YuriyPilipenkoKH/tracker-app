
import { useFinanceStore } from '../../store/useFinanceStore'

const BalanceUI = () => {
  const {totalBalance} = useFinanceStore()
  return (
    <div 
    className='flex items-center p-2 text-xl font-bold'>
      <p className='g11 px-5 py-1 rounded-[8px]'>Balance</p>
      <span className='g12  flex items-center jusify-center px-5 py-1 rounded-[8px]  bg-yellow-800 text-xl '>
        {'$'}{' '}
        {totalBalance}
      </span>
    </div>
  )
}

export default BalanceUI