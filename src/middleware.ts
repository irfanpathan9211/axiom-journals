import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const isLoginPage = req.nextUrl.pathname === "/admin/login";
    const cookie = req.cookies.get("admin_auth")?.value;
    const isAuthed = cookie === process.env.ADMIN_PASSWORD;

    if (!isAuthed && !isLoginPage) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    if (isAuthed && isLoginPage) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};