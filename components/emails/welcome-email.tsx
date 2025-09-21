import { Body, Container, Head, Heading, Html, Link, Preview, Text } from "@react-email/components"

interface WelcomeEmailProps {
  userEmail: string
  userName: string
}

export const WelcomeEmail = ({ userEmail, userName }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Digital Asset Management</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to Digital Asset Management!</Heading>
        <Text style={text}>Hi {userName},</Text>
        <Text style={text}>Welcome to your new Digital Asset Management platform. You can now:</Text>
        <Text style={text}>
          • Upload and organize your digital assets • Create and manage organizations and personas • Track your files
          with advanced categorization • Collaborate with your team members
        </Text>
        <Text style={text}>Get started by logging into your dashboard and uploading your first files.</Text>
        <Link href={`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`} style={button}>
          Go to Dashboard
        </Link>
        <Text style={text}>If you have any questions, feel free to reach out to our support team.</Text>
        <Text style={text}>
          Best regards,
          <br />
          The Digital Asset Management Team
        </Text>
      </Container>
    </Body>
  </Html>
)

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
}

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
}

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
}

const button = {
  backgroundColor: "#000",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
  margin: "16px 0",
}
