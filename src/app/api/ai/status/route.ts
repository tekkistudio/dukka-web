// app/api/ai/status/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Retourner toujours "disponible" pour la démo
  return NextResponse.json({ 
    available: true,
    provider: 'demo'
  });
}