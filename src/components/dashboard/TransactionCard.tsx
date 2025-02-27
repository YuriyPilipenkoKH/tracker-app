import React from "react"
import { Transaction } from "../../models/transaction"
import { format } from "date-fns";
import { cn } from "../../lib/cn";

import { useModalStore } from "../../store/useModalStore";
import { LuZoomIn } from "react-icons/lu";

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

    const { onModalOpen} = useModalStore()

    const click = () => {
      onModalOpen(transaction)
    }
  return (

    <div 
      className="n12 ">
        <h2 className="name font-semibold h-6 overflow-hidden">{name}</h2>
        <p   className ={cn('amount font-bold text-xl', 
          amount < 0 
          ? "text-[orange]" : "text-green-500"
          )}
        > {'$'}{' '}{Math.abs(amount)}
        </p>
        <div className="des ">{description}</div>
        <button
          className='zoom flex gap-2'
          onClick={click}
          >
          <LuZoomIn />
        </button>
        {createdAt && <p className="cat ">{format(new Date(createdAt), "dd-MM-yyyy HH:mm")}
          </p>}
        <div className="total flex gap-1 ">
          <p>total:</p>
          <p>{total}</p>
        </div>
  
    </div>

  )
}

export default TransactionCard
