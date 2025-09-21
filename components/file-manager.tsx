"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { File, ImageIcon, Video, FileText, Download, Trash2, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FileRecord {
  id: string
  name: string
  url: string
  size: number
  type: string
  category: string
  created_at: string
  organizations?: { name: string }
  personas?: { name: string }
}

export function FileManager() {
  const [files, setFiles] = useState<FileRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/files")
      if (!response.ok) throw new Error("Failed to fetch files")
      const data = await response.json()
      setFiles(data.files)
    } catch (error) {
      console.error("Error fetching files:", error)
      toast({
        title: "Error",
        description: "Failed to load files",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  const deleteFile = async (id: string) => {
    try {
      const response = await fetch(`/api/files/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete file")

      setFiles(files.filter((file) => file.id !== id))
      toast({
        title: "File deleted",
        description: "File has been successfully deleted",
      })
    } catch (error) {
      console.error("Error deleting file:", error)
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      })
    }
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="h-5 w-5" />
    if (type.startsWith("video/")) return <Video className="h-5 w-5" />
    if (type.includes("pdf") || type.includes("document")) return <FileText className="h-5 w-5" />
    return <File className="h-5 w-5" />
  }

  const filteredFiles = files.filter(
    (file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return <div className="p-4">Loading files...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>File Manager</CardTitle>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {filteredFiles.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              {searchTerm ? "No files match your search" : "No files uploaded yet"}
            </p>
          ) : (
            filteredFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  {getFileIcon(file.type)}
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="secondary">{file.category}</Badge>
                      <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      <span>{new Date(file.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => window.open(file.url, "_blank")}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteFile(file.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
