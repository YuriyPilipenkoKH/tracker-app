export interface User {
  _id:string
  name: string
  email: string
  password?: string
  image: string
  role: string
  phone?: string
  city?: string
  createdAt?:Date
  updatedAt?:Date
}

export interface img {
  image: File
}

export interface loginResponse {
  success: boolean
  message: string
}

export interface profile {
  name: string
}
export interface dummyUserTypes {
  _id:string
  name: string
  email: string
  image: string
  role: string
}

