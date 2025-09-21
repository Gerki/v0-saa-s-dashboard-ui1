"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MoreHorizontal, Edit, Archive, RotateCcw } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Organization {
  id: string
  name: string
  isArchived: boolean
}

export function OrganizationsModule() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [newOrgName, setNewOrgName] = useState("")
  const [inviteEmail, setInviteEmail] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")

  const createOrganization = () => {
    if (newOrgName.trim()) {
      const newOrg: Organization = {
        id: Date.now().toString(),
        name: newOrgName.trim(),
        isArchived: false,
      }
      setOrganizations([...organizations, newOrg])
      setNewOrgName("")
    }
  }

  const deleteOrganization = (id: string) => {
    setOrganizations((orgs) => orgs.map((org) => (org.id === id ? { ...org, isArchived: true } : org)))
  }

  const restoreOrganization = (id: string) => {
    setOrganizations((orgs) => orgs.map((org) => (org.id === id ? { ...org, isArchived: false } : org)))
  }

  const startEdit = (org: Organization) => {
    setEditingId(org.id)
    setEditName(org.name)
  }

  const saveEdit = () => {
    if (editName.trim()) {
      setOrganizations((orgs) => orgs.map((org) => (org.id === editingId ? { ...org, name: editName.trim() } : org)))
    }
    setEditingId(null)
    setEditName("")
  }

  const sendInvite = () => {
    if (inviteEmail.trim()) {
      // In a real app, this would send an invitation
      console.log("Sending invite to:", inviteEmail)
      setInviteEmail("")
    }
  }

  const activeOrganizations = organizations.filter((org) => !org.isArchived)
  const archivedOrganizations = organizations.filter((org) => org.isArchived)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Organizations</h1>
        <p className="text-muted-foreground">Create an Organization  - Manage your organizations and invite team members.</p>
      </div>

      {/* Create Organization */}
      <Card>
        <CardHeader>
          <CardTitle>Create Organization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="org-name">Organization Name</Label>
            <div className="flex gap-2">
              <Input
                id="org-name"
                placeholder="Enter organization name"
                value={newOrgName}
                onChange={(e) => setNewOrgName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && createOrganization()}
              />
              <Button onClick={createOrganization} disabled={!newOrgName.trim()}>
                Create
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="invite-email">Invite Team Member</Label>
            <div className="flex gap-2">
              <Input
                id="invite-email"
                type="email"
                placeholder="Enter email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendInvite()}
              />
              <Button variant="outline" onClick={sendInvite} disabled={!inviteEmail.trim()}>
                Send Invite
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Organizations */}
      {activeOrganizations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeOrganizations.map((org) => (
                <div key={org.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  {editingId === org.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && saveEdit()}
                        className="flex-1"
                      />
                      <Button size="sm" onClick={saveEdit}>
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <>
                      <span className="font-medium text-foreground">{org.name}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => startEdit(org)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteOrganization(org.id)} className="text-destructive">
                            <Archive className="h-4 w-4 mr-2" />
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Archived Organizations */}
      {archivedOrganizations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Archived Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {archivedOrganizations.map((org) => (
                <div
                  key={org.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg bg-muted/50"
                >
                  <span className="font-medium text-muted-foreground">{org.name}</span>
                  <Button variant="outline" size="sm" onClick={() => restoreOrganization(org.id)}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Restore
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
