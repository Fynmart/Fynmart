import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateServerToken, signJWT, verifyJWT } from "@/lib/token";
import CryptoJS from "crypto-js";

export async function GET(request) {
  try {
    const token = request.cookies.get("access-token")?.value || undefined;
    const { name, role } = await verifyJWT(token);
    return NextResponse.json({ name, role }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
  }
}

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const serverToken = await generateServerToken();

    const api = await fetch(process.env.API_ENDPOINT + "read.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-TOKEN": serverToken,
      },
      body: JSON.stringify({
        table: "authentication",
        select: [
          "authentication.id",
          "authentication.name",
          "authentication.email",
          "authentication.role",
          "authentication.password",
          "authentication.phone",
        ],
        conditions: [
          {
            on: "authentication.email",
            type: "=",
            value: email,
          },
          {
            on: "authentication.password",
            type: "=",
            value: password,
          },
        ],
      }),
    });

    const { data } = await api.json();

    if (!data.length) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const api_key = CryptoJS.AES.encrypt(
      data[0].api_key,
      process.env.API_ENDPOINT
    ).toString();

    const token = await signJWT(
      {
        id: data[0].id,
        name: data[0].name,
        role: data[0].role,
        access_key: api_key,
      },
      { exp: "60m" }
    );

    const cookieOptions = {
      name: "access-token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.API_ENDPOINT !== "development",
      maxAge: 3600,
    };

    await Promise.all([cookies().set(cookieOptions)]);

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
