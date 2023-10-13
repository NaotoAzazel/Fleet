import { Button } from "../UI/Button.jsx";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "../../Styles/globals.css";

function DropDown({ buttonText, options, selectValue, onSelectChange, buttonVariant = "default" }) {
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef(null); 

  const handleButtonClick = (event) => {
    event.stopPropagation();
    setIsActive(!isActive);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isActive]);

  return (
    <div className="font-medium items-center">
      <Button 
        variant={buttonVariant} 
        className="max-w-[140px]" 
        size="sm" 
        onClick={handleButtonClick}
      >
        <p className="truncate">{buttonText}</p>
        <FontAwesomeIcon icon={isActive ? faChevronUp : faChevronDown} className="ml-2" />
      </Button>
      
      <motion.ul 
        className={`bg-background mt-2 z-10 p-2 shadow-lg rounded-[10px] absolute border 
          border-borderColor ${!isActive && "hidden"}`}
        ref={menuRef} 
        animate={isActive ? { opacity: 1 } : { opacity: 0}} 
        transition={{ ease: "easeIn", duration: 0.2 }}
      >
        {!options.length && <p className="text-white text-sm">В меню нет полей</p>}
        {options?.map(({ name, value }) => (
          <li 
            className={`p-3 pr-8 rounded-[10px] text-white cursor-pointer text-sm hover:bg-accent 
              ${selectValue === value && "font-bold"}
            `}
            key={value}
            onClick={() => { 
              onSelectChange(value)
              setIsActive(false)
            }}
          >
            {name}
          </li>
        ))}
      </motion.ul>
    </div>
  )
}

export default DropDown