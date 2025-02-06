import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../store/useAuthStore'
import {  Mail, User } from "lucide-react";
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, profileSchemaType } from '../../models/profileSchema';

const ProfileForm = () => {

  const { authUser, updateProfile} = useAuthStore()
     const {
        register, 
        handleSubmit,
        reset,
        formState = {errors, isValid, isSubmitting},
      } = useForm<profileSchemaType >({
        mode:'all',
        defaultValues: {
          name: authUser?.name,
          email: authUser?.email,
          phone: authUser?.phone,
          city: authUser?.city 
        },
      resolver: zodResolver(profileSchema), })

    const onSubmit = async (data: profileSchemaType) => {
      console.log(data);
      const response = await updateProfile(data)
      if(response) reset()
      }
  return (
    <div className="space-y-6 ">
    <div className="space-y-1.5">
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
    </div>

    <form >

    </form>
  </div>
  )
}

export default ProfileForm