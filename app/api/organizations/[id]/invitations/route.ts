import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { Resend } from "resend"
import { OrganizationInvitationEmail } from "@/components/emails/organization-invitation-email"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient()
    const resend = new Resend(process.env.RESEND_API_KEY)

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { email, role = "member" } = await request.json()

    if (!email?.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Verify user owns the organization
    const { data: organization, error: orgError } = await supabase
      .from("organizations")
      .select("*")
      .eq("id", params.id)
      .eq("user_id", user.id)
      .single()

    if (orgError || !organization) {
      return NextResponse.json({ error: "Organization not found or access denied" }, { status: 404 })
    }

    // Generate invitation token
    const invitationToken = crypto.randomUUID()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 days expiration

    // Store invitation in database (you'll need to create this table)
    const invitationData = {
      id: crypto.randomUUID(),
      organization_id: params.id,
      email: email.trim().toLowerCase(),
      role,
      token: invitationToken,
      expires_at: expiresAt.toISOString(),
      invited_by: user.id,
      status: "pending",
      created_at: new Date().toISOString(),
    }

    // For now, we'll send the email directly
    // In a real app, you'd store the invitation in a database table first

    const invitationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/accept-invitation?token=${invitationToken}&org=${params.id}`

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "Digital Asset Management <noreply@yourdomain.com>",
      to: [email.trim()],
      subject: `Invitation to join ${organization.name}`,
      react: OrganizationInvitationEmail({
        organizationName: organization.name,
        inviterName: user.email || "Team member",
        invitationUrl,
        expiresAt: expiresAt.toLocaleDateString(),
      }),
    })

    if (emailError) {
      console.error("Email error:", emailError)
      return NextResponse.json({ error: "Failed to send invitation email" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `Invitation sent to ${email}`,
      emailId: emailData?.id,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
