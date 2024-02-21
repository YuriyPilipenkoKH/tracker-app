import styled, { keyframes } from "styled-components";
import isPropValid from "@emotion/is-prop-valid"

const ulAnimation = keyframes`
    0% {
        transform: rotateX(-90deg)
    }
    70% {
        transform: rotateX(20deg) 
    }
    100% {
        transform: rotateX(0deg) 
    }

`

export const StyledForm = styled.form`
    display: grid;
    gap: 26px;
    padding: 12px 0;
    &>button{
        width: 100%;
        border: 0;
        border-radius: 5px;
        padding: 5px;
        cursor: pointer;
        transition: all 0.4ms ease-in-out;
        &:hover{
            color: #056bbe;
            background-color: #555;
            transition: all 0.4ms ease-in-out;
        }
    }

`
export const StyledTransaction = styled.div.withConfig({
    shouldForwardProp: prop =>
        isPropValid(prop) 
        && prop !== 'price'
          })`
    padding: 8px 4px;
    display: flex;
    justify-content: space-between;
    gap: 16px;
    border-top: 1px solid #30313d;
    &:first-child{
        border: 0;
    }
    &>.right, .left{
        display: grid;
        gap: 16px;
        &>.name{
            font-size: 1.2rem;
        }
        &>.description{
            font-size: 0.8rem;
            color: #888;
        }
        &>.price{
        color: ${({ price }) => 
        ((price > 0) ? "#068806" :  "#bb1212")}; 
        }
    }
`
export const StyledInputWrapper = styled.div`
    display: grid;
    gap: 26px;
    &>input {
        position: relative;
        width: 100%;
        background-color: transparent;
        color: #ddd;
        border: 2px solid #30313d;
        padding: 2px 5px;
        border-radius: 5px;
    }
    &>input[type='datetime-local'] {
        width: 100%;
        background-color: transparent;
        color: #777;
    
    }
`
export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style-type: disc;


  font-size: 18px;
  font-weight: 500;
  margin: 0;
  padding: 0;

   animation: ${ulAnimation} 1s ease;   
`;

export const TransactionContainer = styled.div`
  position: relative;
  /* width: 320px; */
  max-height: 380px;
  box-shadow: var(--shadow-four);
  overflow: auto;
  transition: 1s ease-in-out;

&::-webkit-scrollbar {
    width: 2px;
}
 
`;

export const ErrorWrap = styled.div`
 
    color: #eccc;
    position: absolute;
    bottom: -18px;
    font-size: 12px;
    font-weight: 500;
    z-index: 4;
`
export const Label = styled.label`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    &>input {
        position: relative;
        width: 100%;
        background-color: transparent;
        color: #ddd;
        border: 2px solid #30313d;
        padding: 2px 5px;
        border-radius: 5px;
    }
    
`