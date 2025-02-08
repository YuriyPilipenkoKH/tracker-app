import  { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {  useForm } from 'react-hook-form'
import { signUpSchemaType ,signUpSchema} from '../../models/signUpSchema'
import { cn } from '../../lib/cn'
import { useAuthStore } from '../../store/useAuthStore'
import { Eye, EyeOff, } from "lucide-react";


export const SignUpForm = () => {
  const {signUp, logError, clearLogError} = useAuthStore()

  const [show, setShow] = useState<boolean>(false)
  const {
    register, 
    handleSubmit,
    formState,
    reset,
  } = useForm<signUpSchemaType >({
    mode:'all',
    defaultValues: {
      name:localStorage.getItem('tracker-signup-name') || '',
      email:localStorage.getItem('tracker-signup-email') || '',
      password:localStorage.getItem('tracker-signup-pass') || '',
    },
    resolver: zodResolver(signUpSchema), })
  const {
    errors,
    isDirty,
    isValid ,
    isSubmitting,
    isLoading 
  } = formState

  const onSubmit = async (data: signUpSchemaType) => {

    localStorage.setItem('tracker-signup-name', data.name)
    localStorage.setItem('tracker-signup-email', data.email)
    localStorage.setItem('tracker-signup-pass', data.password)
    const response = await signUp(data)

    if(response?.success){
      localStorage.setItem('tracker-signup-name', '')
      localStorage.setItem('tracker-signup-email', '')
      localStorage.setItem('tracker-signup-pass', '')
      reset()
    } 
    }
  const handleInputChange =   () => {
    if(logError) clearLogError()
  }

  return (
    <form  onSubmit={handleSubmit(onSubmit)}
    className='flex flex-col gap-3 w-full p-5'
    autoComplete="off"
    noValidate>
      <label className={cn('formLabel  flex items-center gap-1')}>
        <input 
          className={cn('grow input input-bordered' )}
          {...register('name', 
          { onChange: handleInputChange })}
          placeholder=	{( isSubmitting )? "Processing" : 'name'}
          />
      </label>
      {errors.name && <div className='text-purple-900'>{errors.name.message}</div>}
      <label className={cn('formLabel  flex items-center gap-1')}>
        <input 
          className={cn('grow input input-bordered' )}
          {...register('email', 
          { onChange: handleInputChange })}
          placeholder=	{( isSubmitting )? "Processing" : 'email'}
          />
      </label>
      {errors.email && <div className='text-purple-900'>{errors.email.message}</div>}
      <label className={cn('formLabel  flex items-center gap-1 relative')}>
        <input 
          className={cn('grow input input-bordered' )}
          {...register('password', 
          { onChange: handleInputChange })}
          placeholder=	{( isSubmitting )? "Processing" : "•••••"}
          type = {show ? 'text' : 'password' }
          />
          <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShow(!show)}
        >
          {show ? (
            <EyeOff className="size-5 text-base-content/40" />
          ) : (
            <Eye className="size-5 text-base-content/40" />
          )}
        </button>
      </label>
      {errors.password && <div className='text-purple-900'>{errors.password.message}</div>}
      {logError && <div  className='text-purple-900'>{logError}</div>}
      <button
        className='AuthFormSubmitBtn mt-auto btn btn-active btn-primary w-full'
        type='submit'
        disabled={isSubmitting || !isDirty || !isValid || !!logError}
            >
        { isLoading  ? "Sending.." :  "Sign Up.." }
      </button>

    </form>
  )
}

