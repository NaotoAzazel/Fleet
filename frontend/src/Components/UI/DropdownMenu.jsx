import { Button } from "./Button.jsx";
import { useState, useRef, useEffect, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export function ListItem({ name, value, selectValue, onSelectChange, setIsActive, inputValueSetter }) {
  return (
    <li
      className={`py-2 px-4 pr-8 rounded text-white cursor-pointer text-sm hover:bg-accent 
        ${selectValue === value && "font-bold"}`}
      key={value}
      onClick={() => {
        inputValueSetter(value);
        onSelectChange(value);
        setIsActive(false);
      }}
    >
      {name}
    </li>
  )
}

export const ListContainer = forwardRef(({
  filteredOptions, 
  isActive, 
  setIsActive, 
  selectValue, 
  onSelectChange,
  children
}, ref) => {
  return (
    <motion.ul 
      className={`bg-background mt-1 z-10 p-0 shadow-lg rounded-[10px] absolute border 
        border-borderColor ${!isActive && "hidden"} overflow-y-auto max-h-60`}
      ref={ref}
      animate={isActive ? { opacity: 1 } : { opacity: .5 }} 
      transition={{ ease: "easeIn", duration: 0.2 }}
    >
      {children}
      <div className="p-1">
        {!filteredOptions.length && <ErrorRow title="Совпадений не найдено." />}
        {filteredOptions.map(({ name, value }) => (
          <ListItem 
            name={name}
            value={value}
            selectValue={selectValue}
            onSelectChange={onSelectChange}
            setIsActive={setIsActive}
            inputValueSetter={() => {}}
          />
        ))}
      </div>
    </motion.ul>
  )
});

function ErrorRow({ title }) {
  return (
    <div className="py-6 text-center text-sm">
      {title}
    </div>
  )
}

function SearchRow({ inputPlaceHolder, inputValue, setInputValue }) {
  return (
    <div className="flex items-center w-full border-b border-borderColor px-3">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" size="sm"/>
      <input 
        className="w-40 h-11 bg-transparent py-3 disabled:cursor-not-allowed outline-none
          placeholder:text-muted-foreground disabled:opacity-50"
        placeholder={inputPlaceHolder}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value.toLowerCase())}
      />
    </div>
  )
}

const dropdownRefs = [];

export function DropdownMenu({ 
  title, 
  options, 
  selectValue, 
  onSelectChange, 
  buttonVariant = "default", 
  isSearchable = false,
  inputPlaceHolder 
}) {
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
      if (menuRef.current && !menuRef.current.contains(event.target))
        setIsActive(false);
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
      <Button
        variant={buttonVariant} 
        className="max-w-[140px]"
        size="sm"
        onClick={handleButtonClick}
      >
        <p className="truncate">{title}</p>
        <FontAwesomeIcon icon={isActive ? faChevronUp : faChevronDown} className="ml-2" />
      </Button>

      <ListContainer 
        filteredOptions={filteredOptions} 
        isActive={isActive} 
        setIsActive={setIsActive} 
        selectValue={selectValue}
        onSelectChange={onSelectChange}
        ref={menuRef}
      >
        {isSearchable && (
          <SearchRow 
            inputPlaceHolder={inputPlaceHolder}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        )}
      </ListContainer>
    </div>
  )
}