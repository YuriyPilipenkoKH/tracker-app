import styled from 'styled-components';

export const StyledListBar = styled.div`
width: 280px;
display: grid;
gap: 4px;
grid-template-columns: repeat(4, 1fr);
`

export  const SortBtns = styled.button`
padding: 8px;
border-radius: 6px;
border: transparent;
background-color: #888;
color: #eee;
font-weight: 600;
letter-spacing: 2px;
transition: 0.2s ease;

&:active,
&:focus {
    background-color: var(--blue);
    box-shadow: var(--shadow-four);
}
`