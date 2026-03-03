// Shared authentication utilities for Cloudflare Pages Functions

export async function verifyPassword(request, envHash) {
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
    return { ok: false, status: 400, message: 'Password required' };
  }

  if (!envHash) {
    return { ok: false, status: 500, message: 'Server configuration error' };
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  if (hashHex === envHash) {
    return { ok: true };
  } else {
    return { ok: false, status: 401, message: 'Invalid password' };
  }
}

export function getCookies(request) {
  return request.headers.get('Cookie') || '';
}

export function hasCookie(request, name) {
  return getCookies(request).includes(name);
}
