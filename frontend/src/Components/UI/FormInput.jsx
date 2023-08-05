function FormInput({ value, handleChange, id, placeHolder }) {
  return (
    <>
      <input 
        value={value}
        onChange={handleChange}
        id={id}
        type="text"
        placeholder={placeHolder}
      />
    </>
  )
}

export default FormInput