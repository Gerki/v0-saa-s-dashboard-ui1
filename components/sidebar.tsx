"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Building2,
  Users,
  FileText,
  Factory,
  Package,
  Target,
  Smartphone,
  MapPin,
  Camera,
  FileBarChart,
  Menu,
  Search,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Shield,
  Printer,
  Wrench,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"

interface SidebarProps {
  activeModule: string
  onModuleChange: (module: string) => void
  user: User
}

export function Sidebar({ activeModule, onModuleChange, user }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const router = useRouter()

  const toggleExpanded = (item: string) => {
    setExpandedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  const getUserInitials = (email: string) => {
    return email.split("@")[0].substring(0, 2).toUpperCase()
  }

  const navigationItems = [
    { id: "organizations", label: "Organizations", icon: Building2 },
    { id: "personas", label: "Personas", icon: Users },
    {
      id: "files",
      label: "Files",
      icon: FileText,
      expandable: true,
      subItems: [
        { id: "files-to-create", label: "Files to be created", icon: FileText },
        { id: "chats", label: "Chats", icon: MessageSquare },
        { id: "authorization", label: "Authorization of Files", icon: Shield },
      ],
    },
    {
      id: "industries",
      label: "Industries",
      icon: Factory,
      expandable: true,
      subItems: [
        { id: "printing", label: "Printing", icon: Printer },
        { id: "installation", label: "Installation", icon: Wrench },
      ],
    },
    { id: "inventory", label: "Inventory of Assets", icon: Package },
    { id: "match-zone", label: "Match Zone", icon: Target },
    { id: "ar", label: "Augmented Reality", icon: Smartphone },
    { id: "gps", label: "GPS Tracking", icon: MapPin },
    { id: "evidences", label: "Evidences", icon: Camera },
    { id: "reports", label: "Reports", icon: FileBarChart },
  ]

  return (
    <div
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-80",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && <h1 className="text-xl font-bold text-sidebar-foreground">Visualgv.com</h1>}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-primary"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Search Bar */}
        {!isCollapsed && (
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-10 bg-input border-border rounded-full" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="p-4 space-y-2">
        {navigationItems.map((item) => (
          <div key={item.id}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                activeModule === item.id && "bg-sidebar-accent text-sidebar-accent-foreground",
                isCollapsed && "px-2",
              )}
              onClick={() => {
                if (item.expandable) {
                  toggleExpanded(item.id)
                } else {
                  onModuleChange(item.id)
                }
              }}
            >
              <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.expandable &&
                    (expandedItems.includes(item.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    ))}
                </>
              )}
            </Button>

            {/* Sub-items */}
            {item.expandable && expandedItems.includes(item.id) && !isCollapsed && (
              <div className="ml-6 mt-2 space-y-1">
                {item.subItems?.map((subItem) => (
                  <Button
                    key={subItem.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-sm text-muted-foreground hover:bg-sidebar-primary hover:text-sidebar-foreground",
                      activeModule === subItem.id && "bg-sidebar-primary text-sidebar-foreground",
                    )}
                    onClick={() => onModuleChange(subItem.id)}
                  >
                    <subItem.icon className="h-3 w-3 mr-2" />
                    {subItem.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center space-x-3 p-3 bg-sidebar-primary rounded-lg">
            <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-sidebar-accent-foreground">
                {getUserInitials(user.email || "")}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user.email?.split("@")[0] || "User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-sidebar-foreground"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
