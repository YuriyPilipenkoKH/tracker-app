import React, { useState } from "react"
import { Transaction } from "../../models/transaction"
import { format } from "date-fns";
import { cn } from "../../lib/cn";
import {  ZoomIn } from "lucide-react";
import { useModalStore } from "../../store/useModalStore";

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
    const {modalIsOpen, onModalClose,onModalOpen} = useModalStore()

    const click = () => {
      onModalOpen(transaction)
    }
  return (

    <div 
      className="n12 w-full items-center  bg-base-300   p-5  border rounded-[12px] shadow md:w-96">
        <h2 className="name font-semibold h-6 overflow-hidden">{name}</h2>
        <p   className ={cn('amount font-bold text-xl', 
          amount < 0 
          ? "text-[orange]" : "text-green-500"
          )}
        > {'$'}{' '}{Math.abs(amount)}
        </p>
        <div className="des font-light h-6 overflow-hidden">{description}</div>
        <button
          className='zoom flex gap-2'
          onClick={click}
          >
          <ZoomIn />
        </button>
        {createdAt && <p className="cat text-sm text-gray-500">{format(new Date(createdAt), "dd-MM-yyyy HH:mm")}
          </p>}
        <div className="total flex gap-1 text-sm text-gray-500">
          <p>total:</p>
          <p>{total}</p>
        </div>
  
    </div>

  )
}

export default TransactionCard
//ZoomIn