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


  <div className=" flex justify-between items-center w-64 p-4 ">
    <div className="flex flex-col gap-2">
      <h2 className="card-title">{name}</h2>
      <p>{dateTime}</p>
      {/* <p>{description}</p> */}
    </div>
    <div className=" ">
      <p>{amount}</p>
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
