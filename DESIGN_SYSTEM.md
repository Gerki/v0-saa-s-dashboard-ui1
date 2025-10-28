## Design System

This living document catalogs the current Tailwind CSS setup, design tokens, reusable UI components, usage samples, and screenshot placeholders for this codebase.

### Tailwind setup
- **Version**: Tailwind CSS v4 with PostCSS integration
- **PostCSS**: `postcss.config.mjs` uses `@tailwindcss/postcss`
- **Global CSS entry**: `app/globals.css` imports Tailwind and `tw-animate-css`
- **Dark mode**: Uses a custom variant with `.dark` class on an ancestor

```1:3:app/globals.css
@import "tailwindcss";
@import "tw-animate-css";
```

```118:126:app/globals.css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

Notes
- No `tailwind.config.*` file is present (configless v4). Theme tokens are mapped via `@theme inline` in `app/globals.css`.
- A second stylesheet exists at `styles/globals.css` with a similar token map, but the app imports `app/globals.css`. Consider removing or merging if redundant.

### Design tokens
Tokens are defined as CSS variables and surfaced to Tailwind via `@theme inline`.

- **Core colors**: `background`, `foreground`, `card`, `card-foreground`, `popover`, `popover-foreground`, `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `muted`, `muted-foreground`, `accent`, `accent-foreground`, `destructive`, `destructive-foreground`, `border`, `input`, `ring`
- **Charts**: `chart-1` … `chart-5`
- **Sidebar**: `sidebar`, `sidebar-foreground`, `sidebar-primary`, `sidebar-primary-foreground`, `sidebar-accent`, `sidebar-accent-foreground`, `sidebar-border`, `sidebar-ring`
- **Typography**: `--font-sans`, `--font-mono` bound to Geist fonts
- **Radius**: `--radius` with derived `radius-sm|md|lg|xl`

Usage examples

```tsx
// Background + text
<div className="bg-background text-foreground p-6 rounded-xl">Hello</div>

// Buttons using tokens
<button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm">
  Primary Action
 </button>

// Border and ring tokens
<input className="border border-border focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-md px-3 h-9 bg-transparent" />
```

### Utilities and patterns
- **Layout**: `flex`, `grid`, `gap-*`, `items-*`, `justify-*`, `min-h-*`, `overflow-*`, responsive grids like `grid-cols-1 md:grid-cols-2`
- **Spacing/shape**: `p-*`, `px-*`, `py-*`, `rounded-*`, `shadow-*`, `border`, `border-border`
- **Typography**: `text-*`, `font-*`, `leading-none`, `whitespace-nowrap`
- **State variants**: `focus-visible:*`, `aria-invalid:*`, `disabled:*`, `peer-disabled:*`, `group-data-[disabled=true]:*`
- **Data attributes**: `data-[state=*]`, `data-[variant=*]`, `data-[size=*]`, `data-[inset]`
- **Structural selectors**: `has-[>svg]:*`, attribute scoping like `[&_svg]`, `[a&]`
- **Animations**: `animate-in/out`, `fade-*`, `zoom-*`, `slide-*` via `tw-animate-css` and data-state classes

### Helper
- **Class merging**: `cn(...classes)` from `lib/utils.ts` combines `clsx` and `tailwind-merge` to dedupe conflicting utilities

```1:6:lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Components

Below are the reusable primitives under `components/ui`. Each includes a minimal example.

### Button (`components/ui/button.tsx`)
Variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link` | Sizes: `default`, `sm`, `lg`, `icon`

```7:16:components/ui/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
```

Usage

```tsx
import { Button } from "@/components/ui/button"

export function ButtonExamples() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="link" asChild>
        <a href="#">Link</a>
      </Button>
      <Button size="icon" aria-label="More">⋯</Button>
    </div>
  )
}
```

### Badge (`components/ui/badge.tsx`)
Variants: `default`, `secondary`, `destructive`, `outline`

```tsx
import { Badge } from "@/components/ui/badge"

export function BadgeExamples() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Error</Badge>
    </div>
  )
}
```

### Card (`components/ui/card.tsx`)
Parts: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`

```tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

export function CardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Short description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Body content goes here.</p>
      </CardContent>
      <CardFooter>
        <button className="text-sm text-muted-foreground">Secondary action</button>
      </CardFooter>
    </Card>
  )
}
```

### Input (`components/ui/input.tsx`) and Textarea (`components/ui/textarea.tsx`)

```tsx
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function Fields() {
  return (
    <div className="space-y-3">
      <Input placeholder="Type here" />
      <Textarea placeholder="Write more…" />
    </div>
  )
}
```

### Checkbox (`components/ui/checkbox.tsx`) and Label (`components/ui/label.tsx`)

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function CheckboxField() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="agree" />
      <Label htmlFor="agree">I agree to the terms</Label>
    </div>
  )
}
```

### Tabs (`components/ui/tabs.tsx`)
Parts: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export function TabsExample() {
  return (
    <Tabs defaultValue="a" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="a">Tab A</TabsTrigger>
        <TabsTrigger value="b">Tab B</TabsTrigger>
      </TabsList>
      <TabsContent value="a" className="p-4 border rounded-md mt-2">Content A</TabsContent>
      <TabsContent value="b" className="p-4 border rounded-md mt-2">Content B</TabsContent>
    </Tabs>
  )
}
```

### Select (`components/ui/select.tsx`)
Parts: `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectLabel`, `SelectSeparator`, `SelectValue`, `SelectGroup`, scroll buttons

```tsx
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

export function SelectExample() {
  return (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Pick one" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
        <SelectItem value="b">Option B</SelectItem>
      </SelectContent>
    </Select>
  )
}
```

### Dropdown Menu (`components/ui/dropdown-menu.tsx`)
Parts: `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `CheckboxItem`, `RadioGroup`, `Sub*`

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export function DropdownExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border rounded-md px-3 py-2">Open</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## Screenshots

Add screenshots under `docs/screenshots/` and link them here. Suggested structure:

- `docs/screenshots/components/button-default.png`
- `docs/screenshots/components/badge-variants.png`
- `docs/screenshots/components/card-example.png`
- `docs/screenshots/components/tabs-example.png`
- `docs/screenshots/components/select-example.png`
- `docs/screenshots/components/dropdown-example.png`

Capture tips
- Use a neutral sample page with `bg-background` and adequate padding.
- Prefer consistent width (e.g., 1200px) and light/dark pairs if relevant.
- Name files with component and variant for quick lookup.

## Contribution guidelines

- Keep this document in sync with edits to `components/ui/*` and `app/globals.css`.
- When adding a component:
  - Follow tokenized colors (`bg-*`, `text-*`, `border-*`) and focus states (`focus-visible:*`).
  - Prefer `data-*` variants for stateful styling over custom classes.
  - Use `cn` for class merging; avoid duplicate/conflicting utilities.
- When changing tokens:
  - Update `@theme inline` mappings and verify contrast in both light and dark.
  - Search usages of impacted tokens and smoke test key pages.

## Changelog

Document noteworthy design changes here with a short summary and PR link.

- YYYY-MM-DD: Initial export of design system covering tokens and UI primitives.

