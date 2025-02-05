import z from 'zod'

export const signUpSchema = z.object({
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
})

export type signUpSchemaType =  z.infer<typeof signUpSchema>

