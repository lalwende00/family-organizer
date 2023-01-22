import { Fragment, useState } from "react";

function Modal() {

     const [modal, setModal] = useState<any>({
        content: String,
        options: {
            closeButton: true,
            darkMode: false
        }
     });
     const [isOpen, setIsOpen] = useState(true)
     
     if(isOpen) {
        return ( 
        <Fragment>
            <div
                //Background of the modal
                className={`modal-background ${modal.options.darkMode && 'dark'}`}
                // If the close button is hidden, the user can close the modal
                // by clicking in the background (Outside the modal)
                onClick={() => !modal.options.closeButton && setIsOpen(false)}
                style={{ cursor: modal.options.closeButton ? 'auto' : 'pointer' }}
            />

            <div /* Modal container/card/wrapper */ className={`modal ${modal.options.darkMode && 'dark'}`}>
                {modal.content}
            </div>

            {
                modal.options.closeButton
                ? <button onClick={() => setIsOpen(false)} className={`modal-close-button ${modal.options.darkMode && 'dark'}`}>✖</button>
                : null
            }
        </Fragment>
        )
     }
     return null;
}
export default Modal