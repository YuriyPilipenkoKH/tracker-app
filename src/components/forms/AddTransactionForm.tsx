import React ,{  useState } from 'react'
import { useForm } from 'react-hook-form'
import { Transaction, TransactionSchema } from '../../models/transaction'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '../../lib/cn'
import { CircleMinus, CirclePlus, CircleX, RefreshCw } from 'lucide-react'
import { useFinanceStore } from '../../store/useFinanceStore'


const totalBalance = 1000
const AddTransactionForm = () => {
  const {newTransaction} = useFinanceStore() 
    const [sign, setSign] = useState<"+" | "-" >("+");

  const {
    register, 
    handleSubmit,
    formState,
    reset,
    clearErrors,
    setValue
  } = useForm<Transaction >({
    defaultValues: {  
      name: '',
      amount: undefined ,
      dateTime: '' ,
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
        amount:finalAmount
      }
      console.log('finalAmount',finalData)
      const response = await newTransaction(finalData)

      if(response?.success){
        // localStorage.setItem('tracker-login-email', '')
        console.log(response.message);
        reset()
      } 
    }
    const changeSign = (e: React.ChangeEvent<HTMLInputElement>) => {
      // setValue("sign", e.target.value as "+" | "-")
      setSign(e.target.value as "+" | "-")
      console.log(sign);
    }
    const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(sign === '-'){
        setValue('amount', Number(e.target.value) * -1)
      }
    }
      
  return (
    <form  
    onSubmit={handleSubmit(onSubmit)}
    className='relative flex flex-col gap-3 w-full px-5 py-12'
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
          className={cn('grow input input-bordered' ,
            sign === '+'
            ? 'text-[var(--vivid-green)]' 
            : 'text-[var(--orange)]'
          )}
          {...register('amount', { 
            valueAsNumber: true ,
              // onChange:onAmountChange
            }          
        )}
          placeholder=	{( isSubmitting )? "Processing" : 'amount'}
          />
      </label>
      {errors.amount && <div className='text-purple-900'>{errors.amount.message}</div>}
      <label className={cn('formLabel  flex items-center gap-1')}>
        <input 
          className={cn('grow input input-bordered' )}
          {...register('name', )}
          placeholder=	{( isSubmitting )? "Processing" : 'name'}
          />
      </label>
      {errors.name && <div className='text-purple-900'>{errors.name.message}</div>}

      <label className={cn('relative  w-full  flex items-center gap-1')}>
        <input 
          type='datetime-local'
          className={cn('input input-bordered  peer w-full  ' )}
          {...register('dateTime', {
            // valueAsDate:true
          })}
          />
      <span className="absolute left-2 text-gray-400 peer-focus:hidden peer-valid:hidden">
          {isSubmitting ? "Processing" : "Select Date & Time"}
        </span>
      </label>
      {errors.dateTime && <div className='text-purple-900'>{errors.dateTime.message}</div>}

      <label className={cn('formLabel  flex items-center gap-1')}>
        <input 
          className={cn('grow input input-bordered' )}
          {...register('description', )}
          placeholder=	{( isSubmitting )? "Processing" : 'description'}
          />
      </label>
      {errors.description && <div className='text-purple-900'>{errors.description.message}</div>}
      <button
        className='flex gap-5 mt-auto btn btn-active btn-primary w-full'
        type='submit'
        disabled={isSubmitting || !isDirty || !isValid }
            >
      { isSubmitting &&  <RefreshCw className='size-6 animate-spin' />}      
      { isLoading  ? "Sending.." :  "Send" }
      </button>

      { (errors.name || errors.amount || errors.dateTime || errors.description)  &&  (
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