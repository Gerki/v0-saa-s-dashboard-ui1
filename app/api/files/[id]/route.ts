import { del } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const supabase = createServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const fileId = params.id

    // Get file record from database
    const { data: file, error: fetchError } = await supabase
      .from("files")
      .select("url, uploaded_by")
      .eq("id", fileId)
      .single()

    if (fetchError || !file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    // Check if user owns the file or is admin
    if (file.uploaded_by !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Delete from Vercel Blob
    await del(file.url)

    // Delete from database
    const { error: deleteError } = await supabase.from("files").delete().eq("id", fileId)

    if (deleteError) {
      console.error("Database delete error:", deleteError)
      return NextResponse.json({ error: "Failed to delete file record" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}
