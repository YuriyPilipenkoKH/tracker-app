import './css/App.css';
import { List, StyledForm, StyledInputWrapper, StyledTransaction, TransactionContainer } from './components/Transactions.styled';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';


function App() {
  const [price, setPrice] = useState(0)
  const [name, setName] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [description, setDescription] = useState('')
  const [transactions, setTransactions] = useState([])
  const [reRender, setReRender] = useState(false)

  useEffect(() => {
    getTransactions().then(list => {
      setTransactions(list)
    })
  }, [reRender])

 async function getTransactions () {
    const url = process.env.REACT_APP_API_URL + '/transactions';
    const response = await fetch(url)
    console.log(response)
    const result = await response.json()
    console.log(result)
    return result
  }
  const totalBallance = transactions.reduce((acc, transaction) => {
    return acc + (transaction.price || 0);
  }, 0);
  
  //  function addNewTransaction (e) {
//     e.preventDefault()
//     const url = process.env.REACT_APP_API_URL+'/transaction'
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

function addNewTransaction(e) {
  e.preventDefault();
  const url = process.env.REACT_APP_API_URL + '/transaction';
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
      setPrice(0)
      setName('')
      setDescription('')
      setDateTime('')
      setReRender(true)
      console.log(data);
    })
    .finally(setReRender(false))
    .catch((error) => {
      console.error('Error:', error);
    });
}


  return (
    <main>
     <div className='upeerWrapper'>
       <h1>$ {totalBallance}<span>.00</span></h1>
       <p className='trAmount'>{transactions.length }</p>
     </div>
     <StyledForm onSubmit={addNewTransaction}>
      <StyledInputWrapper className='basic'>
        <input 
         type ='text'
         value={price}
         onChange={(e) => setPrice(e.target.value)}
         placeholder={'$'}/>
        <input 
         type ='text'
         value={name}
         onChange={(e) => setName(e.target.value)}
         placeholder={'transaction name'}/>
        <input 
        type ='datetime-local'
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}/>
      </StyledInputWrapper>
      <StyledInputWrapper className='description'>
        <input 
        type ='text' 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={'description'}/>
      </StyledInputWrapper>
     <button type='submit'> 
     Add new transaction </button>
     
     </StyledForm>
    <TransactionContainer>

    <List  className='transactions'>
     {transactions.length > 0 && transactions.map((item) => (
       <StyledTransaction className='transaction' key={item.dateTime} price ={item.price}>
        <div className='left'>
          <div className='name'>{ item.name }</div>
          <div className='description'>{ item.description }</div>
        </div>
        <div className='right'>
          <div className='price'>{ item.price && Math.abs(item.price) }</div>
          <div className='datetime'>{ format(item.dateTime, 'MMM-dd-yy, HH:mm') }</div>
          
        </div>
        </StyledTransaction>
     ))}
 
    </List>
     </TransactionContainer>

    </main>
  );
}

export default App;


