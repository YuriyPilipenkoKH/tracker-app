import styled from '@emotion/styled';


export const Label_DU = styled.label`
  width: 100%;
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
  color: var(--input-color);
  background-color: var(--input-bg);
  border-radius: 12px;
  border: 3px solid #555;
  transition: all 0.8s ease-in-out;
  &::placeholder {
    color: #777;
  }
  &:focus{
    outline:3px solid #2196f3;
    border: 3px solid transparent;
  }
  @media screen and (max-width: 767px) {
        padding: 8px 16px;
        font-size: 14px;
    }
`

export const AuthForm_DU = styled.form`
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media screen and (min-width: 768px) {
    width: 400px;
    }
`