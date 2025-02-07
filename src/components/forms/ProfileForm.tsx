import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../store/useAuthStore'
import {  Building2, Mail, Phone, SquarePen, User } from "lucide-react";
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, profileSchemaType } from '../../models/profileSchema';
import { cn } from '../../lib/cn';
import { useState } from 'react';

const ProfileForm = () => {

  const { authUser, updateProfile} = useAuthStore()
  const [logError, setLogError] = useState<string>('')
  const [anable, setAnable] = useState<boolean>(false)
  const {
    register, 
    handleSubmit,
    reset,
    formState
  } = useForm<profileSchemaType >({
    mode:'all',
    defaultValues: {
      name: authUser?.name,
      email: authUser?.email,
      phone: authUser?.phone,
      city: authUser?.city 
    },
  resolver: zodResolver(profileSchema), })
  const {
    errors,
    isDirty,
    isValid ,
    isSubmitting,
  } = formState

  const onSubmit = async (data: profileSchemaType) => {
    console.log(data);
    const response = await updateProfile(data)
    if(response) reset()
    }

  const handleInputChange =   () => {
    if(logError) setLogError('')
      }
  return (
    <div className="space-y-6 ">
    {/* <div className="space-y-1.5">
      <div className="text-sm text-zinc-400 flex items-center gap-2">
        <User className="w-4 h-4" />
        Full Name
      </div>
      <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.name}</p>
    </div>

    <div className="space-y-1.5">
      <div className="text-sm text-zinc-400 flex items-center gap-2">
        <Mail className="w-4 h-4" />
        Email Address
      </div>
      <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
    </div> */}

    <form onSubmit={handleSubmit(onSubmit)}
        className='relative flex flex-col gap-3 w-full py-5'
        autoComplete="off"
        noValidate>
          <button 
          type='button' 
          className='absolute btn btn-ghost right-0 top-[-8px]'
          onClick={()=>setAnable(!anable)}>
            <SquarePen className="w-4 h-4" />
          </button>

        <label className={cn('formLabel  flex flex-col  gap-1')}>
        <div className="text-sm  flex items-center gap-2">
          <User className="w-4 h-4" />
          Full Name
        </div>
          <input 
            className={cn('grow input input-bordered  focus:ring focus:border-blue-500 ' )}
            {...register('name',{ onChange: handleInputChange })}
            placeholder=	{( isSubmitting )? "Processing" : 'email'}
            disabled = {!anable}/>
        </label>
          {errors.name && <div className='text-purple-900'>{errors.name.message}</div>}
          
        <label className={cn('formLabel  flex flex-col  gap-1')}>
        <div className="text-sm  flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Email Address
        </div>
          <input 
            className={cn('grow input input-bordered  focus:ring focus:border-blue-500 ' )}
            {...register('email', { onChange: handleInputChange })}
            placeholder=	{( isSubmitting )? "Processing" : 'email'}
            disabled = {!anable}/>
        </label>
          {errors.email && <div className='text-purple-900'>{errors.email.message}</div>}

        <label className={cn('formLabel  flex flex-col  gap-1')}>
        <div className="text-sm  flex items-center gap-2">
          <Phone  className="w-4 h-4" />
          Phone Number
        </div>
          <input 
            className={cn('grow input input-bordered  focus:ring focus:border-blue-500 ' )}
            {...register('phone', { onChange: handleInputChange })}
            placeholder=	{( isSubmitting )? "Processing" : 'phone'}
            disabled = {!anable}/>
        </label>
          {errors.phone && <div className='text-purple-900'>{errors.phone.message}</div>}

        <label className={cn('formLabel  flex flex-col  gap-1')}>
        <div className="text-sm  flex items-center gap-2">
          <Building2   className="w-4 h-4" />
          City
        </div>
          <input 
            className={cn('grow input input-bordered  focus:ring focus:border-blue-500 ' )}
            {...register('city', { onChange: handleInputChange })}
            placeholder=	{( isSubmitting )? "Processing" : 'City'}
            disabled = {!anable}/>
        </label>
          {errors.city && <div className='text-purple-900'>{errors.city.message}</div>}
      <button 
        type='submit'
        className={cn('btn btn-primary mt-1',
          !anable && 'visually-hidden'
        )} 
        disabled ={isSubmitting || !isDirty  } 
        >
          Save
          </button>
    </form>
  </div>
  )
}

export default ProfileForm