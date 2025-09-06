"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { OrganizationsModule } from "@/components/modules/organizations"
import { PersonasModule } from "@/components/modules/personas"
import { FilesModule } from "@/components/modules/files"
import { IndustriesModule } from "@/components/modules/industries"
import { InventoryModule } from "@/components/modules/inventory"
import { MatchZoneModule } from "@/components/modules/match-zone"
import { ARModule } from "@/components/modules/ar"
import { GPSModule } from "@/components/modules/gps"
import { EvidencesModule } from "@/components/modules/evidences"
import { ReportsModule } from "@/components/modules/reports"

export default function Dashboard() {
  const [activeModule, setActiveModule] = useState("organizations")

  const renderModule = () => {
    switch (activeModule) {
      case "organizations":
        return <OrganizationsModule />
      case "personas":
        return <PersonasModule />
      case "files":
      case "files-to-create":
        return <FilesModule />
      case "chats":
        return <FilesModule activeTab="chats" />
      case "authorization":
        return <FilesModule activeTab="authorization" />
      case "industries":
      case "printing":
      case "installation":
        return <IndustriesModule activeTab={activeModule} />
      case "inventory":
        return <InventoryModule />
      case "match-zone":
        return <MatchZoneModule />
      case "ar":
        return <ARModule />
      case "gps":
        return <GPSModule />
      case "evidences":
        return <EvidencesModule />
      case "reports":
        return <ReportsModule />
      default:
        return <OrganizationsModule />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{renderModule()}</div>
      </main>
    </div>
  )
}
