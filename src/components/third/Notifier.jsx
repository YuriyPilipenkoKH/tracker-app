import React, { useState, useEffect } from 'react';
import { NotifyContainer, NotifyContent } from "./Notifier.styled"
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export  const Notifier = ({text}) => {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
      if (text) {
        setVisible(true);
        const timer = setTimeout(() => {
          setVisible(false);
        }, 8000); 
  
        return () => clearTimeout(timer);
      }
    }, [text]);

    return  createPortal (
    <NotifyContainer 
    visible={visible}
    className="NotifyContainer">
        <NotifyContent className="NotifyContent">
          <h2>{ 'title' }</h2>  

        </NotifyContent>
      
    </NotifyContainer>,
    modalRoot
  )
}