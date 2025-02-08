import  { useState } from 'react'
import { cn } from '../../lib/cn'
import { ChevronDown } from 'lucide-react'

const AddTransactionUI = () => {
  const [open, setOpen] = useState<boolean>(false)
  const click =() => {
    
  }
  return (
    <div>
      <button 
        className='flex gap-8'
        onClick={() => setOpen(!open)}
          >
            <span className='text-xl font-bold'>Add New Transaction</span>
        <ChevronDown 
        className={cn('transition-transform duration-1000',
          open ? 'rotate-180' : 'rotate-0'
        )}   />
    
    </button>
    </div>
  )
}

export default AddTransactionUI