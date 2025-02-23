import { zodResolver } from '@hookform/resolvers/zod'
import  {  useState } from 'react'
import { loginSchema, LoginSchemaType } from '../../models/loginSchema'
import { useForm } from 'react-hook-form'
import { cn } from '../../lib/cn'
import { useAuthStore } from '../../store/useAuthStore'
import { Eye, EyeOff, RefreshCw} from "lucide-react";


const LoginForm = () => {
  const{ logError, clearLogError, login, authUser} = useAuthStore();
  const [show, setShow] = useState<boolean>(false)
  
   const {
      register, 
      reset,
      handleSubmit,
      formState,
    } = useForm<LoginSchemaType >({
      mode:'all',
      defaultValues: {
        email: authUser?.email || '',
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
    localStorage.setItem('tracker-login-email', data.email)
    localStorage.setItem('tracker-login-pass', data.password)
    const response =  await login(data)

    if(response?.success){
      localStorage.setItem('tracker-login-email', '')
      localStorage.setItem('tracker-login-pass', '')
      reset()
    } 
    }

    const handleInputChange =   () => {
      if(logError) clearLogError()
    }

    // useEffect(() => {
    //   console.log("LoginForm mounted");
    //   console.log('logError',logError)
    //   return () => console.log("LoginForm unmounted");
    // }, []);

  return (
     <form 
      onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-3 w-full p-5'
        autoComplete="off"
        noValidate>
         
          <label className={cn('formLabel  flex items-center gap-1')}>
            <input 
              className={cn('grow input input-bordered focus:ring focus:border-blue-500' )}
              {...register('email', 
              { onChange: handleInputChange } )}
              placeholder=	{( isSubmitting )? "Processing" : 'email'}
              />
          </label>
          {errors.email && <div className='text-purple-900'>{errors.email.message}</div>}
          <label className={cn('formLabel  flex items-center gap-1 relative')}>
            <input 
              className={cn('grow input input-bordered focus:ring focus:border-blue-500' )}
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
            className='flex gap-5 mt-auto btn btn-active btn-primary w-full'
            disabled={isSubmitting || !isDirty || !isValid || !!logError}
                >
            { isLoading &&  <RefreshCw className='size-6 animate-spin' />}
            { isLoading  ? "Sending.." :  "Log In.." }
          </button>
    
        </form>
  )
}

export default LoginForm