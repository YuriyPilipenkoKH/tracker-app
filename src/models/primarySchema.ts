import z from 'zod'

export const primarySchema = z.object({
   _id: z
  .string(),
  name: z
  .string()
  .trim()
  .min(3)
  .max(32)
  .refine((val) => !val.toLowerCase().startsWith('qwe'), {
    message: 'forbidden prefix',
  }),
  email: z
  .string()
  .trim()
  .email('invalid email')
  .refine((val) => !val.toLowerCase().startsWith('admin'), {
    message: 'admin is not allowed',
  })
  .refine((val) => !val.endsWith('.ru'), {
    message: 'forbidden domain',
  }),
  password: z
  .string()
  .trim()
  .min(4)
  .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
    message: 'include numbers ',
  }),
  image: z
  .string(),
  role: z
  .enum(["admin", "user", "editor"]),
  phone: z
  .string()
  .trim()
  .regex(/^0\d{9}$/, {
    message: 'Correct format: 0985551204 ',
  })
  .optional(),
  city: z
  .string()
  .trim()
  .optional(),
  balance: z
  .number()
  .optional(),
  createdAt: z
  .date()
  .optional(),
  updatedAt: z
  .date()
  .optional(),
 })

export type primarySchemaType =  z.infer<typeof primarySchema>