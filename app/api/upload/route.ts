import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
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

    const formData = await request.formData()
    const file = formData.get("file") as File
    const organizationId = formData.get("organizationId") as string
    const personaId = formData.get("personaId") as string
    const category = (formData.get("category") as string) || "general"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Generate unique filename with timestamp
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name}`

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
    })

    // Save file metadata to Supabase
    const { data: fileRecord, error: dbError } = await supabase
      .from("files")
      .insert({
        name: file.name,
        url: blob.url,
        size: file.size,
        type: file.type,
        category,
        organization_id: organizationId || null,
        persona_id: personaId || null,
        uploaded_by: user.id,
      })
      .select()
      .single()

    if (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json({ error: "Failed to save file metadata" }, { status: 500 })
    }

    return NextResponse.json({
      id: fileRecord.id,
      url: blob.url,
      filename: file.name,
      size: file.size,
      type: file.type,
      category,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
