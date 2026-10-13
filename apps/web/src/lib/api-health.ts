/** Verify the API response rather than treating any 2xx response as healthy. */
export async function checkApiHealth(fetcher: typeof fetch = fetch): Promise<void> {
  const response = await fetcher('/api/health', {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`Health request failed: ${response.status}`);

  const body: unknown = await response.json();
  if (typeof body !== 'object' || body === null || !('status' in body) || body.status !== 'ok') {
    throw new Error('Unexpected health response');
  }
}
