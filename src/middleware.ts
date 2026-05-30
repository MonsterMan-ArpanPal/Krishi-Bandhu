import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "~/utils/supabase/middleware";
import { createServerClient } from "@supabase/ssr";
import { env } from "~/env";

export async function middleware(request: NextRequest) {
  // 1. Refresh session
  const response = await updateSession(request);

  // 2. Check auth status for route protection
  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll() {
          // Cookies are already set in updateSession
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  // 3. Protect routes
  if (!user && path === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4. Redirect logged-in users away from login
  if (user && path === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
