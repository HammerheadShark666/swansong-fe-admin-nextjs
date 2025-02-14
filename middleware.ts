'use server'

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { refreshTokenLogin } from "./app/(auth)/refreshTokenLogin/actions/refreshTokenLogin";
import { isErrorResponse } from "./app/interfaces/errorResponse"; 

// Define paths that should bypass auth
const PUBLIC_PATHS = ["/login", "/register", "/forgotten-password", "/reset-password"];

export async function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/")) 
  {
    const authToken = request.cookies.get("jwt")?.value;
    const refreshToken = request.cookies.get("refresh-token")?.value;

    if (!authToken && !refreshToken)
      return NextResponse.redirect(new URL("/login", request.url));
 
    if (!authToken && refreshToken)
    {
      const response = await refreshTokenLogin(refreshToken)
      if(isErrorResponse(response))
        return NextResponse.redirect(new URL("/login", request.url)); 
      else
        return NextResponse.redirect(new URL(request.url, request.url)); 
    }  
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ],
}; 