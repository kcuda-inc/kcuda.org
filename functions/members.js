// Cloudflare Pages Function to protect members page
export async function onRequest(context) {
  const { request } = context;
  
  // Check for authentication cookie
  const cookies = request.headers.get('Cookie') || '';
  const hasAuthCookie = cookies.includes('kcuda_auth=verified');
  
  if (!hasAuthCookie) {
    // Redirect to login page if not authenticated
    return Response.redirect(new URL('/members-login.html', request.url), 302);
  }
  
  // If authenticated, serve the protected content
  // This will fall through to serve the static members.html file
  return null;
}