import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Transaction, TransactionSchema } from '../../models/transaction'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '../../lib/cn'
import { RefreshCw } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'

const totalBalance = 1000
const AddTransactionForm = () => {
    const { logError, } = useAuthStore()
  const {
    register, 
    handleSubmit,
    formState,
    reset,
  } = useForm<Transaction >({
    defaultValues: {  
      name: '',
      amount: undefined ,
      dateTime: '' ,
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

    const onSubmit = async (data: Transaction) => {
      console.log(data);
    }

    useEffect(() => {
      if(isSubmitSuccessful) {
          reset()
      }
      }, [isSubmitSuccessful, reset])
      
  return (
    <form  
    onSubmit={handleSubmit(onSubmit)}
    className='flex flex-col gap-3 w-full p-5'
    autoComplete="off"
    noValidate>
      <label className={cn('formLabel  flex items-center gap-1')}>
        <input 
          type='number'
          className={cn('grow input input-bordered' )}
          {...register('amount', 
            { valueAsNumber: true }
          // { onChange: handleInputChange }
        )}
          placeholder=	{( isSubmitting )? "Processing" : 'amount'}
          />
      </label>
      {errors.amount && <div className='text-purple-900'>{errors.amount.message}</div>}
      <label className={cn('formLabel  flex items-center gap-1')}>
        <input 
          className={cn('grow input input-bordered' )}
          {...register('name', 
          // { onChange: handleInputChange }
        )}
          placeholder=	{( isSubmitting )? "Processing" : 'name'}
          />
      </label>
      {errors.name && <div className='text-purple-900'>{errors.name.message}</div>}

      <label className={cn('relative  w-full  flex items-center gap-1')}>
        <input 
          type='datetime-local'
          className={cn('input input-bordered  peer w-full  ' )}
          {...register('dateTime', {
     
          }
            // { valueAsDate: true }
          // { onChange: handleInputChange }
        )}
             // placeholder=	{( isSubmitting )? "Processing" : 'dateTime'}
          />
      <span className="absolute left-2 text-gray-400 peer-focus:hidden peer-valid:hidden">
          {isSubmitting ? "Processing" : "Select Date & Time"}
        </span>
      </label>
      {errors.dateTime && <div className='text-purple-900'>{errors.dateTime.message}</div>}

      <label className={cn('formLabel  flex items-center gap-1')}>
        <input 
          className={cn('grow input input-bordered' )}
          {...register('description', 
          // { onChange: handleInputChange }
        )}
          placeholder=	{( isSubmitting )? "Processing" : 'description'}
          />
      </label>
      {errors.description && <div className='text-purple-900'>{errors.description.message}</div>}
      <button
        className='flex gap-5 mt-auto btn btn-active btn-primary w-full'
        type='submit'
        disabled={isSubmitting || !isDirty || !isValid || !!logError}
            >
      { isSubmitting &&  <RefreshCw className='size-6 animate-spin' />}      
      { isLoading  ? "Sending.." :  "Send" }
      </button>

    </form>
  )
}

export default AddTransactionForm