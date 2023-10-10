function Input({ type, placeholder, styles, ...props }) {
  return (
    <>
      <input 
        type={type}
        className={`bg-transparent p-2 rounded-[10px] border border-borderColor 
          focus:input ${styles}`}
        placeholder={placeholder}
        {...props}
      />
    </>
  )
}

export default Input