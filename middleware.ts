// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Ce middleware garantit que les routes fonctionnent correctement
// même avec le mode export statique
export function middleware(request: NextRequest) {
  // Si la requête se termine par un slash, on la laisse passer
  if (request.nextUrl.pathname.endsWith('/')) {
    return NextResponse.next();
  }
  
  // Pour les API routes, on les laisse passer telles quelles
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // Redirection des routes non-API vers la version avec slash
  // pour garantir que le fichier .html correct est chargé
  const url = request.nextUrl.clone();
  url.pathname = `${request.nextUrl.pathname}/`;
  return NextResponse.redirect(url);
}

// Configurer les routes qui doivent utiliser ce middleware
export const config = {
  matcher: [
    // Exclut les fichiers statiques
    '/((?!_next/static|favicon.ico|images|fonts|.*\\..*$).*)',
  ],
};