// Middleware to protect members.html page
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  
  // Only protect /members.html requests
  if (url.pathname === '/members.html') {
    try {
      // Check for authentication cookie
      const cookies = request.headers.get('Cookie') || '';
      const hasAuthCookie = cookies.includes('kcuda_auth=verified');
      
      if (!hasAuthCookie) {
        // Redirect to login page if not authenticated
        return Response.redirect(new URL('/members-login.html', request.url), 302);
      }
    } catch (error) {
      return new Response(`Authentication error: ${error.message}`, { status: 500 });
    }
  }
  
  // Continue to next middleware or serve the static file
  return await next();
}