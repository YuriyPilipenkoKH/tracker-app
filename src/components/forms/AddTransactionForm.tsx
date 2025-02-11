import React ,{ useState } from 'react'
import { useForm } from 'react-hook-form'
import { Transaction, TransactionSchema } from '../../models/transaction'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '../../lib/cn'
import { CircleMinus, CirclePlus, CircleX, RefreshCw } from 'lucide-react'
import { useFinanceStore } from '../../store/useFinanceStore'
import { useAuthStore } from '../../store/useAuthStore'
import toast from 'react-hot-toast'

interface AddTransactionFormProps {
  setOpen: React.Dispatch<boolean>
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({
  setOpen
}) => {
 const {totalBalance,  newTransaction, amountError, nameError, clearAnyError} = useFinanceStore()
  const { updateBalance } = useAuthStore() 
    const [sign, setSign] = useState<"+" | "-" >("+");

  const {
    register, 
    handleSubmit,
    formState,
    reset,
    clearErrors,
  } = useForm<Transaction >({
    defaultValues: {  
      name: '',
      amount: undefined ,
      description: '',
       },
        mode:'all',
        resolver: zodResolver(TransactionSchema(totalBalance)), })
    const {
      errors,
      isDirty,
      isValid ,
      isSubmitting,
      isLoading 
    } = formState


    const onSubmit = async (data: Transaction) => {

      const finalAmount = sign === "-" ? -data.amount : data.amount;
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
      <div className="absolute right-9 top-[60px] z-50 flex gap-6 items-center justify-center">
          <label className="flex items-center justify-center gap-1 cursor-pointer">
            <input
              type="radio"
              name='sign'
              hidden
            onChange= {changeSign}
            value={'+'}
            />
            <span className='p-0 bg-red'>
              <CirclePlus className={cn('', sign === '+'  && 'text-[var(--vivid-green)]')}/>
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
                <CircleMinus className={cn('', sign === '-'  && 'text-[var(--orange)]')}/>
                </span>
            </label>
        </div>

      <label className={cn('relative  flex items-center gap-1')}>
      {/* {sign === '-' && !errors.amount && isDirty && 
      <span className='absolute left-2 text-[var(--orange)]' >-</span>} */}
        <input 
          type='number'
          className={cn('grow input input-bordered focus:ring focus:border-blue-500' ,
            sign === '+'
            ? 'text-[var(--vivid-green)]' 
            : 'text-[var(--orange)]'
          )}
          {...register('amount', { 
            onChange: handleAmountChange,
            valueAsNumber: true ,           
            }          
        )}
          placeholder=	{( isSubmitting )? "Processing" : 'amount'}
          />
      </label>
      {errors.amount && <div className='text-purple-900'>{errors.amount.message}</div>}
      {amountError && <div  className='text-purple-900'>{amountError}</div>}

      <label className={cn('formLabel  flex items-center gap-1')}>
        <input 
          className={cn('grow input input-bordered focus:ring focus:border-blue-500' )}
          {...register('name', {
            onChange: handleNameChange
          } )}
          placeholder=	{( isSubmitting )? "Processing" : 'name'}
          />
      </label>
      {errors.name && <div className='text-purple-900'>{errors.name.message}</div>}
      {nameError && <div  className='text-purple-900'>{nameError}</div>}

      <label className={cn('formLabel  flex items-center gap-1')}>
        <input 
          className={cn('grow input input-bordered focus:ring focus:border-blue-500' )}
          {...register('description', )}
          placeholder=	{( isSubmitting )? "Processing" : 'description'}
          />
      </label>
      {errors.description && <div className='text-purple-900'>{errors.description.message}</div>}
      <button
        className='flex w-full gap-5 mt-auto btn btn-active btn-primary'
        type='submit'
        disabled={isSubmitting || !isDirty || !isValid }
            >
      { isSubmitting &&  <RefreshCw className='size-6 animate-spin' />}      
      { isLoading  ? "Sending.." :  "Send" }
      </button>

      { (errors.name || errors.amount  || errors.description)  &&  (
      <button 
      type='button'
      onClick ={() => clearErrors()}
      className='btn btn-ghost absolute top-[-8px] right-5 ' >
            <CircleX  />
      </button>)
      }

    </form>
  )
}

export default AddTransactionForm