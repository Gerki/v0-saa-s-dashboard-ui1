import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { WelcomeEmail } from "@/components/emails/welcome-email"
import { FileUploadNotification } from "@/components/emails/file-upload-notification"
import { OrganizationInvitationEmail } from "@/components/emails/organization-invitation-email"

export async function POST(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Check authentication
    const supabase = createServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { type, to, data } = await request.json()

    let emailContent
    let subject

    switch (type) {
      case "welcome":
        subject = "Welcome to Digital Asset Management"
        emailContent = WelcomeEmail({
          userEmail: to,
          userName: data.userName || "User",
        })
        break

      case "file-upload":
        subject = "New File Uploaded"
        emailContent = FileUploadNotification({
          fileName: data.fileName,
          fileUrl: data.fileUrl,
          uploaderName: data.uploaderName,
        })
        break

      case "organization-invitation":
        subject = `Invitation to join ${data.organizationName}`
        emailContent = OrganizationInvitationEmail({
          organizationName: data.organizationName,
          inviterName: data.inviterName,
          invitationUrl: data.invitationUrl,
          expiresAt: data.expiresAt,
        })
        break

      default:
        return NextResponse.json({ error: "Invalid email type" }, { status: 400 })
    }

    const { data: emailData, error } = await resend.emails.send({
      from: "Digital Asset Management <noreply@yourdomain.com>",
      to: [to],
      subject,
      react: emailContent,
    })

    if (error) {
      console.error("Email error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: emailData?.id })
  } catch (error) {
    console.error("Email API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
