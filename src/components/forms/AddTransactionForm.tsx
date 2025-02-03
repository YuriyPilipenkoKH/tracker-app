import React from 'react'
import { useForm } from 'react-hook-form'
import { Transaction, TransactionSchema } from '../../models/transaction'
import { zodResolver } from '@hookform/resolvers/zod'


const AddTransactionForm = () => {
  const {
    register, 
    // handleSubmit,
    // formState,
    // reset,
  } = useForm<Transaction >({
    defaultValues: {  
      name: '',
      price: 0 ,
      dateTime: undefined,
      description: ''
       },
        mode:'all',
        resolver: zodResolver(TransactionSchema), })
  return (
    <form >

    </form>
  )
}

export default AddTransactionForm