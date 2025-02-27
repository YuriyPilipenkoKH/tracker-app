import React, { useEffect, } from 'react'
import { createPortal } from 'react-dom';
import { useModalStore } from '../../store/useModalStore';
import { ModalContainer, ModalOverlay } from './MainModal.styled';
import { Transaction } from '../../models/transaction';
import EditTransactionForm from '../forms/EditTransactionForm';
import { useFinanceStore } from '../../store/useFinanceStore';


interface MainModalProps {
  transaction?: Transaction
}
const modalRoot = document.getElementById('modal-root');

const MainModal: React.FC<MainModalProps> = (
  // {transaction}
) => {
  const {modalIsOpen, onModalClose, } = useModalStore()
   const { clearAnyError,} = useFinanceStore()

  useEffect(() => {
    const handleBackdropClick =( e:MouseEvent ) => {
      if ((e.target as HTMLElement).classList.contains("modal-backdrop")) {
        clearAnyError({error: 'nameError'})
        onModalClose()
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearAnyError({error: 'nameError'})
        onModalClose()
        }
    };

    const body = document.body;
    body.style.overflow = 'hidden';
    document.addEventListener('click', handleBackdropClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
        body.style.overflow = 'unset';
        document.removeEventListener('click', handleBackdropClick);
        document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalIsOpen]);


    if (!modalRoot) return null;
    return createPortal(
   
        <ModalOverlay
          className={`modal   ${
          modalIsOpen
            ? ['active', 'modal-backdrop'].join(' ')
            : 'modal-backdrop'
            }`}>
          <ModalContainer  className=''>
            <h3 className='text-2xl'> {'Transaction detais' } </h3>
          
          <EditTransactionForm/>    
          </ModalContainer>
        </ModalOverlay>
      ,
      modalRoot
    )

}

export default MainModal