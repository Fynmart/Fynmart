import { NextResponse } from "next/server";
import { generateServerToken, signJWT, verifyJWT } from "@/lib/token";

export async function GET(request) {
  try {
    const token = request.cookies.get("access-token")?.value || undefined;
    const { name, password } = await verifyJWT(token);
    return NextResponse.json({ name, password }, { status: 200 });
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
        table: "users",
        select: [
          "users.id",
          "users.name",
          "users.email",
          "users.phone",
          "users.password",
        ],
        conditions: [
          {
            on: "users.email",
            type: "=",
            value: email,
          },
          {
            on: "users.password",
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

    const token = await signJWT({
      id: data[0].id,
      name: data[0].name,
      phone: data[0].phone,
      email: email[0].email,
    });

    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
