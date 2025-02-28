import { User } from "../models/UserSchema"

export interface img {
  image: File
}
export interface img_b64 {
  image: string | ArrayBuffer | null
}


export interface loginResponse {
  success: boolean
  message: string
  id?: string
}
export interface profile {
  name: string
}
export interface bal {
  balance: number
  id: string
}
export interface err {
  error: 'amountError' |'nameError'

}
export interface pagination {
  page: number
  limit: number
}

export interface AuthResponse {
  user: User; 
  message:string
  token: string;
  success: boolean
 }


// export interface User {
//   _id:string
//   name: string
//   email: string
//   password?: string
//   image: string
//   role: string
//   phone?: string
//   city?: string
//   createdAt?:Date
//   updatedAt?:Date
// }