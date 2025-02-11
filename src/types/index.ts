export interface img {
  image: File
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
