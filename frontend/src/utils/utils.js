import clsx from "clsx";
import { twMerge } from "tailwind-merge";

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
