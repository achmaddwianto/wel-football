import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session;
  const isAdmin = session?.user?.role === "admin";
  const isCustomer = session?.user?.role === "customer";
  const pathname = request.nextUrl.pathname;

  //Proteksi rute admin
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn || !isAdmin) {
      return NextResponse.redirect(
        new URL("/login?callbackUrl=/admin/dashboard", request.url)
      );
    }
  }

  //Proteksi rute customers
  if (
    pathname === "/dashboard" ||
    pathname.startsWith("/orders") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/wishlist") ||
    pathname.startsWith("/shipping")
  ) {
    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${pathname}`, request.url)
      );
    }

    //Jika admin mencoba mengakses halaman customer, redirect ke admin dashboard
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  //Redirect setelah login berdasarkan peran
  if (pathname === "/login" && isLoggedIn) {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else if (isCustomer) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard",
    "/orders/:path*",
    "/cart/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/wishlist/:path*",
    "/shipping/:path*",
    "/login",
  ],
};
