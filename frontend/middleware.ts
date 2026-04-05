import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// XÓA dòng import getMe đi nhé

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  const { pathname } = request.nextUrl;

  // Nếu không có token, chặn ngay lập tức
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // 1. Phải dùng thẳng URL API, không qua axios hay service bên ngoài
    const response = await fetch("http://127.0.0.1:8000/api/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const user = await response.json();
    const realRole = user.role;

    // ... (Code chặn quyền phía dưới giữ nguyên)
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/admin-dashboard")
    ) {
      if (realRole !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    if (
      pathname.startsWith("/staff") ||
      pathname.startsWith("/staff-dashboard")
    ) {
      if (realRole !== "staff" && realRole !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Auth Error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/admin-dashboard/:path*", // Bắt thêm cái này!
    "/staff/:path*",
    "/staff-dashboard/:path*",
  ],
};
