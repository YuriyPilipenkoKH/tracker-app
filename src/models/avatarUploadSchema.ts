import z from 'zod';


export const avatarUploadSchema =  z.object({
   image: z
      .instanceof(File, { message: "Invalid file format." })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "File size exceeds 5MB limit.",
      })
      .refine(
        (file) => ["image/png", "image/jpeg", "image/webp"].includes(file.type),
        { message: "Only PNG, JPG, and WEBP formats are allowed." }
      ),
});

export type AvatarUploadSchemaType = z.infer<typeof avatarUploadSchema>;
