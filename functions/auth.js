import { verifyPassword } from './auth-utils.js';

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const result = await verifyPassword(request, env.MEMBERS_PASSWORD_HASH);

    if (result.ok) {
      const response = new Response('OK', { status: 200 });
      response.headers.set('Set-Cookie', 'kcuda_auth=verified; HttpOnly; Secure; SameSite=Strict; Max-Age=86400; Path=/');
      return response;
    } else {
      return new Response(result.message, { status: result.status });
    }
  } catch (error) {
    return new Response(`Server error: ${error.message}`, { status: 500 });
  }
}
