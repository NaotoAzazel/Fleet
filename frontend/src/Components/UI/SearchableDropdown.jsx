import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect, forwardRef } from "react";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { ListItem } from "./DropdownMenu.jsx";

const ListContainer = forwardRef(({ 
  filteredOptions, 
  isActive, 
  setIsActive, 
  selectValue, 
  onSelectChange,
  setInputValue
}, ref) => {
  return (
    <ul className={`bg-background mt-1 z-10 p-0 shadow-lg rounded-md absolute border 
      border-borderColor ${!isActive && "hidden"} overflow-y-auto max-h-60`}
      ref={ref}
    >
      <div className={`p-1 w-40 ${!filteredOptions.length && "hidden"}`}>
        {filteredOptions?.map(({ name, value }) => (
          <ListItem 
            name={name}
            value={value}
            selectValue={selectValue}
            onSelectChange={onSelectChange}
            setIsActive={setIsActive}
            inputValueSetter={setInputValue}
          />
        ))}
      </div>    
    </ul>
  )
});

const dropdownRefs = [];

function SearchableDropdown({ inputPlaceHolder, options, selectValue, onSelectChange }) {
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const menuRef = useRef(null); 

  dropdownRefs.push({ ref: menuRef, setIsActive: setIsActive });

  useEffect(() => {
    const filteredOptions = options.filter(({ name }) => name.toLowerCase().includes(inputValue));
    setFilteredOptions(filteredOptions);
  }, [inputValue]);

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

  const handleButtonClick = (event) => {
    event.stopPropagation();
    
    dropdownRefs.forEach((item) => {
      if(item.ref !== menuRef && item.ref.current) 
        item.setIsActive(false);
    });

    setIsActive(!isActive);
  };

  return (
    <div className="font-medium">
      <div 
        className="border border-borderColor h-10 w-full px-3 flex items-center rounded-md"
        onClick={handleButtonClick}
      >
        <input
          className="w-28 h-11 bg-transparent py-3 disabled:cursor-not-allowed outline-none
            placeholder:text-muted-foreground disabled:opacity-50 text-white"
          placeholder={inputPlaceHolder}
          value={selectValue}
          onChange={(e) => {
            setInputValue(e.target.value.toLowerCase());
            onSelectChange(e.target.value);
          }}
        />
        <FontAwesomeIcon 
          icon={isActive ? faChevronUp : faChevronDown} 
          className="ml-2" 
          color="white"
        />
      </div>

      <ListContainer 
        filteredOptions={filteredOptions} 
        isActive={isActive} 
        setIsActive={setIsActive} 
        selectValue={selectValue}
        onSelectChange={onSelectChange}
        ref={menuRef}
        setInputValue={setInputValue}
      />
    </div>
  )
}

export default SearchableDropdown