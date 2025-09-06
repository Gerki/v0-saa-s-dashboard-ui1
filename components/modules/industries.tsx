"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Factory, Printer, Wrench, Send, ArrowRight } from "lucide-react"

interface ProcessFile {
  id: string
  name: string
  externalName?: string
  instructions?: string
  status: "pending" | "in-process" | "completed"
  createdAt: Date
}

interface IndustriesModuleProps {
  activeTab?: string
}

export function IndustriesModule({ activeTab = "industries" }: IndustriesModuleProps) {
  const [selectedIndustry, setSelectedIndustry] = useState("")
  const [printFiles, setPrintFiles] = useState<ProcessFile[]>([])
  const [installFiles, setInstallFiles] = useState<ProcessFile[]>([])
  const [newPrintFileName, setNewPrintFileName] = useState("")
  const [newPrintInstructions, setNewPrintInstructions] = useState("")
  const [newInstallFileName, setNewInstallFileName] = useState("")

  const addPrintFile = () => {
    if (newPrintFileName.trim()) {
      const newFile: ProcessFile = {
        id: Date.now().toString(),
        name: newPrintFileName.trim(),
        externalName: newPrintFileName.trim(),
        instructions: newPrintInstructions.trim(),
        status: "pending",
        createdAt: new Date(),
      }
      setPrintFiles([...printFiles, newFile])
      setNewPrintFileName("")
      setNewPrintInstructions("")
    }
  }

  const addInstallFile = () => {
    if (newInstallFileName.trim()) {
      const newFile: ProcessFile = {
        id: Date.now().toString(),
        name: newInstallFileName.trim(),
        externalName: newInstallFileName.trim(),
        status: "pending",
        createdAt: new Date(),
      }
      setInstallFiles([...installFiles, newFile])
      setNewInstallFileName("")
    }
  }

  const sendToInstall = (fileId: string) => {
    const file = printFiles.find((f) => f.id === fileId)
    if (file) {
      const installFile: ProcessFile = {
        ...file,
        id: Date.now().toString(),
        status: "pending",
      }
      setInstallFiles([...installFiles, installFile])
      setPrintFiles((files) => files.map((f) => (f.id === fileId ? { ...f, status: "completed" } : f)))
    }
  }

  const sendToMatchZone = (fileId: string) => {
    setInstallFiles((files) => files.map((f) => (f.id === fileId ? { ...f, status: "completed" } : f)))
    console.log(`Sending file ${fileId} to Match Zone`)
  }

  const getStatusBadge = (status: ProcessFile["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "in-process":
        return <Badge variant="default">In Process</Badge>
      case "completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Industries & Processes</h1>
        <p className="text-muted-foreground">Manage industry types and processing workflows.</p>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="industries">Industries</TabsTrigger>
          <TabsTrigger value="printing">Printing</TabsTrigger>
          <TabsTrigger value="installation">Installation</TabsTrigger>
        </TabsList>

        <TabsContent value="industries" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Factory className="h-5 w-5" />
                Industry Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="industry-select">Choose Industry Type</Label>
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="advertising">Advertising</SelectItem>
                    <SelectItem value="outdoor-advertising">Outdoor Advertising</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedIndustry && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-medium text-foreground mb-2">Selected Industry: {selectedIndustry}</h3>
                  <p className="text-sm text-muted-foreground">
                    Industry-specific workflows and processes are now available in the Printing and Installation tabs.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Printer className="h-4 w-4" />
                      Printing Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Manage files that need to be printed with specific instructions and requirements.
                    </p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Go to Printing
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Wrench className="h-4 w-4" />
                      Installation Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Handle files that require installation with tracking and match zone integration.
                    </p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Go to Installation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="printing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Printer className="h-5 w-5" />
                Printing Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="print-file-name">External File Name</Label>
                  <Input
                    id="print-file-name"
                    placeholder="Enter file name for printing"
                    value={newPrintFileName}
                    onChange={(e) => setNewPrintFileName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="print-instructions">Printing Instructions</Label>
                  <Textarea
                    id="print-instructions"
                    placeholder="How should this file be printed?"
                    value={newPrintInstructions}
                    onChange={(e) => setNewPrintInstructions(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
              </div>
              <Button onClick={addPrintFile} disabled={!newPrintFileName.trim()}>
                Add to Print Queue
              </Button>
            </CardContent>
          </Card>

          {/* Print Files List */}
          {printFiles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Files in Print Queue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {printFiles.map((file) => (
                    <div key={file.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{file.externalName}</h3>
                          <p className="text-sm text-muted-foreground">Added: {file.createdAt.toLocaleDateString()}</p>
                          {file.instructions && (
                            <p className="text-sm text-muted-foreground mt-1">Instructions: {file.instructions}</p>
                          )}
                        </div>
                        {getStatusBadge(file.status)}
                      </div>

                      {file.status !== "completed" && (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => sendToInstall(file.id)}>
                            <Send className="h-4 w-4 mr-2" />
                            Send to Install
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="installation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Installation Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="install-file-name">External File Name</Label>
                <div className="flex gap-2">
                  <Input
                    id="install-file-name"
                    placeholder="Enter file name for installation"
                    value={newInstallFileName}
                    onChange={(e) => setNewInstallFileName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addInstallFile()}
                  />
                  <Button onClick={addInstallFile} disabled={!newInstallFileName.trim()}>
                    Add to Install Queue
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Install Files List */}
          {installFiles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Files in Installation Queue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {installFiles.map((file) => (
                    <div key={file.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{file.externalName}</h3>
                          <p className="text-sm text-muted-foreground">Added: {file.createdAt.toLocaleDateString()}</p>
                        </div>
                        {getStatusBadge(file.status)}
                      </div>

                      {file.status !== "completed" && (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => sendToMatchZone(file.id)}>
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Send to Match Zone
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Files from Print Process */}
          {printFiles.filter((f) => f.status === "completed").length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Files from Print Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {printFiles
                    .filter((f) => f.status === "completed")
                    .map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 border border-border rounded-lg bg-muted/20"
                      >
                        <div>
                          <span className="font-medium text-foreground">{file.externalName}</span>
                          <p className="text-sm text-muted-foreground">Completed printing process</p>
                        </div>
                        <Badge className="bg-green-500 hover:bg-green-600">Ready for Installation</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
