'use server'

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
//import { verifyAuthToken } from "./lib/jwt";

// Define paths that should bypass auth
const PUBLIC_PATHS = ["/login", "/register"]; //, "/"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/")) {
    const authToken = request.cookies.get("jwt")?.value;
    const refreshToken = request.cookies.get("refresh-token")?.value;

    if (!authToken && !refreshToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    //if refresh token
        //get next token

    // if (authToken) {
    //   try {
    //     const decoded = await verifyAuthToken(authToken);
    //     if (decoded) {
    //       return NextResponse.next();
    //     }
    //   } catch (error) {
    //     console.error("Error verifying auth token:", error);
    //     return NextResponse.redirect(new URL("/login", request.url));
    //   }
    // }

    return NextResponse.next();
    //return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
    matcher: [
      "/((?!api|_next/static|_next/image|favicon.ico).*)"
    ],
  };
  

// export const config = {
//   matcher: ["/:path*"],
// };