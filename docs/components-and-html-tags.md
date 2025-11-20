# Digital Asset Management SaaS - Components & HTML Tags Reference

## Project Overview
This document provides a comprehensive list of all frontend components, HTML tags, UI libraries, and icons used in the Digital Asset Management SaaS application.

---

## Custom React Components

### Core Application Components

#### 1. **DashboardClient** 
- **File**: `components/dashboard-client.tsx`
- **Purpose**: Main dashboard container with module routing and state management
- **Key Features**: 
  - Module navigation (Organizations, Personas, Files, Industries, etc.)
  - Centralized state management
  - Dynamic content rendering
- **HTML Tags**: `<div>`, `<main>`

#### 2. **Sidebar**
- **File**: `components/sidebar.tsx`
- **Purpose**: Collapsible navigation sidebar with user profile
- **Key Features**:
  - Expandable/collapsible menu items
  - User authentication display
  - Logout functionality
  - Active state indicators
- **HTML Tags**: `<div>`, `<button>`, `<span>`, `<nav>`

#### 3. **ThemeProvider**
- **File**: `components/theme-provider.tsx`
- **Purpose**: Theme management wrapper for dark/light mode
- **HTML Tags**: Wrapper component (no direct HTML)

---

### Business Module Components

#### 4. **OrganizationsModule**
- **File**: `components/modules/organizations.tsx`
- **Purpose**: Complete organization management system
- **Key Features**:
  - Create organizations with detailed information
  - Edit and delete organizations
  - Send email invitations to team members
  - Organization listing with search
- **HTML Tags**: `<div>`, `<form>`, `<input>`, `<textarea>`, `<button>`, `<select>`, `<label>`, `<h2>`, `<h3>`, `<p>`, `<span>`
- **API Integration**: 
  - POST `/api/organizations` - Create organization
  - GET `/api/organizations` - List organizations
  - PUT `/api/organizations/[id]` - Update organization
  - DELETE `/api/organizations/[id]` - Delete organization
  - POST `/api/organizations/[id]/invitations` - Send invitation

#### 5. **PersonasModule**
- **File**: `components/modules/personas.tsx`
- **Purpose**: Manage user personas with links and archiving
- **Key Features**:
  - Create personas with names and links
  - Archive/restore functionality
  - Persona listing
- **HTML Tags**: `<div>`, `<form>`, `<input>`, `<button>`, `<h2>`, `<h3>`, `<p>`, `<span>`

#### 6. **FilesModule**
- **File**: `components/modules/files.tsx`
- **Purpose**: Comprehensive file management with chat and authorization
- **Key Features**:
  - File creation and upload
  - Chat system for file discussions
  - Authorization workflow management
  - File status tracking
- **HTML Tags**: `<div>`, `<form>`, `<input>`, `<textarea>`, `<button>`, `<h2>`, `<h3>`, `<p>`, `<span>`

#### 7. **IndustriesModule**
- **File**: `components/modules/industries.tsx`
- **Purpose**: Manage industries with printing and installation processes
- **Key Features**:
  - Industry creation
  - Printing process management
  - Installation process tracking
- **HTML Tags**: `<div>`, `<form>`, `<input>`, `<button>`, `<h2>`, `<h3>`, `<p>`, `<span>`

#### 8. **InventoryModule**
- **File**: `components/modules/inventory.tsx`
- **Purpose**: Inventory management system
- **HTML Tags**: `<div>`, `<form>`, `<input>`, `<button>`, `<h2>`, `<p>`

#### 9. **MatchZoneModule**
- **File**: `components/modules/match-zone.tsx`
- **Purpose**: Match zone functionality
- **HTML Tags**: `<div>`, `<form>`, `<input>`, `<button>`, `<h2>`, `<p>`

#### 10. **ARModule**
- **File**: `components/modules/ar.tsx`
- **Purpose**: Augmented Reality features
- **HTML Tags**: `<div>`, `<h2>`, `<p>`

#### 11. **GPSModule**
- **File**: `components/modules/gps.tsx`
- **Purpose**: GPS location tracking
- **HTML Tags**: `<div>`, `<h2>`, `<p>`

