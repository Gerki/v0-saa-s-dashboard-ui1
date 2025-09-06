"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FileBarChart, Plus, Download } from "lucide-react"

interface ReportConfig {
  id: string
  name: string
  includedSections: string[]
  createdAt: Date
}

export function ReportsModule() {
  const [reports, setReports] = useState<ReportConfig[]>([])
  const [newReportName, setNewReportName] = useState("")
  const [selectedSections, setSelectedSections] = useState<string[]>([])

  const reportSections = [
    { id: "files-to-create", label: "Files to be created" },
    { id: "files-created", label: "Files created" },
    { id: "files-uploaded", label: "Files uploaded" },
    { id: "files-authorized", label: "Files sent to authorization" },
    { id: "files-print", label: "Files sent to print" },
    { id: "files-install", label: "Files sent to install" },
    { id: "files-evidence", label: "Files sent to take evidence" },
    { id: "files-match-zone", label: "Files sent to match zone" },
    { id: "inventory-assets", label: "Assets in inventory" },
    { id: "matched-assets", label: "Files matched with assets" },
    { id: "evidence-files", label: "Files to be evidence of" },
    { id: "uploaded-evidence", label: "Files uploaded as evidence" },
  ]

  const createReport = () => {
    if (newReportName.trim() && selectedSections.length > 0) {
      const newReport: ReportConfig = {
        id: Date.now().toString(),
        name: newReportName.trim(),
        includedSections: [...selectedSections],
        createdAt: new Date(),
      }
      setReports([...reports, newReport])
      setNewReportName("")
      setSelectedSections([])
    }
  }

  const toggleSection = (sectionId: string) => {
    setSelectedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const generateReport = (reportId: string) => {
    console.log(`Generating report ${reportId}`)
    // In a real app, this would generate and download the report
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Reports</h1>
        <p className="text-muted-foreground">Create and manage comprehensive reports of your asset management data.</p>
      </div>

      {/* Create New Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Report
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="report-name">Report Name</Label>
            <Input
              id="report-name"
              placeholder="Enter report name"
              value={newReportName}
              onChange={(e) => setNewReportName(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label>Choose Information to Include</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reportSections.map((section) => (
                <div key={section.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={section.id}
                    checked={selectedSections.includes(section.id)}
                    onCheckedChange={() => toggleSection(section.id)}
                  />
                  <Label htmlFor={section.id} className="text-sm font-normal cursor-pointer">
                    {section.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={createReport} disabled={!newReportName.trim() || selectedSections.length === 0}>
            Create Report
          </Button>
        </CardContent>
      </Card>

      {/* Existing Reports */}
      {reports.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileBarChart className="h-5 w-5" />
              Your Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{report.name}</h3>
                      <p className="text-sm text-muted-foreground">Created: {report.createdAt.toLocaleDateString()}</p>
                      <p className="text-sm text-muted-foreground">
                        Sections: {report.includedSections.length} selected
                      </p>
                    </div>
                    <Button size="sm" onClick={() => generateReport(report.id)}>
                      <Download className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {report.includedSections.slice(0, 3).map((sectionId) => {
                      const section = reportSections.find((s) => s.id === sectionId)
                      return (
                        <span key={sectionId} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                          {section?.label}
                        </span>
                      )
                    })}
                    {report.includedSections.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                        +{report.includedSections.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
