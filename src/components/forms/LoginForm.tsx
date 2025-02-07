import { zodResolver } from '@hookform/resolvers/zod'
import  { useEffect, useState } from 'react'
import { loginSchema, LoginSchemaType } from '../../models/loginSchema'
import { useForm } from 'react-hook-form'
import { cn } from '../../lib/cn'
import { useAuthStore } from '../../store/useAuthStore'
import { Eye, EyeOff} from "lucide-react";


const LoginForm = () => {
  const {login} = useAuthStore()
  const [logError, setLogError] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)
  console.log('logError',logError);
   const {
      register, 
      handleSubmit,
      reset,
      formState,
    } = useForm<LoginSchemaType >({
      mode:'all',
    resolver: zodResolver(loginSchema), })
    const {
      errors,
      isDirty,
      isValid ,
      isSubmitting,
      isLoading 
    } = formState

    const onSubmit = async (data: LoginSchemaType) => {
      console.log(data);
      const response = await login(data)
      // if(response?.success) reset()
      if(!response?.success && response?.message) setLogError(response?.message)
      }

    const handleInputChange =   () => {
      if(logError) setLogError('')
      }

    useEffect(() => {
      console.log("LoginForm mounted");
      return () => console.log("LoginForm unmounted");
    }, []);

  return (
     <form 
      // onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-3 w-full p-5'
        autoComplete="off"
        noValidate>
         
          <label className={cn('formLabel  flex items-center gap-1')}>
            <input 
              className={cn('grow input input-bordered' )}
              {...register('email', 
              { onChange: handleInputChange } )}
              placeholder=	{( isSubmitting )? "Processing" : 'email'}
              />
          </label>
          {errors.email && <div className='text-purple-900'>{errors.email.message}</div>}
          <label className={cn('formLabel  flex items-center gap-1 relative')}>
            <input 
              className={cn('grow input input-bordered' )}
              {...register('password', 
              { onChange: handleInputChange } )}
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
            type='button'
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || !isDirty || !isValid || !!logError}
                >
            { isLoading  ? "Sending.." :  "Log In.." }
          </button>
    
        </form>
  )
}

export default LoginForm