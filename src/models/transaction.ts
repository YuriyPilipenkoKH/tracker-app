import { z } from "zod";

export const TransactionSchema = (totalBalance :number) => z.object({
    name: z
        .string()
        .trim()
        .min(3, 'Name needs to be at least 3 characters')
        .max( 64, 'Name should be shorter than 64 characters')
        .refine((val) => !val.toLowerCase().startsWith('qwe'), {
            message: 'Enter a different name'
          })
        .refine((val) => val.toLowerCase() !== 'some', {
            message: 'Some is not allowed'
          })    ,
    ammount: z
        .number()
        .refine((val) => (val * -1) < totalBalance, {
            message: 'You haven`t got enough money'
          })  
        ,
    dateTime: z
        .date() ,
    description: z
        .string()
        .trim()
        .refine((val) => !val.toLowerCase().startsWith('qwe'), {
            message: 'Enter a different description'
          })
        .optional() ,      
})

export type Transaction = z.infer<ReturnType<typeof TransactionSchema>>;