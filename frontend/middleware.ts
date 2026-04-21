import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // 1. Cho phép truy cập trang đăng nhập quản trị mà không cần token
  if (pathname === "/admin/management-login") {
    // Nếu đã có token, thử fetch api/me xem nếu là admin/staff thì đá thẳng vào dashboard luôn, không cho ở lại trang login nữa
    if (token) {
      try {
        const apiBase =
          process.env.NEXT_PUBLIC_API_URL ||
          "http://127.0.0.1:8000/api";
        const response = await fetch(`${apiBase}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        if (response.ok) {
          const user = await response.json();
          if (user.role === "admin")
            return NextResponse.redirect(
              new URL("/admin/dashboard", request.url),
            );
          if (user.role === "staff")
            return NextResponse.redirect(
              new URL("/staff/dashboard", request.url),
            );
          if (user.role === "client")
            return NextResponse.redirect(new URL("/", request.url));
        }
      } catch (error) {
        // Lỗi thì cứ cho đi tiếp vào trang login
      }
    }
    return NextResponse.next();
  }

  // 2. Chặn các route quản trị nếu không có token (giấu vết hoặc đá về client)
  if (!token) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3. Nếu có token, kiểm tra auth
  try {
    const apiBase =
      process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
    const response = await fetch(`${apiBase}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      // Token bị từ chối (hết hạn / server restart mất token DB) -> Xóa cookie
      const res = NextResponse.redirect(new URL("/", request.url));
      res.cookies.delete("auth_token");
      return res;
    }

    const user = await response.json();
    const realRole = user.role;

    // Kiểm tra quyền truy cập Admin
    if (pathname.startsWith("/admin")) {
      if (realRole !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // Kiểm tra quyền truy cập Staff
    if (pathname.startsWith("/staff")) {
      if (realRole !== "staff" && realRole !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Auth Error:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/admin-dashboard/:path*",
    "/staff/:path*",
    "/staff-dashboard/:path*",
  ],
};