#### 12. **EvidencesModule**
- **File**: `components/modules/evidences.tsx`
- **Purpose**: Evidence collection and management
- **HTML Tags**: `<div>`, `<form>`, `<input>`, `<button>`, `<h2>`, `<p>`

#### 13. **ReportsModule**
- **File**: `components/modules/reports.tsx`
- **Purpose**: Reporting and analytics
- **HTML Tags**: `<div>`, `<form>`, `<select>`, `<button>`, `<h2>`, `<p>`

---

### Utility Components

#### 14. **FileUpload**
- **File**: `components/file-upload.tsx`
- **Purpose**: Drag-and-drop file upload component
- **Key Features**:
  - Drag and drop interface
  - File type validation
  - Upload progress tracking
  - Multiple file support
- **HTML Tags**: `<div>`, `<input type="file">`, `<button>`, `<p>`, `<span>`
- **API Integration**: POST `/api/upload`

#### 15. **FileManager**
- **File**: `components/file-manager.tsx`
- **Purpose**: File listing and management interface
- **Key Features**:
  - File grid/list view
  - File preview
  - Download functionality
  - Delete files
- **HTML Tags**: `<div>`, `<button>`, `<img>`, `<p>`, `<span>`
- **API Integration**: 
  - GET `/api/files` - List files
  - DELETE `/api/files/[id]` - Delete file

#### 16. **Toaster**
- **File**: `components/ui/toaster.tsx`
- **Purpose**: Toast notification system
- **HTML Tags**: `<div>` (via shadcn/ui Toast component)

---

### Email Template Components

#### 17. **WelcomeEmail**
- **File**: `components/emails/welcome-email.tsx`
- **Purpose**: Welcome email template for new users
- **HTML Tags**: `<html>`, `<body>`, `<div>`, `<h1>`, `<p>`, `<a>`
- **Library**: @react-email/components

#### 18. **FileUploadNotification**
- **File**: `components/emails/file-upload-notification.tsx`
- **Purpose**: Email notification for file uploads
- **HTML Tags**: `<html>`, `<body>`, `<div>`, `<h1>`, `<p>`, `<a>`
- **Library**: @react-email/components

#### 19. **OrganizationInvitationEmail**
- **File**: `components/emails/organization-invitation-email.tsx`
- **Purpose**: Email invitation to join organization
- **HTML Tags**: `<html>`, `<body>`, `<div>`, `<h1>`, `<h2>`, `<p>`, `<a>`, `<ul>`, `<li>`
- **Library**: @react-email/components

---

### Authentication Pages

#### 20. **LoginPage**
- **File**: `app/auth/login/page.tsx`
- **Purpose**: User login interface
- **Key Features**:
  - Email/password authentication
  - Error handling
  - Redirect to dashboard on success
- **HTML Tags**: `<div>`, `<form>`, `<input>`, `<button>`, `<h1>`, `<p>`, `<a>`, `<label>`

#### 21. **SignUpPage**
- **File**: `app/auth/sign-up/page.tsx`
- **Purpose**: User registration interface
- **Key Features**:
  - Email/password registration
  - Email confirmation
  - Welcome email trigger
- **HTML Tags**: `<div>`, `<form>`, `<input>`, `<button>`, `<h1>`, `<p>`, `<a>`, `<label>`

#### 22. **SignUpSuccessPage**
- **File**: `app/auth/sign-up-success/page.tsx`
- **Purpose**: Registration confirmation page
- **HTML Tags**: `<div>`, `<h1>`, `<p>`, `<a>`

---

### Dashboard Pages

#### 23. **DashboardPage**
- **File**: `app/dashboard/page.tsx`
- **Purpose**: Main dashboard entry point (server component)
- **Key Features**:
  - Authentication check
  - User session management
  - Dashboard client wrapper
- **HTML Tags**: `<div>` (wrapper for DashboardClient)

#### 24. **FilesPage**
- **File**: `app/dashboard/files/page.tsx`
- **Purpose**: Dedicated files management page
- **Key Features**:
  - File upload interface
  - File manager integration
  - Email notifications on upload
