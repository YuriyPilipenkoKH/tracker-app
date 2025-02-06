import { primarySchema } from "./primarySchema";
import z from 'zod'


export const loginSchema = primarySchema.pick({
  email: true,
  password: true,
});

// Infer the type of loginSchema
export type LoginSchemaType = z.infer<typeof loginSchema>;