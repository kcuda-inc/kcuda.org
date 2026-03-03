import { hasCookie } from './auth-utils.js';

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Protect admin pages with admin cookie
  if (url.pathname === '/admin.html' || url.pathname === '/admin') {
    if (!hasCookie(request, 'kcuda_admin=verified')) {
      return Response.redirect(new URL('/admin-login.html', request.url), 302);
    }
  }

  // Protect members pages with members cookie
  if (['/members.html', '/members', '/members-calendar.html', '/members-calendar'].includes(url.pathname)) {
    if (!hasCookie(request, 'kcuda_auth=verified')) {
      return Response.redirect(new URL('/members-login.html', request.url), 302);
    }
  }

  return await next();
}
