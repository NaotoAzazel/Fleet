import { createPortal } from "react-dom";
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import "../../../Styles/globals.css";

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
  }, [active]);

  if(active) {
    return createPortal(
      <div 
        className="fixed top-0 left-0 w-screen h-screen backdrop-blur bg-opacity-40 flex items-center 
        justify-center"
        onClick={() => setActive(false)}
      >
        <motion.div 
          onClick={e => e.stopPropagation()}
          className="py-4 rounded-[10px] bg-background shadow-md
            border border-borderColor" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeIn", duration: 0.2 }}
        >
          {children}
        </motion.div>
      </div>,
      element
    );
  }

  return null;
}

export default Modal