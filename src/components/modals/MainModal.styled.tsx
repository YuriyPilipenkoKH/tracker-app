'use client'
import styled from '@emotion/styled'
import isPropValid from '@emotion/is-prop-valid';
import { css } from '@emotion/react';

interface PicWrapperProps {
    imgUrl: string;
}

const PicWrapperStyles = css`
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 5px;
`


export const PicWrapper = styled("div", {
    shouldForwardProp: (prop: string) =>
      isPropValid(prop) && !["imgUrl"].includes(prop),
    })<PicWrapperProps>(
        ({ imgUrl }) => css`
					background-image: ${imgUrl ? `url(${imgUrl})` : 'none'};
					background-size: cover ;
					background-position: center;
					${PicWrapperStyles}
        `
    );




export const ModalOverlay = styled.div`

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000029;
  display: grid;
  place-items: center;
  z-index: 5;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s, visibility 0.5ms; 


  
&.modal.active {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.5ms;
}
`;

export const ModalContainer = styled.div`

  width: 360px;
  position: relative;
  display: grid;
  place-items: center;
  gap: 20px;  
  background-color: #0d0da7;
  padding: 60px 20px;
  border-radius: 16px;
  z-index: 7;
  color: var(--text-color);
  @media screen and (min-width: 768px) {
    width: 500px;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  text-align: center;

  @media screen and (min-width: 768px) {
    font-size: 36px;
  }
`;


export const ModalCategory = styled.div`
  width: 126px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 20px;
  top: 55px;
  font-size: 14px;
  color: var(--black);
  font-weight: 600;
  padding: 11px;
  background-color: var(--light-blue);
  border-radius: 0 16px 16px 0;

  @media screen and (min-width: 768px) {
    left: 32px;
  }
`;

export const ModalText = styled.p`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  margin: 0;
  padding-bottom: 20px;
  border: none;

  @media screen and (min-width: 768px) {
    font-size: 20px;

  }
`;

export const ModalImage = styled.img`
  /* max-width: 100%;
  height: auto; */
  width:240px;
  height: 240px;
  border-radius: 0px 0px 40px 40px;

  @media screen and (min-width: 768px) {
    width: 262px;
    height: 300px;

  }
  
`;

export const ContentWrapp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;





