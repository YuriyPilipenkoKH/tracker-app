import styled from '@emotion/styled';

export const BD_Wrapper = styled.div`
  
  display: grid;
  gap: 20px;
  padding: 16px 0;
  transition: all 0.8s ease;

  @media screen and (min-width: 1280px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`