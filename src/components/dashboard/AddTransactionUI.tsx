import  { useState } from 'react'
import { cn } from '../../lib/cn'
import AddTransactionForm from '../forms/AddTransactionForm'
import { LuChevronDown } from 'react-icons/lu'
import { FlatButton } from '../button/Button'

const AddTransactionUI = () => {
  const [open, setOpen] = useState<boolean>(false)
  const click = () => {
    setOpen(!open)
  }
  return (
    <div className='flex flex-col items-center justify-center w-64 md:w-96 '>

      <div 
        className='flex items-center gap-4'
        
          >
            <span className='text-xl font-bold'>Add New Transaction</span>
        <FlatButton>
          <LuChevronDown
          onClick={click} size={25}
          className={cn('transition-transform duration-1000 ease-in-out',
            open ? 'rotate-180' : 'rotate-0'
          )}   />
        </FlatButton>
      </div>

      <div
      className= {cn('w-full overflow-hidden transition-all duration-1000 ease-in-out ' ,
          open ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0'
      )}>
        <AddTransactionForm setOpen={setOpen}/>
      </div>
    </div>
  )
}

export default AddTransactionUI