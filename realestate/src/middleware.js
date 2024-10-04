import { NextResponse } from "next/server";
const authpath = ["/login", "/signup"];
export async function middleware(request) {
  try {
    const isAuthenticated = request.cookies.get("is_auth")?.value;
    const pathName = request.nextUrl.pathname;

    if (isAuthenticated) {
      if (authpath.includes(pathName)) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
    if (!isAuthenticated && !authpath.includes(pathName)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  } catch (error) {
    console.log(error);
  }
}
export const config = { matcher: ["/user/:path*", "/login", "/signup"] };
