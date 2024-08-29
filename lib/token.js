"use server";
import { SignJWT, jwtVerify } from "jose";
import { getEnvVariable } from "./utils";
import crypto from "crypto";

export const signJWT = async (payload, options) => {
  try {
    const secret = new TextEncoder().encode(getEnvVariable("JWT_SECRET"));
    const alg = "HS256";
    const jwt = new SignJWT(payload).setProtectedHeader({ alg }).setIssuedAt();

    if (options?.exp) {
      jwt.setExpirationTime(options.exp);
    }

    return jwt.sign(secret);
  } catch (error) {
    throw error;
  }
};

export const verifyJWT = async (token) => {
  try {
    return (
      await jwtVerify(
        token,
        new TextEncoder().encode(getEnvVariable("JWT_SECRET"))
      )
    ).payload;
  } catch (error) {
    throw new Error("Your token has expired.");
  }
};

export const generateServerToken = async () => {
  const signature = getEnvVariable("SERVER_SIGNATURE");
  return crypto.createHash("sha256").update(signature).digest("hex");
};
