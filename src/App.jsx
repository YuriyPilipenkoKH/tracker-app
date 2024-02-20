import './css/App.css';
import { StyledForm, StyledInputWrapper, StyledTransaction } from './components/Transactions.styled';
import { useState } from 'react';

function App() {
  const [name, setName] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [description, setDescription] = useState('')
  
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
    body: JSON.stringify({ name, description, dateTime }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


  return (
    <main>
     <h1>$400<span>.00</span></h1>
     <StyledForm onSubmit={addNewTransaction}>
      <StyledInputWrapper className='basic'>
        <input 
         type ='text'
         value={name}
         onChange={(e) => setName(e.target.value)}
         placeholder={'+200 new samsung tv'}/>
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

    <div className='transactions'>
    <StyledTransaction className='transaction'>
    <div className='left'>
      <div className='name'>New Samsung tv</div>
      <div className='description'>it was time for new tv</div>
    </div>
    <div className='right'>
      <div className='price'>$500</div>
      <div className='datetime'>2024-02-12 13:45</div>
    </div>
    </StyledTransaction>

    </div>

    </main>
  );
}

export default App;


