import React from "react"
import { Transaction } from "../../models/transaction"
import { format } from "date-fns";
import { cn } from "../../lib/cn";

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
  return (

<div className="flex items-center justify-between w-64 p-4 border rounded-[12px] shadow md:w-96">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">{name}</h2>
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
