import { zodResolver } from '@hookform/resolvers/zod'
import  { useEffect, useState } from 'react'
import { loginSchema, LoginSchemaType } from '../../models/loginSchema'
import { useForm } from 'react-hook-form'
import { cn } from '../../lib/cn'
import { useAuthStore } from '../../store/useAuthStore'
import { Eye, EyeOff} from "lucide-react";


const LoginForm = () => {
  const logError = useAuthStore((state) => state.logError);
  // const pending = useAuthStore((state) => state.pending);
  const login = useAuthStore((state) => state.login);
  const clearLogError = useAuthStore((state) => state.clearLogError);
  const [show, setShow] = useState<boolean>(false)
  
   const {
      register, 
      handleSubmit,
      reset,
      formState,
    } = useForm<LoginSchemaType >({
      mode:'all',
      defaultValues: {
        email:'',
        password:'',
      },
    resolver: zodResolver(loginSchema), })
    const {
      errors,
      isDirty,
      isValid ,
      isSubmitting,
      isLoading 
    } = formState

    const onSubmit = async (data: LoginSchemaType) => {
      console.log('data',data);
     await login(data)
      // if(response?.success) reset()
      // if(!response?.success && response?.message) setLogError(response?.message)
      }

    const handleInputChange =   () => {
      clearLogError()
      }

    useEffect(() => {
      console.log("LoginForm mounted");
      console.log('logError',logError)
      return () => console.log("LoginForm unmounted");
    }, []);

  return (
     <form 
      onSubmit={handleSubmit(onSubmit)}
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
            disabled={isSubmitting || !isDirty || !isValid || !!logError}
                >
            { isLoading  ? "Sending.." :  "Log In.." }
          </button>
    
        </form>
  )
}

export default LoginForm