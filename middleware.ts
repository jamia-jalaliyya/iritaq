// middleware.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const role = (req.auth?.user as { role?: string })?.role;
  const pathname = req.nextUrl.pathname;

  // 1. Redirect users visiting exact `/admin` directly to `/admin/dashboard`
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }

  // 2. Protect sub-routes (e.g. /admin/settings, /admin/domains, etc.) for non-admins
  // Keep /admin/dashboard accessible so unauthenticated users can see the login form
  const isProtectedAdminRoute =
    pathname.startsWith('/admin/') && pathname !== '/admin/dashboard';

  if (isProtectedAdminRoute && (!isLoggedIn || role !== 'admin')) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*'],
};