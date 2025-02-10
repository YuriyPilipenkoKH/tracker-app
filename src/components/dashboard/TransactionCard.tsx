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
    description
  } = transaction
  return (

<div className="flex justify-between items-center w-64 md:w-96 p-4 border rounded-md shadow">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">{name}</h2>
        {createdAt && <p className="text-sm text-gray-500">{format(new Date(createdAt), "dd-MM-yyyy HH:mm")}</p>}
      </div>
      <div 
      className ={cn('font-bold text-xl', 
        amount < 0 
        ? "text-red-500" : "text-green-500"
      )}
      >
        <p>{'$'}{' '}{Math.abs(amount)}</p>
      </div>
    </div>

        // <div  className="flex gap-4 p-4 items-center justify-between ">
        //   <div>
        //     <p>{name}</p>
        //     <p>{dateTime}</p>
        //   </div>
        //   <p>{amount}</p>
        //   {/* <p>{description}</p> */}
        // </div>
  )
}

export default TransactionCard
