import assert from 'node:assert/strict';
import { test } from 'node:test';
import request from 'supertest';
import { createApp } from './app.js';

test('GET /api/health returns a healthy JSON response', async () => {
  const response = await request(createApp()).get('/api/health');
  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: 'ok' });
  assert.match(response.headers['content-type'] ?? '', /application\/json/);
});

test('unknown routes return a structured 404', async () => {
  const response = await request(createApp()).get('/api/missing');
  assert.equal(response.status, 404);
  assert.deepEqual(response.body, {
    error: { code: 'NOT_FOUND', message: 'Route not found' },
  });
});
