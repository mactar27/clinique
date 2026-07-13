import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  // Only apply this middleware to /admin paths
  if (req.nextUrl.pathname.startsWith("/admin")) {
    // Exclude the login page itself from the check to avoid redirect loops
    if (req.nextUrl.pathname === "/admin/login") {
      return NextResponse.next()
    }

    const session = req.cookies.get("admin_session")

    // If no valid session cookie, redirect to login page
    if (!session || session.value !== "authenticated") {
      const loginUrl = new URL("/admin/login", req.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
