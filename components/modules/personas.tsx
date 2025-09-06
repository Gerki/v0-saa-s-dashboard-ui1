"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MoreHorizontal, Edit, Archive, RotateCcw, ExternalLink } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Persona {
  id: string
  name: string
  link: string
  isArchived: boolean
}

export function PersonasModule() {
  const [personas, setPersonas] = useState<Persona[]>([])
  const [newPersonaName, setNewPersonaName] = useState("")
  const [newPersonaLink, setNewPersonaLink] = useState("")
  const [inviteEmail, setInviteEmail] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [editLink, setEditLink] = useState("")

  const createPersona = () => {
    if (newPersonaName.trim() && newPersonaLink.trim()) {
      const newPersona: Persona = {
        id: Date.now().toString(),
        name: newPersonaName.trim(),
        link: newPersonaLink.trim(),
        isArchived: false,
      }
      setPersonas([...personas, newPersona])
      setNewPersonaName("")
      setNewPersonaLink("")
    }
  }

  const deletePersona = (id: string) => {
    setPersonas((personas) =>
      personas.map((persona) => (persona.id === id ? { ...persona, isArchived: true } : persona)),
    )
  }

  const restorePersona = (id: string) => {
    setPersonas((personas) =>
      personas.map((persona) => (persona.id === id ? { ...persona, isArchived: false } : persona)),
    )
  }

  const startEdit = (persona: Persona) => {
    setEditingId(persona.id)
    setEditName(persona.name)
    setEditLink(persona.link)
  }

  const saveEdit = () => {
    if (editName.trim() && editLink.trim()) {
      setPersonas((personas) =>
        personas.map((persona) =>
          persona.id === editingId ? { ...persona, name: editName.trim(), link: editLink.trim() } : persona,
        ),
      )
    }
    setEditingId(null)
    setEditName("")
    setEditLink("")
  }

  const sendInvite = () => {
    if (inviteEmail.trim()) {
      // In a real app, this would send an invitation
      console.log("Sending persona invite to:", inviteEmail)
      setInviteEmail("")
    }
  }

  const activePersonas = personas.filter((persona) => !persona.isArchived)
  const archivedPersonas = personas.filter((persona) => persona.isArchived)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Personas</h1>
        <p className="text-muted-foreground">Manage your personas and associated links.</p>
      </div>

      {/* Create Persona */}
      <Card>
        <CardHeader>
          <CardTitle>Create Persona</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="persona-name">Persona Name</Label>
              <Input
                id="persona-name"
                placeholder="Enter persona name"
                value={newPersonaName}
                onChange={(e) => setNewPersonaName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="persona-link">Link</Label>
              <Input
                id="persona-link"
                placeholder="Enter link URL"
                value={newPersonaLink}
                onChange={(e) => setNewPersonaLink(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={createPersona} disabled={!newPersonaName.trim() || !newPersonaLink.trim()}>
            Create Persona
          </Button>

          <div className="space-y-2">
            <Label htmlFor="invite-email">Invite User to Persona</Label>
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

      {/* Active Personas */}
      {activePersonas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active Personas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activePersonas.map((persona) => (
                <div key={persona.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  {editingId === persona.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-1">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="Persona name"
                        />
                        <Input value={editLink} onChange={(e) => setEditLink(e.target.value)} placeholder="Link URL" />
                      </div>
                      <Button size="sm" onClick={saveEdit}>
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-foreground">{persona.name}</span>
                          <a
                            href={persona.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 flex items-center gap-1"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="text-sm">View Link</span>
                          </a>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{persona.link}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => startEdit(persona)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deletePersona(persona.id)} className="text-destructive">
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

      {/* Archived Personas */}
      {archivedPersonas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Archived Personas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {archivedPersonas.map((persona) => (
                <div
                  key={persona.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/50"
                >
                  <div className="flex-1">
                    <span className="font-medium text-muted-foreground">{persona.name}</span>
                    <p className="text-sm text-muted-foreground mt-1">{persona.link}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => restorePersona(persona.id)}>
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
