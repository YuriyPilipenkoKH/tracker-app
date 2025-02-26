import styled from '@emotion/styled';


export const Label_DU = styled.label`
  display: flex;
  flex-direction: column;
  gap: 2px;

`

export const Input_DU = styled.input`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: 0.64px;
  color: var(--text-color);
  border-radius: 12px;
  border: 3px solid #555;
  transition: all 0.5s ease-in-out;
  &::placeholder {
    color: var(--placeholder-input-color);
  }
  &:focus{
    outline: 4px solid #2196f3;
  }
  @media screen and (max-width: 768px) {
        padding: 8px 16px;
        font-size: 14px;
    }
`