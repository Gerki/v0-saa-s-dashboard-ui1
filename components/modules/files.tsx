"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, MessageSquare, Shield, Send, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileItem {
  id: string
  name: string
  status: "pending" | "uploaded" | "authorized"
  thumbnail?: string
  createdAt: Date
}

interface ChatMessage {
  id: string
  message: string
  sender: "user" | "other"
  timestamp: Date
}

interface FilesModuleProps {
  activeTab?: string
}

export function FilesModule({ activeTab = "files" }: FilesModuleProps) {
  const [files, setFiles] = useState<FileItem[]>([])
  const [newFileName, setNewFileName] = useState("")
  const [inviteEmail, setInviteEmail] = useState("")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [dragActive, setDragActive] = useState(false)

  const createFile = () => {
    if (newFileName.trim()) {
      const newFile: FileItem = {
        id: Date.now().toString(),
        name: newFileName.trim(),
        status: "pending",
        createdAt: new Date(),
      }
      setFiles([...files, newFile])
      setNewFileName("")
    }
  }

  const uploadFile = (fileId: string) => {
    setFiles((files) => files.map((file) => (file.id === fileId ? { ...file, status: "uploaded" } : file)))
  }

  const authorizeFile = (fileId: string) => {
    setFiles((files) => files.map((file) => (file.id === fileId ? { ...file, status: "authorized" } : file)))
  }

  const sendToProcess = (fileId: string, process: string) => {
    console.log(`Sending file ${fileId} to ${process}`)
    // In a real app, this would handle the workflow
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        message: newMessage.trim(),
        sender: "user",
        timestamp: new Date(),
      }
      setChatMessages([...chatMessages, message])
      setNewMessage("")
    }
  }

  const sendInvite = () => {
    if (inviteEmail.trim()) {
      console.log("Sending chat invite to:", inviteEmail)
      setInviteEmail("")
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    droppedFiles.forEach((file) => {
      const newFile: FileItem = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        status: "uploaded",
        createdAt: new Date(),
      }
      setFiles((prev) => [...prev, newFile])
    })
  }

  const getStatusBadge = (status: FileItem["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "uploaded":
        return <Badge variant="default">Uploaded</Badge>
      case "authorized":
        return <Badge className="bg-green-500 hover:bg-green-600">Authorized</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Files Management</h1>
        <p className="text-muted-foreground">Manage your files, chat sessions, and authorization workflows.</p>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="files">Files to be Created</TabsTrigger>
          <TabsTrigger value="chats">Chats</TabsTrigger>
          <TabsTrigger value="authorization">Authorization</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="space-y-6">
          {/* Create File */}
          <Card>
            <CardHeader>
              <CardTitle>Create New File</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file-name">File Name</Label>
                <div className="flex gap-2">
                  <Input
                    id="file-name"
                    placeholder="Enter file name"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && createFile()}
                  />
                  <Button onClick={createFile} disabled={!newFileName.trim()}>
                    Create
                  </Button>
                </div>
              </div>

              {/* File Upload Area */}
              <div className="space-y-2">
                <Label>Upload Files</Label>
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                    dragActive ? "border-primary bg-primary/5" : "border-border",
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">Drop files here to upload</p>
                  <p className="text-muted-foreground mb-4">or</p>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="invite-email">Invite User to Chat Session</Label>
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

          {/* Files List */}
          {files.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Files</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {files.map((file) => (
                    <div key={file.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{file.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Created: {file.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                        {getStatusBadge(file.status)}
                      </div>

                      {file.status === "uploaded" && (
                        <div className="bg-muted/50 rounded-lg p-4 mb-3">
                          <p className="text-sm text-muted-foreground text-center">Thumbnail image will be here</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        {file.status === "pending" && (
                          <Button size="sm" onClick={() => uploadFile(file.id)}>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                          </Button>
                        )}
                        {file.status === "uploaded" && (
                          <Button size="sm" onClick={() => authorizeFile(file.id)}>
                            <Shield className="h-4 w-4 mr-2" />
                            Authorize
                          </Button>
                        )}
                        {file.status === "authorized" && (
                          <Select onValueChange={(value) => sendToProcess(file.id, value)}>
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Send to:" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="print">Print</SelectItem>
                              <SelectItem value="install">Install</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="chats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Chat Messages */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {chatMessages.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No messages yet. Start a conversation!</p>
                ) : (
                  chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={cn(
                          "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground ml-auto"
                            : "bg-muted text-muted-foreground mr-auto",
                        )}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                  className="min-h-[60px]"
                />
                <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="authorization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Authorization of Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              {files.filter((file) => file.status === "uploaded").length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No files ready for authorization. Upload files first.
                </p>
              ) : (
                <div className="space-y-4">
                  {files
                    .filter((file) => file.status === "uploaded")
                    .map((file) => (
                      <div key={file.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-medium text-foreground">{file.name}</h3>
                            <p className="text-sm text-muted-foreground">Ready for authorization</p>
                          </div>
                          {getStatusBadge(file.status)}
                        </div>

                        <div className="bg-muted/50 rounded-lg p-4 mb-3">
                          <p className="text-sm text-muted-foreground text-center">Thumbnail image will be here</p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => authorizeFile(file.id)}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Authorize File
                          </Button>
                          <Button size="sm" variant="outline">
                            <X className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
