function Input({ type, placeholder, styles, ...props }) {
  return (
    <>
      <input 
        type={type}
        className={`bg-transparent p-2 rounded-md border border-input 
          px-3 py-2 text-medium file:border-0 file:bg-transparent file:text-sm 
          file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
          disabled:cursor-not-allowed disabled:opacity-50 max-w-sm outline-none ${styles}`}
        placeholder={placeholder}
        {...props}
      />
    </>
  )
}

export default Input