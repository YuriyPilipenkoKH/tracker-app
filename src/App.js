import './css/App.css';
import { StyledForm, StyledInputWrapper, StyledTransaction } from './components/Transactions.styled';

function App() {
  return (
    <main>
     <h1>$400<span>.00</span></h1>
     <StyledForm>
      <StyledInputWrapper className='basic'>
        <input type ='text' placeholder={'+200 new samsung tv'}/>
        <input type ='datetime-local'/>
      </StyledInputWrapper>
      <StyledInputWrapper className='description'>
        <input type ='text' placeholder={'description'}/>
      </StyledInputWrapper>
     <button type='submit'> Add new transaction </button>
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
