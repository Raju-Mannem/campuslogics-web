import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isApiAdminRoute = req.nextUrl.pathname.startsWith("/api/admin");
  const isAdminPageRoute = req.nextUrl.pathname.startsWith("/admin");
  const isAuthPage = req.nextUrl.pathname.startsWith("/admin-login");

  if (isLoggedIn && isAuthPage) {
    return Response.redirect(new URL("/admin", req.nextUrl));
  }

  if (!isLoggedIn && !isAuthPage && isAdminPageRoute) {
    return Response.redirect(new URL("/admin-login", req.nextUrl));
  }

  if (( isAdminPageRoute || isAdminPageRoute ) && !isLoggedIn) {
    if (isApiAdminRoute) {
      return new Response(
        JSON.stringify({ error: "Unauthorized access" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    return Response.redirect(new URL("/admin-login", req.nextUrl));
  }
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};