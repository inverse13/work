import { NextRequest, NextResponse } from 'next/server'
import { getCoachComment } from '@/lib/ai-coach'

export async function POST(req: NextRequest) {
  const data = await req.json()
  const comment = await getCoachComment(data)
  return NextResponse.json({ comment })
}
