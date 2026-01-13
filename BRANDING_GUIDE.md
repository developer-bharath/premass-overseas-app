# 🎨 Premass Overseas - Color Branding Guide

## Primary Color Palette

| Color Name | Hex Code | Usage | Tailwind Class |
|-----------|----------|-------|-----------------|
| **Primary Dark Blue** | `#0A3A5E` | Headlines, Primary Text, Icons, Primary Buttons | `bg-[#0A3A5E]`, `text-[#0A3A5E]` |
| **Accent Orange** | `#F5A623` | Highlights, Links, Hover Effects, Gradient Accents | `text-[#F5A623]`, `border-[#F5A623]` |
| **White** | `#FFFFFF` | Backgrounds, Text Contrast, Card Base | `bg-white`, `text-white` |
| **Light Grey** | `#F9FAFB` | Section Backgrounds, Hover States | `bg-slate-50` |
| **Medium Grey** | `#64748B` | Secondary Text, Muted Content | `text-slate-600`, `text-gray-600` |
| **Dark Grey** | `#1E293B` | Body Text, Primary Content | `text-slate-800` |

---

## Section-by-Section Branding

### 1. **Hero Section**
- **Background:** `#0A3A5E` (Dark Blue)
- **Primary Heading:** White text + `#F5A623` orange accent on key words
- **Subheading:** Light grey text (`text-gray-200`)
- **Button (CTA):** `btn-premium` class - `#0A3A5E` bg with white text, orange border on hover
- **Button (Secondary):** `btn-premium-outline` - white border, transparent bg, white text

**Example from Home:**
```jsx
<h1 className="text-white">Your Trusted Partner for <span className="text-[#F5A623]">Global Education</span></h1>
```

---

### 2. **Stats / Trust Section**
- **Background:** Pure white (`#FFFFFF`)
- **Heading:** `#0A3A5E` dark blue, large & bold
- **Subheading:** `#64748B` medium grey
- **Cards:** White with subtle shadow, icon circles in blue background

**Example:**
```jsx
<h2 className="text-3xl font-bold text-[#0A3A5E]">Trusted by Students Worldwide</h2>
<p className="text-gray-600">Supporting text here</p>
```

---

### 3. **Why Choose Us / Feature Cards Section**
- **Background:** `#F9FAFB` light grey (institutional feel)
- **Main Heading:** `#0A3A5E` dark blue, 3xl bold
- **Card Class:** `premium-card` - white bg with shadow, rounded corners
- **Card Heading:** `#0A3A5E` dark blue, semibold
- **Card Text:** `#64748B` medium grey
- **Icon Wrapper:** `premium-icon` class - blue circular background with white icons

**CSS Classes Used:**
```css
.premium-card {
  @apply bg-white rounded-2xl shadow-sm p-6 
         hover:shadow-lg transition-shadow;
}

.premium-icon {
  @apply w-12 h-12 bg-[#0A3A5E] text-white 
         rounded-full flex items-center justify-center mb-4;
}

.premium-heading {
  @apply text-3xl font-bold text-[#0A3A5E] mb-6;
}

.premium-subtext {
  @apply text-gray-600 max-w-2xl mb-12;
}
```

---

### 4. **Country Detail Pages (NEW)**
- **Background:** Alternating white & light grey
- **Hero Section:** `#0A3A5E` dark blue background, white text
- **Section Headings:** `#0A3A5E` dark blue, 3xl bold
- **Card Sections:** Uses `premium-card` class (white bg, hover shadow)
- **Card Icons:** `#0A3A5E` blue color, 24-32px sizing
- **Info Indicators:** Grey `Info` icons showing cards are clickable
- **Click Hint Text:** `text-gray-500` xs text saying "Click for more details" / "Click to see details"

**Cards Layout:**
```jsx
<div className="premium-card p-6 hover:shadow-lg transition-shadow cursor-pointer">
  <div className="flex items-start justify-between mb-4">
    <div className="flex items-center gap-3">
      <BadgeCheck size={24} className="text-[#0A3A5E]" />
      <h3 className="text-lg font-semibold text-[#0A3A5E]">Card Title</h3>
    </div>
    <Info size={20} className="text-gray-400" />
  </div>
  <p className="text-xs text-gray-500 mt-3">Click for more details</p>
</div>
```

---

### 5. **Modal / Popup Components**
- **Background Overlay:** Black with 50% opacity
- **Modal Card:** White background, rounded-2xl
- **Header:** Flexbox with icon + title + close button
- **Close Button:** Hover bg-gray-100
- **Content:** Dark grey text on white, clear hierarchy
- **Dividers:** Light grey subtle lines between sections

**Modal Structure:**
```jsx
<ModalOverlay onClose={() => setSelectedModal(null)}>
  <div className="bg-white rounded-2xl p-8 max-w-2xl">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <IconComponent size={32} className="text-[#0A3A5E]" />
        <h2 className="text-3xl font-bold text-[#0A3A5E]">Modal Title</h2>
      </div>
      <button onClick={() => setSelectedModal(null)} className="p-2 hover:bg-gray-100">
        <X size={24} />
      </button>
    </div>
    {/* Content */}
  </div>
</ModalOverlay>
```

