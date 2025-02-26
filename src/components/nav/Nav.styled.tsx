import styled from '@emotion/styled'; 


export const MobileWrap = styled.div`
    @media screen and (min-width: 1279px) {
      display: none;
    }
`

export const DeskWrap = styled.div`
    @media screen and (max-width: 1280px) {
      display: none;
    }
`