- **HTML Tags**: `<div>`, `<h1>`, `<p>`

---

## HTML Tags Used in Project

### Structural Tags
- `<html>` - Root element (email templates)
- `<body>` - Body element (email templates)
- `<div>` - Container elements (most common throughout)
- `<main>` - Main content wrapper
- `<section>` - Content sections
- `<nav>` - Navigation container
- `<header>` - Header sections

### Text Content Tags
- `<h1>` - Primary headings
- `<h2>` - Secondary headings
- `<h3>` - Tertiary headings
- `<p>` - Paragraphs
- `<span>` - Inline text
- `<label>` - Form labels

### Form Tags
- `<form>` - Form containers
- `<input>` - Input fields (text, email, password, file, etc.)
- `<textarea>` - Multi-line text input
- `<button>` - Buttons
- `<select>` - Dropdown selects
- `<option>` - Select options (via shadcn/ui)

### Interactive Tags
- `<a>` - Links and anchors

### List Tags
- `<ul>` - Unordered lists (email templates)
- `<li>` - List items (email templates)

### Media Tags
- `<img>` - Images (file previews)

---

## shadcn/ui Components Library

The project uses shadcn/ui components extensively. These render as semantic HTML:

### Layout Components
- **Card** → `<div>` with styling
- **CardContent** → `<div>` with padding
- **CardHeader** → `<div>` with header styling
- **CardTitle** → `<h3>` with title styling
- **CardDescription** → `<p>` with muted styling
- **CardFooter** → `<div>` with footer styling

### Form Components
- **Button** → `<button>` with variants
- **Input** → `<input>` with styling
- **Label** → `<label>` with styling
- **Textarea** → `<textarea>` with styling
- **Select** → Custom select component
  - **SelectContent** → Dropdown container
  - **SelectItem** → Option items
  - **SelectTrigger** → Select button
  - **SelectValue** → Selected value display

### Navigation Components
- **Tabs** → Tab container
  - **TabsContent** → Tab panel content
  - **TabsList** → Tab button container
  - **TabsTrigger** → Individual tab button

### Feedback Components
- **Badge** → `<span>` with badge styling
- **Toast** → Notification component
- **Toaster** → Toast container

### Overlay Components
- **DropdownMenu** → Dropdown container
  - **DropdownMenuContent** → Menu content
  - **DropdownMenuItem** → Menu item
  - **DropdownMenuTrigger** → Menu trigger button
  - **DropdownMenuSeparator** → Menu divider

---

## Lucide React Icons

The project uses Lucide React for icons. All icons are SVG-based React components:

### Navigation & UI Icons
- **Menu** - Hamburger menu
- **Search** - Search functionality
- **ChevronDown** - Dropdown indicators
- **ChevronRight** - Expand indicators
- **MoreHorizontal** - More options menu
- **X** - Close/cancel actions

### Business Module Icons
- **Building2** - Organizations
- **Users** - Personas/team members
- **FileText** - Files and documents
- **Factory** - Industries
- **Package** - Inventory
- **Target** - Match Zone
- **Smartphone** - AR module
- **MapPin** - GPS locations
- **Camera** - Evidences
- **FileBarChart** - Reports

### Action Icons
- **Plus** - Add/create actions
- **Edit** - Edit actions
- **Trash2** - Delete actions
- **Send** - Send/submit actions
- **Upload** - File upload
- **Download** - File download
- **Check** - Confirm/success
- **Mail** - Email actions
- **LogOut** - Logout action
- **RotateCcw** - Restore/refresh
- **ExternalLink** - External links

### File Type Icons
- **File** - Generic file
- **ImageIcon** - Image files
- **Video** - Video files

### Process Icons
- **Printer** - Printing process
- **Wrench** - Installation process
- **MessageSquare** - Chat/messaging
- **Shield** - Authorization/security

---

## Third-Party Libraries

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI
- **Lucide React** - Icon library
- **class-variance-authority (cva)** - Component variant management
- **tailwind-merge** - Tailwind class merging utility

