import { hasCookie } from './auth-utils.js';

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!hasCookie(request, 'kcuda_admin=verified')) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    if (!env.TOURNAMENT_HUB) {
      return new Response('KV namespace not configured', { status: 500 });
    }

    const body = await request.json();

    if (!body.title || !body.tournaments || !Array.isArray(body.tournaments)) {
      return new Response('Invalid data: title and tournaments array required', { status: 400 });
    }

    await env.TOURNAMENT_HUB.put('tournament-hub', JSON.stringify(body));

    return new Response('OK', { status: 200 });

  } catch (error) {
    return new Response(`Error saving: ${error.message}`, { status: 500 });
  }
}
