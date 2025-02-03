import axiosInstance  from 'axios'
import { Transaction } from '../models/transaction';

const HOST = import.meta.env.VITE_HOST


export const axios = axiosInstance.create({
  
  baseURL:  `${HOST}/api`,
  withCredentials:true,
  headers: { "Content-Type": "application/json" }
})

export async function getTransactions() {
  try {
    const url = process.env.REACT_APP_API_URL + '/transactions';
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}



export async function getTotalBallance() {
 const transactions =  getTransactions().then(list => {

     const totalBallance = list.reduce((acc: number, transaction: Transaction) => {
        return acc + (transaction.price || 0);
      }, 0);
      return totalBallance
})
 console.log(transactions)
 
}

