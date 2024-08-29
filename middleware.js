import { NextResponse } from "next/server";
import { verifyJWT } from "./lib/token";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("access-token")?.value || undefined;
  console.log(token);
  if (path.startsWith("/panel") && !token) {
    return NextResponse.redirect(new URL("/auth", request.nextUrl));
  } else if (path.startsWith("/panel") && token) {
    try {
      await verifyJWT(token);
    } catch (error) {
      return NextResponse.redirect(new URL("/invalid-auth", request.nextUrl));
    }
  }

  if (path == "/auth" && token) {
    return NextResponse.redirect(new URL("/panel/dashboard", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/panel", "/panel/:path*"],
};
