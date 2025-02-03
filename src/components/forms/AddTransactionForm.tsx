import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Transaction, TransactionSchema } from '../../models/transaction'
import { zodResolver } from '@hookform/resolvers/zod'

const totalBalance = 1000
const AddTransactionForm = () => {
  const {
    register, 
    handleSubmit,
    formState,
    reset,
  } = useForm<Transaction >({
    defaultValues: {  
      name: '',
      price: 0 ,
      dateTime: undefined,
      description: ''
       },
        mode:'all',
        resolver: zodResolver(TransactionSchema(totalBalance)), })
    const {
      errors,
      isDirty,
      isValid ,
      isSubmitting,
      isSubmitSuccessful,
      isLoading 
    } = formState

    useEffect(() => {
      if(isSubmitSuccessful) {
          reset()
      }
      }, [isSubmitSuccessful, reset])
      
  return (
    <form >

    </form>
  )
}

export default AddTransactionForm