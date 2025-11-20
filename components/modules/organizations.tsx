"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Edit, Trash2, Mail, Plus, Building2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface Organization {
  id: string
  name: string
  description?: string
  industry?: string
  website?: string
  size?: string
  created_at: string
  updated_at: string
}

export function OrganizationsModule() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [inviting, setInviting] = useState<string | null>(null)

  // Form states
  const [newOrg, setNewOrg] = useState({
    name: "",
    description: "",
    industry: "",
    website: "",
    size: "",
  })
  const [inviteEmail, setInviteEmail] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Organization>>({})

  const { toast } = useToast()

  useEffect(() => {
    fetchOrganizations()
  }, [])

  const fetchOrganizations = async () => {
    try {
      const response = await fetch("/api/organizations")
      if (response.ok) {
        const data = await response.json()
        setOrganizations(data.organizations || [])
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch organizations",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching organizations:", error)
      toast({
        title: "Error",
        description: "Failed to fetch organizations",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const createOrganization = async () => {
    if (!newOrg.name.trim()) {
      toast({
        title: "Error",
        description: "Organization name is required",
        variant: "destructive",
      })
      return
    }

    setCreating(true)
    try {
      const response = await fetch("/api/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrg),
      })

      if (response.ok) {
        const data = await response.json()
        setOrganizations([data.organization, ...organizations])
        setNewOrg({ name: "", description: "", industry: "", website: "", size: "" })
        toast({
          title: "Success",
          description: "Organization created successfully",
        })
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || "Failed to create organization",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating organization:", error)
      toast({
        title: "Error",
        description: "Failed to create organization",
        variant: "destructive",
      })
    } finally {
      setCreating(false)
    }
  }

  const updateOrganization = async (id: string) => {
    if (!editData.name?.trim()) {
      toast({
        title: "Error",
        description: "Organization name is required",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch(`/api/organizations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      })

      if (response.ok) {
        const data = await response.json()
        setOrganizations(organizations.map((org) => (org.id === id ? data.organization : org)))
        setEditingId(null)
        setEditData({})
        toast({
          title: "Success",
          description: "Organization updated successfully",
        })
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || "Failed to update organization",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating organization:", error)
      toast({
        title: "Error",
        description: "Failed to update organization",
        variant: "destructive",
      })
    }
  }

  const deleteOrganization = async (id: string) => {
    if (!confirm("Are you sure you want to delete this organization? This action cannot be undone.")) {
      return
    }

    try {
      const response = await fetch(`/api/organizations/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setOrganizations(organizations.filter((org) => org.id !== id))
        toast({
          title: "Success",
          description: "Organization deleted successfully",
        })
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || "Failed to delete organization",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting organization:", error)
      toast({
        title: "Error",
        description: "Failed to delete organization",
        variant: "destructive",
      })
    }
  }

  const sendInvitation = async (organizationId: string) => {
    if (!inviteEmail.trim()) {
      toast({
        title: "Error",
        description: "Email address is required",
        variant: "destructive",
      })
      return
    }

    setInviting(organizationId)
    try {
      const response = await fetch(`/api/organizations/${organizationId}/invitations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail.trim() }),
      })

      if (response.ok) {
        const data = await response.json()
        setInviteEmail("")
        toast({
          title: "Success",
          description: data.message || "Invitation sent successfully",
        })
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || "Failed to send invitation",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error sending invitation:", error)
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive",
      })
    } finally {
      setInviting(null)
    }
  }

  const startEdit = (org: Organization) => {
    setEditingId(org.id)
    setEditData({
      name: org.name,
      description: org.description || "",
      industry: org.industry || "",
      website: org.website || "",
      size: org.size || "",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading organizations...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Organizations</h1>
        <p className="text-muted-foreground">
          Create and manage your organizations, invite team members to collaborate.
        </p>
      </div>

      {/* Create Organization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Organization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="org-name">Organization Name *</Label>
              <Input
                id="org-name"
                placeholder="Enter organization name"
                value={newOrg.name}
                onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-industry">Industry</Label>
              <Select value={newOrg.industry} onValueChange={(value) => setNewOrg({ ...newOrg, industry: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="org-description">Description</Label>
            <Textarea
              id="org-description"
              placeholder="Describe your organization"
              value={newOrg.description}
              onChange={(e) => setNewOrg({ ...newOrg, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="org-website">Website</Label>
              <Input
                id="org-website"
                type="url"
                placeholder="https://example.com"
                value={newOrg.website}
                onChange={(e) => setNewOrg({ ...newOrg, website: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-size">Company Size</Label>
              <Select value={newOrg.size} onValueChange={(value) => setNewOrg({ ...newOrg, size: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="500+">500+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={createOrganization} disabled={!newOrg.name.trim() || creating} className="w-full md:w-auto">
            {creating ? "Creating..." : "Create Organization"}
          </Button>
        </CardContent>
      </Card>

      {/* Organizations List */}
      {organizations.length > 0 ? (
        <div className="grid gap-4">
          {organizations.map((org) => (
            <Card key={org.id}>
              <CardContent className="p-6">
                {editingId === org.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Organization Name *</Label>
                        <Input
                          value={editData.name || ""}
                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Industry</Label>
                        <Select
                          value={editData.industry || ""}
                          onValueChange={(value) => setEditData({ ...editData, industry: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={editData.description || ""}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => updateOrganization(org.id)}>Save</Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditingId(null)
                          setEditData({})
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{org.name}</h3>
                        {org.description && <p className="text-muted-foreground text-sm">{org.description}</p>}
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          {org.industry && <span>Industry: {org.industry}</span>}
                          {org.size && <span>Size: {org.size}</span>}
                          {org.website && (
                            <a
                              href={org.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              Website
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
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
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}

                {/* Invitation Section */}
                {editingId !== org.id && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label className="text-sm font-medium">Invite Team Member</Label>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        onClick={() => sendInvitation(org.id)}
                        disabled={!inviteEmail.trim() || inviting === org.id}
                      >
                        {inviting === org.id ? "Sending..." : "Send Invite"}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No organizations yet</h3>
            <p className="text-muted-foreground mb-4">Create your first organization to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
