import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const setSearchParams = function (url: string, objects: { [key: string]: string }): string {
  let str = '';
  for (const key in objects) {
    str += `${key}=${objects[key]}&`;
  }

  return `${url}?${str.substring(0, str.length - 1)}`;
}