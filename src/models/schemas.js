import { z } from "zod";

export const ValidationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, 'Name must be 3 or more characters long')
        .max( 82, 'Name should be shorter than 82 characters')
        .refine((val) => !val.toLowerCase().startsWith('qwe'), {
            message: 'Enter a different name'
          })
        .refine((val) => val.toLowerCase() !== 'some', {
            message: 'Some is not allowed'
          })    ,
    price: z
        .string()
        .trim()
        .toLowerCase()
        ,
    dateTime: z
        .string()
        .min(3, 'Name must be 3 or more characters long')  ,
    description: z
        .string()
        .trim()
        .min(6, 'Name must be 6 or more characters long') 
        .refine((val) => !val.toLowerCase().startsWith('qwe'), {
            message: 'Enter a different description'
          }) ,      
})
