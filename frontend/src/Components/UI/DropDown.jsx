import { Button } from "../UI/Button.jsx";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "../../Styles/globals.css";

function DropDown({ buttonText, options, active, setActive }) {
  const [selectedValue, setSelectedValue] = useState("");
  const menuRef = useRef(null); 

  const handleButtonClick = (event) => {
    event.stopPropagation();
    setActive(!active);
  };

  useEffect(() => {
    console.log("click")
    // Обработчик события для закрытия меню при клике вне него
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
      <Button className="max-w-[120px]" size="sm" onClick={handleButtonClick}>
        <p className="truncate">{selectedValue ? selectedValue : buttonText}</p>
        <FontAwesomeIcon icon={active ? faChevronUp : faChevronDown} className="ml-2" />
      </Button>

      <ul 
        className={`bg-modalBackground mt-2 z-10 p-2 w-56 shadow-lg rounded-[10px] absolute border border-borderColor 
          ${!active && "hidden"}`}
        ref={menuRef}  
      >
        {options?.map((option) => (
          <li 
            className={`p-3 rounded-[10px] cursor-pointer text-sm hover:bg-background ${selectedValue === option && "font-bold"}`}
            key={option}
            onClick={() => { 
              setSelectedValue(option)
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