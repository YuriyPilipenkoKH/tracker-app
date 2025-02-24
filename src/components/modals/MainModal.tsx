import { useEffect } from "react";
import { createPortal } from "react-dom";


interface MainModalProps {
//  contact?: Contact
id?:string
}
const modalRoot = document.getElementById('modal-root');

const MainModal: React.FC<MainModalProps> = () => {

  useEffect(() => {
    const handleBackdropClick =( e:MouseEvent ) => {
      if ((e.target as HTMLElement).classList.contains("modal-backdrop")) {
        // dispatch(onModalClose())
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // dispatch(onModalClose())
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
  }, []);

    if (!modalRoot) return null;
    return createPortal(
   
        <div 
          className={`modal ModalOverlay ${
          modalIsOpen
            ? ['active', 'modal-backdrop'].join(' ')
            : 'modal-backdrop'
            }`}>
          <div className="ModalContainer" >
            <h2> {'lang.appTitle' } </h2>
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