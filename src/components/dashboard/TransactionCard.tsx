import React from "react"
import { Transaction } from "../../models/transaction"

interface TransactionCardProps{
transaction: Transaction
}

const TransactionCard:React.FC<TransactionCardProps> = ({transaction}) => {

  const {
    name,
    amount,
    dateTime,
    description
  } = transaction
  return (
        <div  className="flex gap-4 p-4 items-center justify-between ">
          <div>
            <p>{name}</p>
            <p>{dateTime}</p>
          </div>
          <p>{amount}</p>
          {/* <p>{description}</p> */}
        </div>
  )
}

export default TransactionCard
