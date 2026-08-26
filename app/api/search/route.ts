import { NextResponse } from 'next/server'
import { searchArticles } from '@/lib/articlesdata'

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('q') || ''
  const suggestions = await searchArticles(query)
  return NextResponse.json(suggestions)
}
