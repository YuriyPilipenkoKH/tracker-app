import  { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {  useForm } from 'react-hook-form'
import { signUpSchemaType ,signUpSchema} from '../../models/signUpSchema'
import { cn } from '../../lib/cn'
import { useAuthStore } from '../../store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { LuEye, LuEyeOff, LuRefreshCw } from 'react-icons/lu'
import { AuthForm_DU, Input_DU, Label_DU } from './Forms.styled'
import { Button } from '../button/Button'


export const SignUpForm = () => {
  const {signUp, logError, clearLogError} = useAuthStore()
  const navigate = useNavigate();
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
      navigate('/login')
      reset()
    } 
    }
  const handleInputChange =   () => {
    if(logError) clearLogError()
  }

  return (
    <AuthForm_DU  onSubmit={handleSubmit(onSubmit)}

    autoComplete="off"
     noValidate>
      <Label_DU className={cn('formLabel  flex items-center gap-1')}>
        <Input_DU  
          className={cn('grow input ' )}
          {...register('name', 
          { onChange: handleInputChange })}
          placeholder=	{( isSubmitting )? "Processing" : 'name'}
          />
      </Label_DU>
      {errors.name && <div className='text-purple-900'>{errors.name.message}</div>}
      <Label_DU className={cn('formLabel  flex items-center gap-1')}>
        <Input_DU  
          className={cn('grow input ' )}
          {...register('email', 
          { onChange: handleInputChange })}
          placeholder=	{( isSubmitting )? "Processing" : 'email'}
          />
      </Label_DU>
      {errors.email && <div className='text-purple-900'>{errors.email.message}</div>}
      <Label_DU className={cn('formLabel  flex items-center gap-1 relative')}>
        <Input_DU  
          className={cn('grow input ' )}
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
            <LuEyeOff className="size-5 text-base-content/40" />
          ) : (
            <LuEye className="size-5 text-base-content/40" />
          )}
        </button>
      </Label_DU>
      {errors.password && <div className='text-purple-900'>{errors.password.message}</div>}
      {logError && <div  className='text-purple-900'>{logError}</div>}
      <Button
        className=' w-full'
        type='submit'
        disabled={isSubmitting || !isDirty || !isValid || !!logError}
            >
      { isSubmitting &&  <LuRefreshCw className='size-6 animate-spin' />}      
      { isLoading  ? "Sending.." :  "Sign Up" }
      </Button>

    </AuthForm_DU>
  )
}