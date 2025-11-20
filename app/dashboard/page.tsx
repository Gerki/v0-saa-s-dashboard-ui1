import { DashboardClient } from "@/components/dashboard-client"

export default async function DashboardPage() {
  // Mock user for display purposes since auth is disabled
  const mockUser: any = {
    id: "mock-user-id",
    email: "demo@visualgv.com",
    app_metadata: {},
    user_metadata: {},
    aud: "authenticated",
    created_at: new Date().toISOString(),
  }

  return <DashboardClient user={mockUser} />
}
