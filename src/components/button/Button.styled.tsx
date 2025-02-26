import styled from '@emotion/styled';

export const buttonStyles =`
  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: var(--green);
  color: #eee;
  border: none;
  border-radius: 4px;
  padding: 12px 24px ;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  box-shadow: var(--shadow-four);
  transition: all 0.4s ease;

  &:hover  {
    color: #888;
    background-color: var(--bright-green);
    box-shadow: var(--shadow-two);
  
    & >svg {
    fill: #888;
    }
  }

  &:active {
    transform: scale(0.98);
  }
`

export const ripple=`
&:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #5b24ff 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.4s, opacity 1s;
}

&:active:after {
  transform: scale(0, 0);
  opacity: 0.3;
  transition: 0s;
}

&:disabled {
  cursor: none;
  background-color: #888;

  &:hover {
    color: #eee;
  background-color: #888;
  box-shadow: var(--shadow-four);
  }
}
`

export const StyledButton = styled.button`
  position: relative;
  overflow: hidden;


  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: var(--green);
  color: var(--text-color);
  border: none;
  border-radius: 8px;
  padding: 12px 24px ;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  box-shadow: var(--shadow-four);
  transition: all 0.4s ease;

  &:hover  {
    color: #888;
    background-color: var(--bright-green);
    box-shadow: var(--shadow-two);
  
    & >svg {
    fill: #888;
    }
  }
  /* ${ripple} ; */

`;

export const StyledArrowButton = styled.button`
  position: relative;
  overflow: hidden;

  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const StyledFlatButton = styled.button`
    padding: 0;
    outline: none;
    border:none;
    background-color: transparent;
    cursor: pointer; 
    transition: all 0.4s ease-in-out; 

`