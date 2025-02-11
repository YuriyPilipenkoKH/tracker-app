import  { useState } from 'react'
import { cn } from '../../lib/cn'
import { ChevronDown } from 'lucide-react'
import AddTransactionForm from '../forms/AddTransactionForm'

const AddTransactionUI = () => {
  const [open, setOpen] = useState<boolean>(false)
  const click = () => {
    setOpen(!open)
  }
  return (
    <div className='flex flex-col items-center justify-center w-64 md:w-96 '>
      <button 
        className='flex gap-8'
        onClick={click}
          >
            <span className='text-xl font-bold'>Add New Transaction</span>
        <ChevronDown 
        className={cn('transition-transform duration-1000 ease-in-out',
          open ? 'rotate-180' : 'rotate-0'
        )}   />
    
    </button>
      <div className= {cn('w-full overflow-hidden transition-all duration-1000 ease-in-out ' ,
              open ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0'
            )}>
        <AddTransactionForm setOpen={setOpen}/>
      </div>
    </div>
  )
}

export default AddTransactionUI