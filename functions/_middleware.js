// Middleware to protect members.html page
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  
  // Protect admin pages with admin cookie
  if (url.pathname === '/admin.html' || url.pathname === '/admin') {
    try {
      const cookies = request.headers.get('Cookie') || '';
      if (!cookies.includes('kcuda_admin=verified')) {
        return Response.redirect(new URL('/admin-login.html', request.url), 302);
      }
    } catch (error) {
      return new Response(`Authentication error: ${error.message}`, { status: 500 });
    }
  }

  // Protect members pages with members cookie
  if (['/members.html', '/members', '/members-calendar.html', '/members-calendar'].includes(url.pathname)) {
    try {
      const cookies = request.headers.get('Cookie') || '';
      const hasAuthCookie = cookies.includes('kcuda_auth=verified');

      if (!hasAuthCookie) {
        return Response.redirect(new URL('/members-login.html', request.url), 302);
      }
    } catch (error) {
      return new Response(`Authentication error: ${error.message}`, { status: 500 });
    }
  }
  
  // Continue to next middleware or serve the static file
  return await next();
}