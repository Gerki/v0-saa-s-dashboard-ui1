import { FileUpload } from "@/components/file-upload"
import { FileManager } from "@/components/file-manager"

export default function FilesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">File Management</h1>
        <p className="text-muted-foreground">Upload, organize, and manage your digital assets</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <FileUpload />
        <div className="lg:col-span-2">
          <FileManager />
        </div>
      </div>
    </div>
  )
}
