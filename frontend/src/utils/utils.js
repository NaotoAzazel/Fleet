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
};

export function getFormattedPagesArray(pagesArray, page) {
  let pages = [...pagesArray];
  const pagesArrayLength = pagesArray.length;
  const dots = "...";

  if(pagesArrayLength < 7) 
    return pages;

  if(page >= 1 && page <= 3) {
    pages = [1, 2, 3, 4, dots, pagesArrayLength];
  } else if(page === 4) {
    const sliced = pages.slice(0, 5);
    pages = [...sliced, dots, pagesArrayLength];
  } else if (page > 4 && page < pagesArrayLength - 2) {
    const sliced1 = pages.slice(page - 2, page);
    const sliced2 = pages.slice(page, page + 1);
    pages = ([1, dots, ...sliced1, ...sliced2, dots, pagesArrayLength]);
  } else if (page > pagesArrayLength - 3) {                 
    const sliced = pages.slice(pagesArrayLength - 4);
    pages = ([1, dots, ...sliced]);
  }

  return pages;
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

export function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  return new Date(date).toLocaleDateString(undefined, options);
}