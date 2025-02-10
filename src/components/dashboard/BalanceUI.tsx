import React from 'react'
import { useFinanceStore } from '../../store/useFinanceStore'

const BalanceUI = () => {
  const {totalBalance} = useFinanceStore()
  return (
    <div>
      <span className='flex items-center jusify-center p-5 bordered bg-[var(--vivid-green)] text-xl font-bold'>
        {totalBalance}
      </span>
    </div>
  )
}

export default BalanceUI