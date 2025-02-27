

import React from 'react'
import { useForm } from 'react-hook-form'
import { Transaction, transactionSchema } from '../../models/transaction'
import { zodResolver } from '@hookform/resolvers/zod'
import { useModalStore } from '../../store/useModalStore'
import { Input_DU, Label_DU } from './Forms.styled'
import { cn } from '../../lib/cn'
import { useFinanceStore } from '../../store/useFinanceStore'
import { ZodError } from '../button/Button.styled'
import { Button } from '../button/Button'
import { LuRefreshCw } from 'react-icons/lu'

const EditTransactionForm = () => {
  const {selectedTransaction} = useModalStore()
   const {totalBalance,  newTransaction, amountError, nameError, clearAnyError} = useFinanceStore()

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
        isDirty,
        isValid ,
        isSubmitting,
        isLoading 
      } = formState

    const onSubmit = async (data: Transaction) => {
      console.log(data);
      
    }
  return (
    <form  
    onSubmit={handleSubmit(onSubmit)}
    className='relative flex flex-col w-full gap-3 px-1 pt-12 pb-6'
    autoComplete="off"
    noValidate>

      <Label_DU className={cn('formLabel  flex items-center gap-1')}>
        <Input_DU 
          className={cn('grow ' )}
          {...register('name', {
            // onChange: handleNameChange
          } )}
          placeholder=	{( isSubmitting )? "Processing" : 'name'}
          />
      </Label_DU>
      {errors.name && <ZodError >{errors.name.message}</ZodError>}
      {nameError && <ZodError  >{nameError}</ZodError>}

      <Label_DU className={cn('formLabel  flex items-center gap-1')}>
        <Input_DU 
          className={cn('grow 0' )}
          {...register('description', )}
          placeholder=	{( isSubmitting )? "Processing" : 'description'}
          />
      </Label_DU>
      {errors.description && <ZodError >{errors.description.message}</ZodError>}
      <Button
        className='flex w-full gap-5 mt-auto btn btn-active btn-primary'
        type='submit'
        disabled={isSubmitting || !isDirty || !isValid }
            >
      { isSubmitting &&  <LuRefreshCw className='size-6 animate-spin' />}      
      { isLoading  ? "Sending.." :  "Send" }
      </Button>


    </form>
  )
}

export default EditTransactionForm