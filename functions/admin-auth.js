export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const contentType = request.headers.get('content-type') || '';
    let password;

    if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await request.text();
      const params = new URLSearchParams(text);
      password = params.get('password');
    } else {
      const formData = await request.formData();
      password = formData.get('password');
    }

    if (!password) {
      return new Response('Password required', { status: 400 });
    }

    const correctPasswordHash = env.ADMIN_PASSWORD_HASH;

    if (!correctPasswordHash) {
      return new Response('Server configuration error', { status: 500 });
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    if (hashHex === correctPasswordHash) {
      const response = new Response('OK', { status: 200 });
      response.headers.set('Set-Cookie', 'kcuda_admin=verified; HttpOnly; Secure; SameSite=Strict; Max-Age=86400; Path=/');
      return response;
    } else {
      return new Response('Invalid password', { status: 401 });
    }

  } catch (error) {
    return new Response(`Server error: ${error.message}`, { status: 500 });
  }
}
