function Input({ type, placeholder, ...props }) {
  return (
    <>
      <input 
        type={type}
        className="bg-transparent p-2 rounded-[10px] border border-borderColor"
        placeholder={placeholder}
        {...props}
      />
    </>
  )
}

export default Input