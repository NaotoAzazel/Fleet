import { Button } from "../UI/Button.jsx";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "../../Styles/globals.css";

function DropDown({ buttonText, options, selectValue, onSelectChange }) {
  const [active, setActive] = useState(false);
  const menuRef = useRef(null); 

  const handleButtonClick = (event) => {
    event.stopPropagation();
    setActive(!active);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActive(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [active]);

  return (
    <div className="font-medium items-center">
      <Button className="max-w-[140px]" size="sm" onClick={handleButtonClick}>
        <p className="truncate">{buttonText}</p>
        <FontAwesomeIcon icon={active ? faChevronUp : faChevronDown} className="ml-2" />
      </Button>

      <ul 
        className={`bg-background mt-2 z-10 p-2 shadow-lg rounded-[10px] absolute border 
        border-borderColor ${!active && "hidden"}`}
        ref={menuRef}  
      >
        {!options.length && <p className="text-white text-sm">В меню нет полей</p>}
        {options?.map((option) => (
          <li 
            className={`p-3 pr-8 rounded-[10px] text-white cursor-pointer text-sm hover:bg-accent 
              ${selectValue === option && "font-bold"}
            `}
            key={option}
            onClick={() => { 
              onSelectChange(option)
              setActive(false)
            }}
          >
            {option}
          </li>
        ))}
      </ul>

    </div>
  )
}

export default DropDown