const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const RESEND_EMAIL_URL = 'https://api.resend.com/emails';

const limits = {
	name: 100,
	email: 254,
	subject: 160,
	message: 5000,
};

function corsHeaders(origin, env) {
	const allowedOrigins = new Set(
		(env.ALLOWED_ORIGINS || '')
			.split(',')
			.map((item) => item.trim())
			.filter(Boolean),
	);

	if (!allowedOrigins.has(origin)) return null;

	return {
		'Access-Control-Allow-Origin': origin,
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Max-Age': '86400',
		Vary: 'Origin',
	};
}

function json(data, status, cors) {
	return Response.json(data, {
		status,
		headers: {
			...(cors || {}),
			'Cache-Control': 'no-store',
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
}

function clean(value) {
	return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(value) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validate(body) {
	const message = {
		name: clean(body.name),
		email: clean(body.email),
		subject: clean(body.subject),
		message: clean(body.message),
		turnstileToken: clean(body.turnstileToken),
		company: clean(body.company),
	};

	if (message.company) return { spam: true };

	for (const field of ['name', 'email', 'subject', 'message']) {
		if (!message[field]) {
			return { error: `${field} is required.` };
		}

		if (message[field].length > limits[field]) {
			return { error: `${field} is too long.` };
		}
	}

	if (!isValidEmail(message.email)) {
		return { error: 'Please enter a valid email address.' };
	}

	if (!message.turnstileToken) {
		return { error: 'Please complete the security check.' };
	}

	return { message };
}

function escapeHtml(value) {
	return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

async function verifyTurnstile(token, secret, request) {
	const result = await fetch(TURNSTILE_VERIFY_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			secret,
			response: token,
			remoteip: request.headers.get('CF-Connecting-IP') || undefined,
		}),
	});

	if (!result.ok) return false;

	const verification = await result.json();
	return verification.success === true;
}

async function deliverEmail(message, env) {
	const safe = {
		name: escapeHtml(message.name),
		email: escapeHtml(message.email),
		subject: escapeHtml(message.subject),
		message: escapeHtml(message.message).replaceAll('\n', '<br>'),
	};

	const response = await fetch(RESEND_EMAIL_URL, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${env.RESEND_API_KEY}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			from: env.CONTACT_FROM,
			to: [env.CONTACT_TO],
			reply_to: message.email,
			subject: `[Portfolio] ${message.subject}`,
			html: `
				<h2>New portfolio message</h2>
				<p><strong>From:</strong> ${safe.name} &lt;${safe.email}&gt;</p>
				<p><strong>Subject:</strong> ${safe.subject}</p>
				<hr>
				<p>${safe.message}</p>
			`,
			text: `New portfolio message\n\nFrom: ${message.name} <${message.email}>\nSubject: ${message.subject}\n\n${message.message}`,
		}),
	});

	if (!response.ok) {
		console.error('Resend delivery failed', response.status, await response.text());
		return false;
	}

	return true;
}

export default {
	async fetch(request, env) {
		const origin = request.headers.get('Origin') || '';
		const cors = corsHeaders(origin, env);

		if (!cors) {
			return json({ success: false, error: 'Origin not allowed.' }, 403);
		}

		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: cors });
		}

		if (request.method !== 'POST') {
			return json({ success: false, error: 'Method not allowed.' }, 405, cors);
		}

		if (!request.headers.get('Content-Type')?.includes('application/json')) {
			return json({ success: false, error: 'Expected JSON.' }, 415, cors);
		}

		let body;
		try {
			body = await request.json();
		} catch {
			return json({ success: false, error: 'Invalid JSON.' }, 400, cors);
		}

		const validation = validate(body);

		if (validation.spam) {
			return json({ success: true }, 200, cors);
		}

		if (validation.error) {
			return json({ success: false, error: validation.error }, 400, cors);
		}

		const isHuman = await verifyTurnstile(validation.message.turnstileToken, env.TURNSTILE_SECRET_KEY, request);

		if (!isHuman) {
			return json({ success: false, error: 'Security check failed. Please try again.' }, 400, cors);
		}

		const delivered = await deliverEmail(validation.message, env);

		if (!delivered) {
			return json({ success: false, error: 'Message delivery failed. Please email me directly.' }, 502, cors);
		}

		return json({ success: true }, 200, cors);
	},
};
