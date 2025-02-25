import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useModalStore } from "../../store/useModalStore";
import { Transaction } from "../../models/transaction";


interface MainModalProps {
 transaction: Transaction
}
const modalRoot = document.getElementById('modal-root');

const MainModal: React.FC<MainModalProps> = ({transaction}) => {
  const {modalIsOpen, onModalClose} = useModalStore()
  useEffect(() => {
    const handleBackdropClick =( e:MouseEvent ) => {
      if ((e.target as HTMLElement).classList.contains("modal-backdrop")) {
        onModalClose()
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onModalClose()
        }
    };

    const body = document.body;
    body.style.overflow = 'hidden';
    document.addEventListener("click", handleBackdropClick, true); // Capture phase
    document.addEventListener('keydown', handleKeyDown);

    return () => {
        body.style.overflow = 'unset';
        document.removeEventListener("click", handleBackdropClick, true);
        document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalIsOpen]);
  
  const clickOverlay =(e:React.MouseEvent) => {
    console.log(e.currentTarget);
  }

    if (!modalRoot) return null;
    return createPortal(
   
        <div 
          onClick={(e) =>clickOverlay(e)}
          className={`modal ModalOverlay ${
          modalIsOpen
            ? ['active', 'modal-backdrop'].join(' ')
            : 'modal-backdrop'
            }`}>
          <div className="ModalContainer" >
            <h2> {transaction._id} </h2>
            <p> {'lang.updateInfo'} </p>

            {/* <EditContactForm 
              contact={ contact || fakeContact } /> */}
          </div>
        </div>
      ,
      modalRoot
    )

}

export default MainModal