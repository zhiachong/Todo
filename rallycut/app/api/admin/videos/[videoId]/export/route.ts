import { NextRequest, NextResponse } from 'next/server'

/**
 * Export video with rally highlights
 * POST /api/admin/videos/[videoId]/export
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ videoId: string }> }
) {
  // Next.js 15: params is now async
  const { videoId } = await params

  try {
    // TODO: Implement video export logic
    // 1. Fetch video metadata from database
    // 2. Get rally segments (start/end timestamps)
    // 3. Generate FFmpeg command
    // 4. Queue export job
    // 5. Return job status

    // Placeholder response
    return NextResponse.json({
      success: true,
      videoId,
      message: 'Export feature coming soon',
      segments: [],
      ffmpegCommand: '',
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'Failed to export video' },
      { status: 500 }
    )
  }
}
