import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
import { Camera, } from "lucide-react";
import { cn } from "../../lib/cn";
import { useForm } from "react-hook-form";
import { avatarUploadSchema, AvatarUploadSchemaType } from "../../models/avatarUploadSchema";
import { zodResolver } from "@hookform/resolvers/zod";


const AvatarUploadForm = () => {
    const { authUser, pending, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] =  useState<string >(authUser?.image || "/avatar.png");

    const {
      handleSubmit,
      setValue,
      formState: { errors, isSubmitting },
    } = useForm<AvatarUploadSchemaType>({
      resolver: zodResolver(avatarUploadSchema),
    });
    const onSubmit = async (data: AvatarUploadSchemaType) => {
      try {
        await updateProfile({ image: data.image });
        toast.success("Profile image updated successfully!");
      } catch (error) {
        toast.error("Failed to upload image.");
      }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]; // Use optional chaining to handle null or undefined
      if (!file) return;

      const validation = avatarUploadSchema.safeParse({ image: file });
      if (!validation.success) {
        toast.error(validation.error.errors[0].message);
        return;
    }
    setSelectedImg(URL.createObjectURL(file));
    setValue("image", file, { shouldValidate: true });
  };

  return (

    <div  className="flex flex-col items-center gap-4">
        <img
          src={selectedImg || authUser?.image || "/avatar.png"}
          alt="Profile image"
          className="size-32 rounded-full object-cover border-4 "
        />
      <form 
      onSubmit={handleSubmit(onSubmit)}
      className="relative">
        <label
          htmlFor="avatar-upload"
          className={cn('absolute bottom-0 right-0 transform translate-x-[50%]  bg-base-content hover:scale-105  p-2 rounded-full cursor-pointer transition-all duration-200',
            pending ? "animate-pulse pointer-events-none" : ""
          )}       
          >
        <Camera className="w-5 h-5 text-base-200" />
          <input
            type="file"
            id="avatar-upload"
            className="hidden"
            accept=".png, .jpg, .jpeg, .webp"
            onChange={handleImageUpload}
            disabled={pending || isSubmitting}
          />
        </label>
        <button type="submit" className="hidden"></button>
      </form>
      {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}

      <p className="text-sm text-zinc-400">
        {pending ? "Uploading..." : "Click the camera icon to update your photo"}
      </p>
    </div>
  )
}

export default AvatarUploadForm