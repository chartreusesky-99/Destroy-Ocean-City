const PRINTFUL_BASE = 'https://api.printful.com';
const PRINTFUL_CDN_HOST = 'files.cdn.printful.com';
const ALLOWED_ORIGINS = [
	'https://destroyocean.city',
	'http://localhost:4400'
];

interface Env {
	PRINTFUL_API_KEY: string;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const origin = request.headers.get('Origin') ?? '';
		const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

		const corsHeaders = {
			'Access-Control-Allow-Origin': allowedOrigin,
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': '86400',
		};

		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: corsHeaders });
		}

		if (url.pathname === '/image-proxy') {
			const imageUrl = url.searchParams.get('url');
			if (!imageUrl) {
				return new Response('Missing url parameter', { status: 400, headers: corsHeaders });
			}
			let parsedImageUrl: URL;
			try {
				parsedImageUrl = new URL(imageUrl);
			} catch {
				return new Response('Invalid url parameter', { status: 400, headers: corsHeaders });
			}
			if (parsedImageUrl.hostname !== PRINTFUL_CDN_HOST) {
				return new Response('Forbidden', { status: 403, headers: corsHeaders });
			}
			const imageResponse = await fetch(parsedImageUrl.toString());
			const contentType = imageResponse.headers.get('Content-Type') ?? 'image/png';
			return new Response(imageResponse.body, {
				status: imageResponse.status,
				headers: {
					'Content-Type': contentType,
					'Cache-Control': 'public, max-age=86400',
					...corsHeaders,
				},
			});
		}

		const printfulPath = url.pathname + url.search;
		const printfulUrl = `${PRINTFUL_BASE}${printfulPath}`;

		const printfulResponse = await fetch(printfulUrl, {
			method: request.method,
			headers: {
				'Authorization': `Bearer ${env.PRINTFUL_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: request.method !== 'GET' ? request.body : undefined,
		});

		const data = await printfulResponse.json();

		return new Response(JSON.stringify(data), {
			status: printfulResponse.status,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-store',
				...corsHeaders,
			},
		});
	}
} satisfies ExportedHandler<Env>;