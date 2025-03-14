// src/app/api/ai/status/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  // Vérifier si les clés API sont configurées en utilisant des variables d'environnement
  // plutôt que de vérifier window
  const aiAvailable = process.env.OPENAI_API_KEY || process.env.CLAUDE_API_KEY 
    ? true 
    : false;

  // Renvoyer le statut
  return NextResponse.json({ 
    available: aiAvailable,
    provider: process.env.CLAUDE_API_KEY 
      ? 'claude' 
      : process.env.OPENAI_API_KEY 
        ? 'openai' 
        : 'demo'
  });
}