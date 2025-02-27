

import React from 'react'
import { useForm } from 'react-hook-form'
import { Transaction, transactionSchema } from '../../models/transaction'
import { zodResolver } from '@hookform/resolvers/zod'

const EditTransactionForm = () => {
   const {
      register, 
      handleSubmit,
      formState,
      reset,
      clearErrors,
    } = useForm<Transaction>({
      defaultValues: {  
        name: '',
        amount: undefined ,
        description: '',
         },
          mode:'all',
          resolver: zodResolver(transactionSchema), })
      const {
        errors,
        // isDirty,
        // isValid ,
        // isSubmitting,
        // isLoading 
      } = formState

    const onSubmit = async (data: Transaction) => {
      
    }
  return (
    <div>EditTransactionForm</div>
  )
}

export default EditTransactionForm