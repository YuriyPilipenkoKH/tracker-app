import { z } from "zod";

export const ValidationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, 'Name needs to be at least 3 characters')
        .max( 32, 'Name should be shorter than 32 characters')
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
        // .refine((val) => val < 150, {
        //     message: 'You haven`t got enough money'
        //   })  
        ,
    dateTime: z
        .string()
        .min(3, 'Date must be 3 or more characters long')  ,
    description: z
        .string()
        .trim()
        .min(6, 'Description must be 6 or more characters long') 
        .refine((val) => !val.toLowerCase().startsWith('qwe'), {
            message: 'Enter a different description'
          }) ,      
})
