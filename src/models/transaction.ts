import { z } from "zod";

export const transactionSchema = z.object({
 _id: z
  .string(),
    name: z
    .string()
    .trim()
    // .min(3, 'Name needs to be at least 3 characters')
    .max( 64, 'Name should be shorter than 64 characters')
    .refine((val) => !val.toLowerCase().startsWith('qwe'), {
        message: 'Enter a different name'
      })
    .refine((val) => val.toLowerCase() !== 'some', {
        message: 'Some is not allowed'
      }),
    amount: z
    .number()
    .refine((val) => !isNaN(val), { message: "Must be a valid number" }) // Ensures it's a number
    .refine((val) => val !== 0, { message: "Amount cannot be 0" }) // Disallow zero
   , 
    total: z
    .number()
    .optional(),  
    description: z
    .string()
    .trim()
    .refine((val) => !val.toLowerCase().startsWith('qwe'), {
        message: 'Enter a different description'
      })
    .optional(),   
    createdAt: z
    .date()
    .optional(),
    updatedAt: z
    .date()
    .optional(),

})

export type Transaction = z.infer<typeof transactionSchema>