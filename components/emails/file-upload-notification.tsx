import { Body, Container, Head, Heading, Html, Link, Preview, Text } from "@react-email/components"

interface FileUploadNotificationProps {
  fileName: string
  fileUrl: string
  uploaderName: string
}

export const FileUploadNotification = ({ fileName, fileUrl, uploaderName }: FileUploadNotificationProps) => (
  <Html>
    <Head />
    <Preview>New file uploaded: {fileName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New File Uploaded</Heading>
        <Text style={text}>A new file has been uploaded to your Digital Asset Management system.</Text>
        <Text style={text}>
          <strong>File:</strong> {fileName}
          <br />
          <strong>Uploaded by:</strong> {uploaderName}
        </Text>
        <Link href={fileUrl} style={button}>
          View File
        </Link>
        <Link href={`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/files`} style={linkButton}>
          Go to File Manager
        </Link>
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

const linkButton = {
  color: "#000",
  fontSize: "16px",
  textDecoration: "underline",
  textAlign: "center" as const,
  display: "block",
  margin: "8px 0",
}
