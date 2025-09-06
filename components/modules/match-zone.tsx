"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, FileText } from "lucide-react"

interface MatchZoneFile {
  id: string
  name: string
  source: string
  receivedAt: Date
}

export function MatchZoneModule() {
  const [matchZoneFiles] = useState<MatchZoneFile[]>([
    {
      id: "1",
      name: "Sample Installation File",
      source: "Installation Process",
      receivedAt: new Date(),
    },
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Match Zone</h1>
        <p className="text-muted-foreground">Files sent from various processes for matching and coordination.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Files in Match Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          {matchZoneFiles.length === 0 ? (
            <div className="text-center py-12">
              <Target className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Files Yet</h3>
              <p className="text-muted-foreground">
                Files sent from Installation and other processes will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {matchZoneFiles.map((file) => (
                <div key={file.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-medium text-foreground">{file.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          From: {file.source} • Received: {file.receivedAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">Ready for Matching</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
