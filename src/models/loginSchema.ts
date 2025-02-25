
import z from 'zod'
import { primarySchema } from './primarySchema';


export const loginSchema = primarySchema.pick({
  email: true,
  password: true,
});

// Infer the type of loginSchema
export type LoginSchemaType = z.infer<typeof loginSchema>;