import { describe, expect, it } from 'vitest';
import { checkApiHealth } from './api-health';

function withResponse(response: Response): typeof fetch {
  return async () => response;
}

describe('API health contract', () => {
  it('accepts the documented response', async () => {
    await expect(checkApiHealth(withResponse(new Response(JSON.stringify({ status: 'ok' }), {
      status: 200,
    })))).resolves.toBeUndefined();
  });

  it('rejects HTTP errors', async () => {
    await expect(checkApiHealth(withResponse(new Response('unavailable', {
      status: 503,
    })))).rejects.toThrow('Health request failed: 503');
  });

  it('rejects unexpected payloads', async () => {
    await expect(checkApiHealth(withResponse(new Response(JSON.stringify({ status: 'unknown' }), {
      status: 200,
    })))).rejects.toThrow('Unexpected health response');
  });
});
