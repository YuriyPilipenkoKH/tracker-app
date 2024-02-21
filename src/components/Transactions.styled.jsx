import styled from "styled-components";
import isPropValid from "@emotion/is-prop-valid"

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
    padding: 12px 4px;
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