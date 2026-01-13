# 🎨 Premass Overseas - Quick Branding Reference

## Color Palette at a Glance

```
PRIMARY         ACCENT          BACKGROUNDS     TEXT
━━━━━━━━━━     ━━━━━━━━━━     ━━━━━━━━━━      ━━━━━━━━━━
#0A3A5E        #F5A623        #FFFFFF        #1E293B
Dark Blue      Orange         White          Dark Grey

#F9FAFB        #64748B        #94A3B8
Light Grey     Medium Grey    Light Grey
```

---

## Section Color Mapping

### Home Page
```
HERO:           Dark Blue bg, White text, Orange accent
STATS:          White bg, Dark Blue headings
WHY CHOOSE:     Light Grey bg, Dark Blue headings
```

### Country Detail Pages
```
HERO:           Dark Blue bg
UNIVERSITIES:   Light Grey bg, Blue cards with Dark Blue icons
COURSES:        White bg, White cards
INTAKES:        Light Grey bg, Centered cards with Calendar icons
VISA/WORK:      White bg, Blue cards with badges
COSTS/SCHOLAR:  Light Grey bg, Gradient highlight boxes
JOBS/CITIES:    White bg, Premium cards with badges
```

---

## Key Components

### Cards
```jsx
<div className="premium-card p-6 hover:shadow-lg transition-shadow cursor-pointer">
  <Icon className="text-[#0A3A5E]" size={24} />
  <h3 className="text-[#0A3A5E]">Title</h3>
  <p className="text-gray-600">Content</p>
  <span className="bg-[#F5A623] text-white px-2 py-1 rounded">More →</span>
</div>
```

### Headings
```jsx
<h2 className="text-3xl font-bold text-[#0A3A5E]">Section Title</h2>
<p className="text-gray-600 mb-8">Subheading</p>
```

### Buttons
```jsx
<button className="btn-premium">Primary Action</button>
<button className="btn-premium-outline">Secondary Action</button>
```

### Icons
```jsx
import { GraduationCap, BadgeCheck, Briefcase, Home, Award } from "lucide-react";
<Icon className="text-[#0A3A5E]" size={24} />
```

---

## Click Indicators

All clickable cards now show:
1. **Grey Info Icon** (top-right) - Indicates clickability
2. **Orange Badge** "More →" - Clear call-to-action
3. **Hover Shadow** - Visual feedback
4. **Cursor Pointer** - Mouse indicator

```jsx
<div className="mt-4 pt-4 border-t flex items-center justify-between">
  <p className="text-xs text-gray-500">Click to view details</p>
  <span className="text-xs bg-[#F5A623] text-white px-2 py-1 rounded">More →</span>
</div>
```

---

## Typography Scale

| Level | Tailwind | Usage |
|-------|----------|-------|
| H1 | `text-4xl md:text-5xl font-bold` | Hero titles |
| H2 | `text-3xl font-bold` | Section headings |
| H3 | `text-lg font-semibold` | Card titles |
| Body | `text-base` | Main content |
| Secondary | `text-sm text-gray-600` | Supporting text |
| Caption | `text-xs text-gray-500` | Hints, hints |

---

## Icon Set (lucide-react v0.562.0)

```javascript
GraduationCap      // Universities
BookOpen           // Courses
Calendar           // Intakes
BadgeCheck         // Visa
Briefcase          // Work
Home               // Living Costs
Award              // Scholarships
TrendingUp         // Job Market
MapPin             // Cities
Building2          // City Details
Info               // Clickable Indicator
X                  // Close Modal
ChevronRight       // Navigation (future)
```

**Sizing:**
- Navigation: 24px
- Card icons: 20-24px
- Large displays: 32px

---

## Hover Effects

```css
.premium-card {
  @apply hover:shadow-lg transition-shadow cursor-pointer;
}

.btn-premium:hover {
  border-color: #F5A623;
  box-shadow: 0 0 12px rgba(245, 166, 35, 0.3);
}

.icon-btn:hover {
  color: #F5A623;
  box-shadow: 0 0 16px rgba(245, 166, 35, 0.6);
}
```

---

## Section Backgrounds (Alternating)

```
Hero (Dark Blue) ↓
White Section ↓
Light Grey Section ↓
White Section ↓
Light Grey Section ↓
```

This creates visual rhythm and keeps content scannable.

---

## Modal Structure

```jsx
<ModalOverlay onClose={() => setSelectedModal(null)}>
  <div className="bg-white rounded-2xl p-8 max-w-2xl">
    
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <Icon className="text-[#0A3A5E]" size={32} />
        <h2 className="text-3xl font-bold text-[#0A3A5E]">Title</h2>
      </div>
      <button className="p-2 hover:bg-gray-100">
        <X size={24} />
      </button>
    </div>
    
    {/* Content */}
    <div className="space-y-4">
      {/* Sections with dividers */}
    </div>
    
  </div>
</ModalOverlay>
```

---

## Accessibility Quick Check

- ✅ Dark Blue + White = WCAG AAA
- ✅ Orange + White = WCAG AA
- ✅ All icons paired with text
- ✅ Proper heading hierarchy
- ✅ Sufficient color contrast
- ✅ Touch-friendly buttons (44px minimum)

---

## Implementation Checklist

When building new pages/components:

- [ ] Use `#0A3A5E` for headings
- [ ] Use `#F5A623` for accents/hovers
- [ ] Use `premium-card` for card styling
- [ ] Use `premium-heading` for section titles
- [ ] Add lucide-react icons (no emojis)
- [ ] Include click hints on interactive elements
- [ ] Alternate section backgrounds (white ↔ light grey)
- [ ] Test color contrast with WAVE
- [ ] Verify responsive design on mobile

---

## Brand Personality

| Brand Value | Color | Element |
|-------------|-------|---------|
| **Trust** | Dark Blue | Headings, Structure |
| **Energy** | Orange | Actions, Highlights |
| **Clarity** | White/Grey | Backgrounds, Text |
| **Premium** | Combined | Cards, Gradients, Icons |

---

## Examples in Production

### Home Page Hero
```jsx
<h1 className="text-white">
  Your Trusted Partner for 
  <span className="text-[#F5A623]">Global Education & Career Success</span>
</h1>
```

### Country Card
```jsx
<div className="premium-card">
  <BadgeCheck className="text-[#0A3A5E]" size={24} />
  <h3 className="text-[#0A3A5E]">Student Visa</h3>
  <span className="bg-[#F5A623] text-white">More →</span>
</div>
```

### Feature Section
```jsx
<section className="bg-slate-50">
  <h2 className="text-[#0A3A5E]">Why Choose Us</h2>
  <div className="premium-card">
    <div className="premium-icon"><Icon /></div>
    <h3 className="text-[#0A3A5E]">Feature</h3>
  </div>
</section>
```

---

## Need to Adjust Branding?

1. Update color in CSS files
2. Replace hex codes: `#0A3A5E` (Blue), `#F5A623` (Orange)
3. Test contrast ratios
4. Update this reference document
5. Communicate changes to team

---

**Status:** ✅ Fully Implemented & Documented  
**Last Updated:** 10 January 2026
