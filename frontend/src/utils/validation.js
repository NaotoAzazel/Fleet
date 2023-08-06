import * as Yup from "yup";

const alphanumericRegex = /^[a-zA-Z0-9]+$/;

const validationFields = Yup.object().shape({
  name: Yup.string()
    .min(1, "Too short")
    .max(40, "Too long")
    .matches(alphanumericRegex, "Invalid value")
    .required("Required"),
  color: Yup.string()
    .min(1, "Too short")
    .max(20, "Too long")
    .matches(alphanumericRegex, "Invalid value")
    .required("Required"),
  plate: Yup.string()
    .min(1, "Too short")
    .max(10, "Too long")
    .matches(alphanumericRegex, "Invalid value")
    .required("Required"),
  category: Yup.string()
    .min(1, "Too short")
    .max(20, "Too long")
    .matches(alphanumericRegex, "Invalid value")
    .required("Required"),
});

export default validationFields;