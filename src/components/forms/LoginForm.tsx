import { zodResolver } from '@hookform/resolvers/zod'
import  {  useState } from 'react'
import { loginSchema, LoginSchemaType } from '../../models/loginSchema'
import { useForm } from 'react-hook-form'
import { cn } from '../../lib/cn'
import { useAuthStore } from '../../store/useAuthStore'
import { LuEye, LuEyeOff, LuRefreshCw } from 'react-icons/lu'
import { AuthForm_DU, Input_DU, Label_DU } from './Forms.styled'
import { ZodError } from '../button/Button.styled'
import { Button } from '../button/Button'



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
     <AuthForm_DU 
      onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate>
          <Label_DU className={cn('formLabel  flex items-center gap-1')}>
            <Input_DU 
              className={cn('grow ' )}
              {...register('email', 
              { onChange: handleInputChange } )}
              placeholder=	{( isSubmitting )? "Processing" : 'email'}
              />
          </Label_DU>
          {errors.email && <ZodError >{errors.email.message}</ZodError>}
          <Label_DU className={cn('formLabel  flex items-center gap-1 relative')}>
            <Input_DU 
              className={cn('grow 0' )}
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
            <LuEyeOff className="size-5 text-base-content/40" />
          ) : (
            <LuEye className="size-5 text-base-content/40" />
          )}
        </button>
          </Label_DU>
          {errors.password && <ZodError >{errors.password.message}</ZodError>}
          {logError && <ZodError  >{logError}</ZodError>}
          <Button
            type='submit'
            className='flex gap-5 mt-auto btn btn-active btn-primary w-full'
            disabled={isSubmitting || !isDirty || !isValid || !!logError}
                >
            { isLoading &&  <LuRefreshCw className='size-6 animate-spin' />}
            { isLoading  ? "Sending.." :  "Log In.." }
          </Button>
    
        </AuthForm_DU>
  )
}

export default LoginForm