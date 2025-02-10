import { primarySchema } from "./primarySchema";
import z from 'zod'


export const UserSchema = primarySchema.pick({
  
  _id: true,
  name: true,
  email: true,
  image: true,
  role: true,
  phone: true,
  city: true,
  balance:true,
  createdAt:true,
  updatedAt:true,

});

// Infer the type of loginSchema
export type User = z.infer<typeof UserSchema>;