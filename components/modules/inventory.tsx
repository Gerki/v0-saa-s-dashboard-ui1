"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Clock } from "lucide-react"

export function InventoryModule() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Inventory of Assets</h1>
        <p className="text-muted-foreground">Manage your digital asset inventory.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Asset Inventory
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Coming Soon</h3>
          <p className="text-muted-foreground">Add assets to your inventory and track their usage across projects.</p>
        </CardContent>
      </Card>
    </div>
  )
}
