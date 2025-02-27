

import React from 'react'
import { useForm } from 'react-hook-form'
import { Transaction, transactionSchema } from '../../models/transaction'
import { zodResolver } from '@hookform/resolvers/zod'
import { useModalStore } from '../../store/useModalStore'

const EditTransactionForm = () => {
  const {selectedTransaction} = useModalStore()
   const {
      register, 
      handleSubmit,
      formState,
      reset,
      clearErrors,
    } = useForm<Transaction>({
      defaultValues: {  
        name: selectedTransaction?.name,
        description: selectedTransaction?.description,
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
      console.log(data);
      
    }
  return (
    <div>EditTransactionForm</div>
  )
}

export default EditTransactionForm