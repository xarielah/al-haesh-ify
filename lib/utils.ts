import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { IUserEvent } from "./db/models/event.model";
import { ItemCategory } from "./db/models/item.model";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nameAbbrv(name: string) {
  return name
    .split(" ")
    .map((s) => s[0])
    .join("");
}

export function getDateFromIsraeliFormat(date: string) {
  const [day, month, year] = date.split("/");
  return new Date(+year, +month - 1, +day);
}

export function getTextColor(hexColor: string) {
  // Remove the # if it exists
  hexColor = hexColor.replace("#", "");

  // Convert hex to RGB
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Calculate luminance - using the formula for relative luminance in the sRGB color space
  // See: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for bright colors and white for dark colors
  // Using 0.5 as the threshold (can be adjusted)
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getMembersAndCategories(event: IUserEvent) {
  if (!event) return { members: [], categories: [] };

  const data: { members: any[]; categories: ItemCategory[] } = {
    members: [...event?.members],
    categories: [],
  };

  data.categories = event.items.reduce<ItemCategory[]>((acc, cur) => {
    const accResult = [...acc];
    if (
      !cur.category ||
      acc.find(
        (c) => c.color === cur.category.color && c.name === cur.category.name
      )
    )
      return accResult;
    accResult.push(cur.category);
    return accResult;
  }, [] as ItemCategory[]);

  return data;
}
