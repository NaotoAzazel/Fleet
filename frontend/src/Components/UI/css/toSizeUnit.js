export const toSizeUnit = (value) => 
  typeof value === "number" ? `${value}px` : value;