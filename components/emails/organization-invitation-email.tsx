import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components"

interface OrganizationInvitationEmailProps {
  organizationName: string
  inviterName: string
  invitationUrl: string
  expiresAt: string
}

export function OrganizationInvitationEmail({
  organizationName,
  inviterName,
  invitationUrl,
  expiresAt,
}: OrganizationInvitationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>You've been invited to join {organizationName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>You're invited to join {organizationName}</Heading>

          <Text style={text}>
            {inviterName} has invited you to join their organization "{organizationName}" on Digital Asset Management.
          </Text>

          <Text style={text}>Click the button below to accept the invitation and create your account:</Text>

          <Section style={buttonContainer}>
            <Button style={button} href={invitationUrl}>
              Accept Invitation
            </Button>
          </Section>

          <Text style={text}>
            This invitation will expire on {expiresAt}. If you don't want to join this organization, you can safely
            ignore this email.
          </Text>

          <Text style={footer}>
            If the button doesn't work, copy and paste this link into your browser:
            <br />
            {invitationUrl}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
}

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  textAlign: "center" as const,
}

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
  padding: "0 40px",
}

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
}

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
}

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  margin: "16px 0",
  padding: "0 40px",
}