---

### 6. **Buttons & CTAs**

#### Primary Button (`.btn-premium`)
- **Background:** `#0A3A5E` dark blue
- **Text:** White
- **Border:** `#F5A623` orange on hover
- **State:** Darker shade on active, smooth transition

#### Secondary Button (`.btn-premium-outline`)
- **Background:** Transparent
- **Border:** White
- **Text:** White
- **Hover:** Light fill or orange text

#### Link Text
- **Color:** `#0A3A5E` dark blue by default
- **Hover:** `#F5A623` orange with underline
- **Icon Indicator:** `text-[#F5A623]` for next/arrow icons

---

## Text Hierarchy

| Level | Size | Weight | Color | Usage |
|-------|------|--------|-------|-------|
| **H1** | 4xl-5xl | bold | `#0A3A5E` or white (hero) | Page titles, hero headlines |
| **H2** | 3xl | bold | `#0A3A5E` | Section titles |
| **H3** | lg-xl | semibold | `#0A3A5E` | Card titles, subsections |
| **Body** | base | regular | `#1E293B` | Main content |
| **Secondary** | sm-base | regular | `#64748B` | Supporting text, descriptions |
| **Caption** | xs-sm | regular | `#94A3B8` | Captions, helper text |

---

## Dark Mode (Future - Not Yet Implemented)

*Reserved for future dark mode implementation:*
- Dark Blue BG: `#0A1F2E` (darker #0A3A5E)
- Orange stays: `#F5A623` (high contrast)
- Text: `#E2E8F0` (light grey)
- Cards: `#1E2D3D` (dark card bg)

---

## Icon System

**Icon Library:** lucide-react v0.562.0

### Common Icons Used:
- **Education:** `GraduationCap`, `BookOpen`, `Award`
- **Work:** `Briefcase`, `TrendingUp`
- **Location:** `MapPin`, `Building2`, `Globe`
- **Documents:** `BadgeCheck` (Visa/Passport)
- **Timeline:** `Calendar`
- **UI Controls:** `Info`, `X` (close), `ChevronRight`

### Icon Sizing:
- Navigation: 24px
- Card headers: 24-28px
- Modal headers: 32px
- Service icons (home page): 28px

### Icon Colors:
- **Primary:** `text-[#0A3A5E]` (dark blue)
- **Secondary:** `text-gray-400` (subtle indicators)
- **Active/Hover:** `text-[#F5A623]` (orange)
- **White Inverse:** `text-white` (on dark backgrounds)

---

## Gradients & Special Effects

### Button Hover Gradient (Future Enhancement)
```css
background: linear-gradient(135deg, #0A3A5E, #0F5A8E);
```

### Accent Gradient (Living Costs Total)
```jsx
className="bg-gradient-to-r from-[#0A3A5E] to-[#F5A623] text-white"
```

### Box Shadow System
- **Subtle:** `shadow-sm` - light cards, default state
- **Hover:** `shadow-lg` - interactive elements on hover
- **Deep:** `shadow-xl` - modals, emphasis

---

## Accessibility Notes

✅ **Color Contrast:**
- Dark Blue + White: WCAG AAA compliant
- Orange + White: WCAG AA compliant
- Orange + Dark Blue: WCAG AAA compliant

✅ **Icon Usage:**
- Always pair icons with text labels
- Use `Info` icon to indicate clickable cards
- Info icons should be subtle (`text-gray-400`)

---

## Implementation Examples

### Current Usage in Home.tsx:
```jsx
// Hero
<section className="bg-[#0A3A5E] text-white">
  <h1>Your Trusted Partner for <span className="text-[#F5A623]">Global Education</span></h1>
</section>

// Feature Cards
<section className="bg-slate-50">
  <div className="premium-card">
    <div className="premium-icon"><GraduationCap /></div>
    <h3 className="text-[#0A3A5E]">Expert Counselling</h3>
  </div>
</section>
```

### Current Usage in CountryDetail.tsx:
```jsx
// Section
<section className="bg-white">
  <h2 className="text-[#0A3A5E]">Top Universities</h2>
  <div className="premium-card">
    <BadgeCheck className="text-[#0A3A5E]" />
    <Info className="text-gray-400" />
    <p className="text-xs text-gray-500">Click for more details</p>
  </div>
</section>
```

---

## Summary

**Primary Dark Blue (`#0A3A5E`)** = Trust, Authority, Structure  
**Accent Orange (`#F5A623`)** = Energy, Call-to-Action, Highlights  
**White + Light Grey** = Clean, Professional, Readable  
**Medium Grey (`#64748B`)** = Secondary Information, Soft Contrast

**Future Consistency Check Points:**
- ✅ All headings: `#0A3A5E`
- ✅ All CTA buttons: Primary blue + orange accent
- ✅ All interactive elements: Hover to orange
- ✅ All cards: `premium-card` class
- ✅ All icons: lucide-react with consistent sizing
- ✅ Section alternation: white ↔ light-grey
