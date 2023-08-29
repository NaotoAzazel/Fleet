function DropDown({ options, active, setActive }) {
  if(active) {
    return (
      <ul 
        className="bg-modalBackground z-10 p-2 w-56 shadow-lg rounded-[10px] absolute border border-borderColor top-56 ml-0"
      >
        <div className="grid space-y-1">
          {options.map((option) => (
            <div 
              key={option}
              className="p-3 rounded-[10px] cursor-pointer text-sm hover:bg-background"
              onClick={() => setActive(false)}
            >
              {option}
            </div>
          ))}
        </div>
      </ul>
    )
  }
}

export default DropDown