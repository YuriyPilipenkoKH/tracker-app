import React ,{ useState } from 'react'
import { useForm } from 'react-hook-form'
import { Transaction, transactionSchema, } from '../../models/transaction'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '../../lib/cn'

import { useFinanceStore } from '../../store/useFinanceStore'
import { useAuthStore } from '../../store/useAuthStore'
import toast from 'react-hot-toast'
import { LuCircleMinus, LuCirclePlus, LuCircleX, LuRefreshCw } from "react-icons/lu";
import { Input_DU, Label_DU } from './Forms.styled'
import { ZodError } from '../button/Button.styled'
import { Button } from '../button/Button'

interface AddTransactionFormProps {
  setOpen: React.Dispatch<boolean>
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = () => {
 const {totalBalance,  newTransaction, amountError, nameError, clearAnyError} = useFinanceStore()
  const { updateBalance } = useAuthStore() 
    const [sign, setSign] = useState<"+" | "-" >("+");

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
      isDirty,
      isValid ,
      isSubmitting,
      isLoading 
    } = formState


    const onSubmit = async (data: Transaction) => {
      console.log(data);
      const sanitizedData = {
        ...data,
        amount: Math.abs(data.amount), // Convert to absolute value
      };
      const finalAmount = sign === "-" ? -sanitizedData.amount : sanitizedData.amount;
      console.log("Final Transaction:", finalAmount);
      const finalData = {
        ...data,
        amount:finalAmount,
        total: refreshTotalBalance(finalAmount)
      }
      console.log('finalAmount',finalData)
      const response = await newTransaction(finalData)

      if(response?.success){
         const newBalance = refreshTotalBalance(finalData.amount)
         if(response.id) {
           await updateBalance({
            balance: newBalance,
            id: response.id
          })
         }
        toast.success(response.message)
        // console.log(response.message);
        clearErrors()
        reset()
        // setOpen(false)
      } 
    }
    const changeSign = (e: React.ChangeEvent<HTMLInputElement>) => {
      // setValue("sign", e.target.value as "+" | "-")
      setSign(e.target.value as "+" | "-")
      console.log(sign);
    }
    const refreshTotalBalance =(value: number) =>  {
     const result =  totalBalance + value
     localStorage.setItem("tracker-totalBalance", result.toString())
     return result
    }
    const handleAmountChange =   () => {
      if( amountError ) clearAnyError({error: 'amountError'})
    }
    const handleNameChange =   () => {
      if( nameError ) clearAnyError({error: 'nameError'})
    }

      
  return (
    <form  
    onSubmit={handleSubmit(onSubmit)}
    className='relative flex flex-col w-full gap-3 px-1 pt-12 pb-6'
    autoComplete="off"
    noValidate>
      <div className="absolute Sign-color right-9 top-[65px] z-50 flex gap-6 items-center justify-center">
          <label className="flex items-center justify-center gap-1 cursor-pointer">
            <input
              type="radio"
              name='sign'
              hidden
            onChange= {changeSign}
            value={'+'}
            />
            <span className='p-0 bg-red'>
              <LuCirclePlus  size={25}
              className={cn('', sign === '+'  && 't-pls text-[var(--green)]')}/>
            </span>
          </label>
            <label className="flex items-center justify-center gap-1 cursor-pointer">
              <input
                type="radio"
                name='sign'
                hidden
                onChange= {changeSign}
                value={'-'}
              />
              <span>
                <LuCircleMinus size={25}
                className={cn('', sign === '-'  && 't-min text-[var(--orange)]')}/>
                </span>
            </label>
        </div>

      <Label_DU className={cn('relative Label_number  flex items-center gap-1')}>
      {/* {sign === '-' && !errors.amount && isDirty && 
      <span className='absolute left-2 text-[var(--orange)]' >-</span>} */}
        <Input_DU 
          type='number'
          className={cn('grow ' ,
            sign === '+'
            ? 't-pls text-[var(--green)]' 
            : 't-min text-[var(--orange)]'
          )}
          {...register('amount', { 
            onChange: handleAmountChange,
            valueAsNumber: true ,           
            }          
        )}
          placeholder=	{( isSubmitting )? "Processing" : 'amount'}
          />
      </Label_DU>
      {errors.amount && <ZodError >{errors.amount.message}</ZodError>}
      {amountError && <ZodError  >{amountError}</ZodError>}

      <Label_DU className={cn('formLabel  flex items-center gap-1')}>
        <Input_DU 
          className={cn('grow ' )}
          {...register('name', {
            onChange: handleNameChange
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

      { (errors.name || errors.amount  || errors.description)  &&  (
      <button 
      type='button'
      onClick ={() => clearErrors()}
      className='btn btn-ghost absolute top-[-8px] right-5 ' >
            <LuCircleX  />
      </button>)
      }

    </form>
  )
}

export default AddTransactionForm