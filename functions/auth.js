// Cloudflare Pages Function for password authentication
export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const formData = await request.formData();
    const password = formData.get('password');
    
    if (!password) {
      return new Response('Password required', { status: 400 });
    }
    
    // Get the password hash from environment variables
    const correctPasswordHash = env.MEMBERS_PASSWORD_HASH;
    
    if (!correctPasswordHash) {
      return new Response('Server configuration error', { status: 500 });
    }
    
    // Hash the provided password
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Compare hashes
    if (hashHex === correctPasswordHash) {
      // Set secure session cookie
      const response = new Response('OK', { status: 200 });
      response.headers.set('Set-Cookie', 'kcuda_auth=verified; HttpOnly; Secure; SameSite=Strict; Max-Age=86400; Path=/');
      return response;
    } else {
      return new Response('Invalid password', { status: 401 });
    }
    
  } catch (error) {
    return new Response('Server error', { status: 500 });
  }
}