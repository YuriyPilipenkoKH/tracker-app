import React, { useState } from "react"
import { Transaction } from "../../models/transaction"
import { format } from "date-fns";
import { cn } from "../../lib/cn";
import { ChevronDown } from "lucide-react";

interface TransactionCardProps{
transaction: Transaction
}

const TransactionCard:React.FC<TransactionCardProps> = ({transaction}) => {

  const {
    name,
    amount,
    createdAt,
    total,
    description
  } = transaction
    const [open, setOpen] = useState<boolean>(false)
    const click = () => {
      setOpen(!open)
    }
  return (

    <div 
      className="n12  items-center  bg-base-300 w-64 p-4 border rounded-[12px] shadow md:w-96">
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 justify-between">
          <div className="font-semibold h-6 overflow-hidden">{name}</div>
        { description &&  ( 
          <button
          className='flex gap-2'
          onClick={click}
            >
          <ChevronDown
          className={cn('transition-transform duration-1000 ease-in-out',
            open ? 'rotate-180' : 'rotate-0'
          )}   />
          </button>
        )}
        </div>
        {createdAt && <p className="text-sm text-gray-500">{format(new Date(createdAt), "dd-MM-yyyy HH:mm")}</p>}
      </div>
      <div className="flex flex-col items-end gap-2">
        <p   className ={cn('font-bold text-xl', 
        amount < 0 
        ? "text-[orange]" : "text-green-500"
        )}
        > {'$'}{' '}{Math.abs(amount)}</p>
        <div className="flex gap-1 text-sm text-gray-500">
          <p>total:</p>
          <p>{total}</p>
        </div>
      </div>
    </div>

  )
}

export default TransactionCard
