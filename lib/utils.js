import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getEnvVariable(key) {
  const value = process.env[key];

  if (!value || value.length === 0) {
    throw new Error(`The environment variable ${key} is not set.`);
  }

  return value;
}

export const PATH_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost/assam-jov-api/"
    : "";
