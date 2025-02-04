import React, { useEffect, useState } from 'react'
import { getTransactions } from '../lib/axios'

const Temp = () => {
  const [transactions, setTransactions] = useState([])
  const [reRender, setReRender] = useState(false)

  useEffect(() => {
    getTransactions().then(list => {
      setTransactions(list)
    })
  }, [reRender])
  
  const totalBalance = transactions.reduce((acc, transaction) => {
    return acc + (transaction.price || 0);
  }, 0);







  
  //  function addNewTransaction (e) {
//     e.preventDefault()
//     const url = .REACT_APP_API_URL+'/transaction'
//     fetch(url, {
//       method: 'POST',
//       headers: {'Content-type': 'application/json' },
//       body: JSON.stringify({ name,description,dateTime})
//     }).then(response => {
//       response.json()
//       .then(data => {
//       console.log(data)
//       })
//     })
//   }
const { name, price, description, dateTime } = getValues();

function addNewTransaction(data) {
  // e.preventDefault();
  const url = import.meta.env.REACT_APP_API_URL + '/transaction';
  console.log(url)
  fetch(url, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ name, price, description, dateTime }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setReRender(true)

      console.log(data);
    })
    .finally(setReRender(false))
    .catch((error) => {
      console.error('Error:', error);
    });
}


  return (
    <div>Temp</div>
  )
}

export default Temp