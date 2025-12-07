# PageHeader Component

A reusable, flexible page header component with gradient text, icons, and customizable styling.

## Features

- ✅ Gradient text effect
- ✅ Split-color text (first word colored, rest normal)
- ✅ Single or multiple icon support
- ✅ Subtitle and description support
- ✅ Custom children for additional content
- ✅ Fully responsive
- ✅ Theme-aware colors

## Usage Examples

### Basic Usage (Simple Title)

```tsx
import { PageHeader } from "@/components/PageHeader";

<PageHeader title="About" />
```

### With Icon

```tsx
import { PageHeader } from "@/components/PageHeader";
import { User } from "lucide-react";

<PageHeader 
  title="About" 
  icon={User}
/>
```

### With Multiple Icons (Design Page Style)

```tsx
import { PageHeader } from "@/components/PageHeader";
import { Palette, Figma, Layers } from "lucide-react";

<PageHeader
  title="Design Portfolio"
  icons={[Palette, Figma, Layers]}
  description="Where technical expertise meets creative vision."
  gradient={true}
  splitColor={true}
/>
```

### With Gradient Text

```tsx
<PageHeader
  title="Design Portfolio"
  gradient={true}
  description="Beautiful gradient text effect"
/>
```

### With Split Color (First Word Highlighted)

```tsx
<PageHeader
  title="Design Portfolio"  // "Design" will be theme-primary, "Portfolio" will be normal
  splitColor={true}
/>
```

### With Subtitle and Description

```tsx
<PageHeader
  subtitle="👋 Hi, I'm Hany El Saydawy"
  title="Senior Fullstack Engineer"
  description="I craft accessible, high-performance digital products turning complex problems into elegant, scalable solutions."
  gradient={true}
/>
```

### With Custom Children

```tsx
<PageHeader
  title="Projects"
  description="Explore my latest work"
>
  <div className="flex gap-4 mt-6">
    <Button>View All</Button>
    <Button variant="outline">Filter</Button>
  </div>
</PageHeader>
```

### Full Example (Home Page Style)

```tsx
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Download, Phone } from "lucide-react";

<PageHeader
  subtitle="👋 Hi, I'm Hany El Saydawy"
  title="Technical Lead & Fullstack Engineer"
  description="I craft accessible, high-performance digital products turning complex problems into elegant, scalable solutions."
  gradient={true}
>
  <p className="text-muted-foreground mb-6">
    Available for freelance, contract, and consulting work based in Berlin 🇩🇪
  </p>
  <div className="flex gap-4 justify-center">
    <Button>
      <Phone className="mr-2 h-4 w-4" />
      Contact Me
    </Button>
    <Button variant="outline">
      <Download className="mr-2 h-4 w-4" />
      Download Resume
    </Button>
  </div>
</PageHeader>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | Required | Main heading text |
| `subtitle` | `string` | Optional | Text above the title |
| `description` | `string` | Optional | Text below the title |
| `icon` | `LucideIcon` | Optional | Single icon to display above title |
| `icons` | `LucideIcon[]` | Optional | Multiple icons to display in a row |
| `gradient` | `boolean` | `true` | Apply gradient effect to title |
| `splitColor` | `boolean` | `false` | Color first word differently |
| `children` | `ReactNode` | Optional | Custom content below description |

## Styling Notes

- Icons are displayed at 48x48px with theme-primary color
- Title is responsive: 4xl on mobile, 5xl on tablet, 6xl on desktop
- Description has max-width of 3xl for readability
- All text is center-aligned
- Component has py-16 px-6 padding by default

## Color Modes

The component automatically adapts to your theme colors:
- `text-theme-primary`: Main brand color
- `text-green-accent`: Secondary accent color (for gradients)
- `text-foreground`: Normal text color
- `text-muted-foreground`: Subdued text color
