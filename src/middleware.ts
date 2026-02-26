// src/middleware.ts
// Rate limiting et protection de base pour les routes API
import { NextRequest, NextResponse } from 'next/server';

// Stockage en mémoire des compteurs (réinitialisé à chaque cold start Vercel)
// Pour une protection plus robuste en production, utiliser Vercel KV ou Upstash Redis
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMITS = {
  '/api/ai/chat': { maxRequests: 30, windowMs: 60 * 1000 },   // 30 req/min
  '/api/ai/status': { maxRequests: 60, windowMs: 60 * 1000 },  // 60 req/min
  default: { maxRequests: 100, windowMs: 60 * 1000 },           // 100 req/min
};

function getRateLimit(pathname: string) {
  for (const [route, limit] of Object.entries(RATE_LIMITS)) {
    if (route !== 'default' && pathname.startsWith(route)) return limit;
  }
  return RATE_LIMITS.default;
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function isRateLimited(key: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (record.count >= maxRequests) return true;

  record.count++;
  return false;
}

// Nettoyage périodique pour éviter les fuites mémoire
function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) rateLimitMap.delete(key);
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Appliquer uniquement aux routes API
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const ip = getClientIp(request);
  const { maxRequests, windowMs } = getRateLimit(pathname);
  const key = `${ip}:${pathname}`;

  // Nettoyage tous les 1000 appels environ
  if (Math.random() < 0.001) cleanupExpiredEntries();

  if (isRateLimited(key, maxRequests, windowMs)) {
    return NextResponse.json(
      { error: 'Trop de requêtes. Veuillez réessayer dans quelques instants.' },
      {
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Limit': String(maxRequests),
          'Content-Type': 'application/json',
        },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
