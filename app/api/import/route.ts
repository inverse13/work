import { NextRequest, NextResponse } from 'next/server'
import { parseWhoopCsv, parseAppleHealthXml, parseGarminFit, parseOuraJson } from '@/lib/parsers'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File
  const buffer = Buffer.from(await file.arrayBuffer())

  let data
  const name = file.name.toLowerCase()
  if (name.includes('whoop')) data = await parseWhoopCsv(buffer)
  else if (name.includes('apple') || name.endsWith('.xml')) data = await parseAppleHealthXml(buffer)
  else if (name.endsWith('.fit')) data = await parseGarminFit(buffer)
  else if (name.includes('oura')) data = await parseOuraJson(buffer)
  else return NextResponse.json({ error: 'Unsupported file' })

  // Save as posts or metrics (simplified - aggregate to one post)
  const postData = data[0] || {} // Take first entry for demo
  const post = await prisma.post.create({
    data: {
      content: 'Imported data!',
      strain: postData.strain,
      recovery: postData.recovery,
      sleep: postData.sleep,
      hrv: postData.hrv,
      authorId: session.user.id,
    },
  })

  // Add AI comment
  const comment = await getCoachComment(postData)
  // Save comment as post or separate model (demo: console)

  return NextResponse.json({ post, comment })
}
