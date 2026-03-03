import { hasCookie } from './auth-utils.js';

export async function onRequestGet(context) {
  const { request, env } = context;

  if (!hasCookie(request, 'kcuda_auth=verified') && !hasCookie(request, 'kcuda_admin=verified')) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // Try KV first
    if (env.TOURNAMENT_HUB) {
      const kvData = await env.TOURNAMENT_HUB.get('tournament-hub', 'text');
      if (kvData) {
        return new Response(kvData, {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Fall back to static JSON
    const fallbackUrl = new URL('/data/tournament-hub.json', request.url);
    const fallbackResponse = await fetch(fallbackUrl);
    const fallbackData = await fallbackResponse.text();

    return new Response(fallbackData, {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(`Error loading tournament hub: ${error.message}`, { status: 500 });
  }
}