### Email
- **@react-email/components** - Email template components
- **@react-email/render** - Email rendering
- **Resend** - Email sending service

### Backend & Database
- **@supabase/ssr** - Supabase SSR utilities
- **@supabase/supabase-js** - Supabase client
- **@vercel/blob** - Vercel Blob storage

### React & Next.js
- **React 18** - UI library
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety

---

## API Routes

### Organizations
- `POST /api/organizations` - Create organization
- `GET /api/organizations` - List organizations
- `PUT /api/organizations/[id]` - Update organization
- `DELETE /api/organizations/[id]` - Delete organization
- `POST /api/organizations/[id]/invitations` - Send invitation

### Files
- `POST /api/upload` - Upload file to Vercel Blob
- `GET /api/files` - List files from database
- `POST /api/files` - Create file record
- `DELETE /api/files/[id]` - Delete file

### Email
- `POST /api/send-email` - Send email via Resend

---

## Database Schema (Supabase)

### Tables
1. **organizations** - Organization data
2. **organization_members** - Organization membership
3. **organization_invitations** - Pending invitations
4. **personas** - User personas
5. **files** - File metadata
6. **industries** - Industry data
7. **processes** - Process workflows
8. **chat_messages** - File chat messages
9. **authorization_workflows** - Authorization tracking
10. **inventory_items** - Inventory management
11. **gps_locations** - GPS tracking
12. **evidence_records** - Evidence collection

---

## Project Structure

\`\`\`
digital-asset-management/
├── app/
│   ├── api/
│   │   ├── files/
│   │   ├── organizations/
│   │   ├── send-email/
│   │   └── upload/
│   ├── auth/
│   │   ├── login/
│   │   ├── sign-up/
│   │   └── sign-up-success/
│   ├── dashboard/
│   │   ├── files/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── emails/
│   │   ├── file-upload-notification.tsx
│   │   ├── organization-invitation-email.tsx
│   │   └── welcome-email.tsx
│   ├── modules/
│   │   ├── ar.tsx
│   │   ├── evidences.tsx
│   │   ├── files.tsx
│   │   ├── gps.tsx
│   │   ├── industries.tsx
│   │   ├── inventory.tsx
│   │   ├── match-zone.tsx
│   │   ├── organizations.tsx
│   │   ├── personas.tsx
│   │   └── reports.tsx
│   ├── ui/
│   │   └── [shadcn components]
│   ├── dashboard-client.tsx
│   ├── file-manager.tsx
│   ├── file-upload.tsx
│   ├── sidebar.tsx
│   └── theme-provider.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── middleware.ts
│   │   └── server.ts
│   └── utils.ts
├── scripts/
│   ├── 001_create_core_tables.sql
│   ├── 002_enable_rls_policies.sql
│   └── 003_seed_sample_data.sql
└── middleware.ts
\`\`\`

---

## Design System

### Color Palette
- **Primary**: Blue tones for main actions
- **Secondary**: Slate/gray for backgrounds
- **Accent**: Emerald for success states
- **Destructive**: Red for delete actions
- **Muted**: Gray tones for secondary text

### Typography
- **Font Family**: Geist Sans (primary), Geist Mono (code)
- **Heading Sizes**: text-3xl, text-2xl, text-xl, text-lg
- **Body Text**: text-base, text-sm
- **Line Height**: leading-relaxed for readability

### Spacing
- Consistent use of Tailwind spacing scale (p-4, p-6, gap-4, etc.)
- Golden ratio proportions for layout

---

## Summary

This Digital Asset Management SaaS application is built with:
- **24 custom React components**
- **15+ HTML tags** used throughout
- **20+ shadcn/ui components**
- **30+ Lucide React icons**
- **Full authentication system** with Supabase
- **File management** with Vercel Blob
- **Email notifications** with Resend
- **Comprehensive database schema** with 12 tables
- **Modern design system** with Tailwind CSS

The application follows Next.js 14 App Router conventions, uses TypeScript for type safety, and implements proper authentication, authorization, and data persistence patterns.
