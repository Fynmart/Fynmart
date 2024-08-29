"use server";
import { cookies } from "next/headers";

export async function Logout() {
  try {
    cookies().delete("access-token");
    return { message: "You're logged out!", status: 200 };
  } catch (error) {
    return { message: "Something went wrong", status: 401 };
  }
}
