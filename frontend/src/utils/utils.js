import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import PostService from "../API/PostService";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getPageCount = (totalCount, limit) => Math.ceil(totalCount / limit);

export function getPagesArray(totalPages) {
  let result = []; 
  for(let i = 0; i < totalPages; i++) {
    result.push(i + 1);
  }

  return result;
}

export async function addTransport(name, color, plate, category, file) {
  const formData = new FormData();

  formData.append("name", name);
  formData.append("takeBy", "");
  formData.append("color", color);
  formData.append("plate", plate);
  formData.append("category", category);
  formData.append("image", file);

  PostService.createTransport(formData);
}

export function toFormattedOptions(array) {
  return array.map((field) => {
    return ({
      value: field, name: field
    })
  })
}

export function handleButtonText(nickName, userData) {
  if(nickName === userData?.user_metadata?.full_name)
    return "Вернуть";

  if(nickName.length) 
    return "Недоступна";

  return "Забрать";
}