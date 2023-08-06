import { Field } from "formik";

function FormInput({ error, touched, label, id, placeHolder, ...inputProps }) {
  return (
    <div div className="flex flex-col mb-4">
      <label htmlFor={id}>{label}</label>
      <Field 
        name={id}
        placeholder={placeHolder}
        className="border border-borderColor rounded-[5px] h-8 p-2"
        {...inputProps}
      />
      {error && touched && (
        <div className="text-orange-500">Ошибка: {error}</div>
      )}
    </div>
  )
}

export default FormInput