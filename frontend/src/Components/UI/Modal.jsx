import { createPortal } from "react-dom";
import { useEffect, useMemo } from "react";
import "../../Styles/globals.css";

const modalRootElement = document.getElementById("portal");

function Modal({ active, setActive, children }) {
  const element = useMemo(() => document.createElement("div"), []);
    
  useEffect(() => {
    if(active) {
      modalRootElement.appendChild(element);
  
      return () => {
        modalRootElement.removeChild(element);
      };
    }
  })

  if(active) {
    return createPortal(
      <div 
        className="fixed top-0 left-0 w-screen h-screen backdrop-blur bg-opacity-40 flex items-center justify-center"
        onClick={() => setActive(false)}
      >
        <div className="p-[20px] rounded-lg bg-modalBackground shadow-md" onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>,
      element
    );
  }

  return null;
}

export default Modal