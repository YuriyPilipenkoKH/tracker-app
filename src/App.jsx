import './css/App.css';
import { ErrorWrap,  List, StyledForm,  StyledLabel,  StyledTransaction, TransactionContainer } from './components/Transactions.styled';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { ValidationSchema } from './models/schemas';
import { zodResolver } from "@hookform/resolvers/zod";
import {  getTransactions } from './utils/fetch';


function App() {

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


  const {
    register,
    handleSubmit,
    formState,
    reset,
    getValues
  } = useForm({
    defaultValues: {
      name: '',
      price: null,
      dateTime: '',
      description: '',
    },
    mode: 'all',
    resolver: zodResolver(ValidationSchema(totalBalance))
  });

  const {
    errors,
    isDirty,
    isValid,
    isSubmitSuccessful
  } = formState;

  useEffect(() => {
    if(isSubmitSuccessful) {
        reset()
    }
}, [isSubmitSuccessful, reset])
  
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
const { name, price, description, dateTime } = getValues();

function addNewTransaction(data) {
  // e.preventDefault();
  const url = process.env.REACT_APP_API_URL + '/transaction';
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
    <main>
     <div className='upperWrapper'>
       <h1>$ {totalBalance}<span>.00</span></h1>
       <p className='trAmount'>{transactions.length }</p>
     </div>
     <StyledForm onSubmit={handleSubmit(addNewTransaction)}
                 autoComplete="off"
                 noValidate>
        <StyledLabel>
          <input
            {...register('price', {
              validate: (value) => parseFloat(value) <= totalBalance || 'Price should not be greater than total balance',
            })}
            type ='text'
            errors={errors?.price }
            placeholder={'$'}/>
            {errors?.price && (
          <ErrorWrap>{errors.price.message}</ErrorWrap>
              )}
        </StyledLabel>
        <StyledLabel>
          <input
            {...register('name')}
            type ='text'
            errors={errors?.name }
            placeholder={'transaction name'}/>
            {errors?.name && (
          <ErrorWrap>{errors.name.message}</ErrorWrap>
              )}
        </StyledLabel>  
        <StyledLabel>
          <input
          type ='datetime-local'
          {...register('dateTime')}
           errors={errors?.dateTime }
          />
          {errors?.dateTime && (
        <ErrorWrap>{errors.dateTime.message}</ErrorWrap>
            )}
         </StyledLabel>
   
        <StyledLabel>
          <input
            {...register('description')}
            type ='text'
            errors={errors?.description }
            placeholder={'description'}/>
            {errors?.description && (
          <ErrorWrap>{errors.description.message}</ErrorWrap>
              )}
        </StyledLabel>
    
     <button 
        type='submit'
        disabled={!isDirty || !isValid}> 
        Add new transaction </button>
     </StyledForm>
    <TransactionContainer>

    <List  className='transactions'>
     {transactions.length > 0 && transactions.map((item) => (
       <StyledTransaction className='transaction' key={item._id} price ={item.price}>
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


