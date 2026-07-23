import { env, SELF } from 'cloudflare:test';
import { beforeEach, describe, expect, it } from 'vitest';

const origin = 'http://localhost:5173';

beforeEach(() => {
	env.ALLOWED_ORIGINS = origin;
});

describe('portfolio contact worker', () => {
	it('rejects unknown origins', async () => {
		const response = await SELF.fetch('http://example.com', {
			method: 'POST',
			headers: {
				Origin: 'https://not-allowed.example',
				'Content-Type': 'application/json',
			},
			body: '{}',
		});

		expect(response.status).toBe(403);
	});

	it('handles CORS preflight requests', async () => {
		const response = await SELF.fetch('http://example.com', {
			method: 'OPTIONS',
			headers: { Origin: origin },
		});

		expect(response.status).toBe(204);
		expect(response.headers.get('Access-Control-Allow-Origin')).toBe(origin);
	});

	it('rejects unsupported methods', async () => {
		const response = await SELF.fetch('http://example.com', {
			method: 'GET',
			headers: { Origin: origin },
		});

		expect(response.status).toBe(405);
	});

	it('validates required contact fields', async () => {
		const response = await SELF.fetch('http://example.com', {
			method: 'POST',
			headers: {
				Origin: origin,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name: 'Ceaser' }),
		});

		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({
			success: false,
			error: 'email is required.',
		});
	});

	it('quietly accepts honeypot submissions', async () => {
		const response = await SELF.fetch('http://example.com', {
			method: 'POST',
			headers: {
				Origin: origin,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ company: 'spam bot' }),
		});

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ success: true });
	});
});
