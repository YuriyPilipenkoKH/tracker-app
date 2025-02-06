import z from 'zod'
import { primarySchema } from './primarySchema';

export const signUpSchema =  primarySchema.pick({
  name: true,
  email: true,
  password: true,
});

export type signUpSchemaType =  z.infer<typeof signUpSchema>

