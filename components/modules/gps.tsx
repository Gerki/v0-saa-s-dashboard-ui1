"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock } from "lucide-react"

export function GPSModule() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">GPS Tracking</h1>
        <p className="text-muted-foreground">Location tracking for assets and installations.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Coming Soon</h3>
          <p className="text-muted-foreground">
            GPS tracking capabilities for monitoring asset locations and installation progress.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
