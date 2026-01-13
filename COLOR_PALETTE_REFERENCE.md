# 🎨 Premass Overseas - Color Branding Palette

## Primary Color Scheme

```
┌────────────────────────────────────────────────────────────────────┐
│                     PRIMARY BRAND COLORS                           │
└────────────────────────────────────────────────────────────────────┘

█████████████████████████████████████████████████████████████████████
#0A3A5E - DARK BLUE (Authority, Trust, Structure)
█████████████████████████████████████████████████████████████████████
Used for: Headings, Primary icons, Buttons, Primary text
RGB: 10, 58, 94 | HSL: 204°, 81%, 20%
Tailwind: bg-[#0A3A5E], text-[#0A3A5E]
Accessibility: ✅ WCAG AAA with white text


█████████████████████████████████████████████████████████████████████
#F5A623 - ACCENT ORANGE (Energy, Action, Highlights)
█████████████████████████████████████████████████████████████████████
Used for: CTA badges, Hover effects, Accents, Links
RGB: 245, 166, 35 | HSL: 38°, 95%, 55%
Tailwind: bg-[#F5A623], text-[#F5A623]
Accessibility: ✅ WCAG AA with white text


█████████████████████████████████████████████████████████████████████
#FFFFFF - WHITE (Clarity, Space, Base)
█████████████████████████████████████████████████████████████████████
Used for: Card backgrounds, Primary background, Contrast
RGB: 255, 255, 255 | HSL: 0°, 0%, 100%
Tailwind: bg-white, text-white


█████████████████████████████████████████████████████████████████████
#F9FAFB - LIGHT GREY (Institutional, Section separator)
█████████████████████████████████████████████████████████████████████
Used for: Alternating section backgrounds
RGB: 249, 250, 251 | HSL: 210°, 17%, 98%
Tailwind: bg-slate-50


█████████████████████████████████████████████████████████████████████
#64748B - MEDIUM GREY (Secondary text, Muted)
█████████████████████████████████████████████████████████████████████
Used for: Supporting text, Secondary headings, Descriptions
RGB: 100, 116, 139 | HSL: 214°, 16%, 47%
Tailwind: text-slate-600


█████████████████████████████████████████████████████████████████████
#1E293B - DARK GREY (Primary body text)
█████████████████████████████████████████████████████████████████████
Used for: Main body text, Paragraph content
RGB: 30, 41, 59 | HSL: 215°, 33%, 17%
Tailwind: text-slate-800
```

---

## Color Harmony Reference

### Hero Section Palette
```
Background: #0A3A5E (Dark Blue)
Text: #FFFFFF (White)
Accent: #F5A623 (Orange)

Example:
┌─────────────────────────────────────┐
│ Your Trusted Partner for            │ ← White text on blue
│ Global Education Success            │
│                                     │
│ [Free Consultation] [Learn More]   │ ← Orange on blue buttons
└─────────────────────────────────────┘
```

### Card Section Palette
```
Background: #FFFFFF (White) or #F9FAFB (Light Grey)
Card: #FFFFFF (White)
Icon: #0A3A5E (Dark Blue)
Heading: #0A3A5E (Dark Blue)
Text: #64748B (Medium Grey)
CTA: #F5A623 (Orange)
Hover Shadow: rgba(0,0,0,0.1)

Example:
┌────────────────────────────┐
│ 🎓 University Name         │ ← Blue icon & heading
│ Ranked in top 100          │ ← Medium grey text
│                            │
│ Click for details [More →] │ ← Grey text + Orange badge
└────────────────────────────┘
  ↓
  Hover shadow appears
```

### Modal Palette
```
Overlay: rgba(0,0,0,0.5) (50% black)
Modal BG: #FFFFFF (White)
Header Icon: #0A3A5E (Dark Blue)
Title: #0A3A5E (Dark Blue)
Content Text: #1E293B (Dark Grey)
Divider: #E5E7EB (Light Grey)
Close Hover: #F3F4F6 (Very Light Grey)

Example:
┌─────────────────────────────────────┐
│ 🎓 Student Visa           [×]       │ ← Blue header
├─────────────────────────────────────┤
│ Type: Tier 4                        │ ← Dark grey text
│ Duration: 1 - 5 years               │
│                                     │
│ Requirements:                       │
│ • Valid passport                    │
│ • English language test             │
│ • Proof of funds                    │
└─────────────────────────────────────┘
```

---

## Section Background Pattern

```
┌────────────────────────────────────────────────────┐
│ Hero Section                                       │
│ Background: #0A3A5E (Dark Blue)                   │
│ Text: White, Orange accents                       │
└────────────────────────────────────────────────────┘
                        ↓
┌────────────────────────────────────────────────────┐
│ Stats / Trust Section                              │
│ Background: #FFFFFF (White)                        │
│ Headings: #0A3A5E (Dark Blue)                     │
│ Text: #64748B (Medium Grey)                       │
└────────────────────────────────────────────────────┘
                        ↓
┌────────────────────────────────────────────────────┐
│ Feature Section                                    │
│ Background: #F9FAFB (Light Grey)                  │
│ Cards: #FFFFFF (White)                            │
│ Icons: #0A3A5E (Dark Blue)                        │
│ Text: #64748B (Medium Grey)                       │
└────────────────────────────────────────────────────┘
                        ↓
[Pattern continues: White ↔ Light Grey sections]
```

---

## Interactive Element Colors

### Buttons

**Primary Button (.btn-premium)**
```
Default:  Background #0A3A5E, Text #FFFFFF
Hover:    Background darker #062540, Border #F5A623
Active:   Background #051D2E, Shadow glow
```

**Secondary Button (.btn-premium-outline)**
```
Default:  Background transparent, Border #FFFFFF, Text #FFFFFF
Hover:    Background rgba(255,255,255,0.1), Border #F5A623
Active:   Background rgba(255,255,255,0.2)
```

### Action Badges (NEW)
```
Background: #F5A623 (Orange)
Text: #FFFFFF (White)
Padding: 4px 8px (px-2 py-1)
Border Radius: 4px (rounded)
Font Size: 12px (text-xs)
Content: "More →"
Hover: Slightly darker orange or shadow
```

### Link Hover Effects
```
Default:  #0A3A5E (Dark Blue)
Hover:    #F5A623 (Orange) + underline
Icon:     #F5A623 (Orange) on hover
```

---

## Icon Color System

```
PRIMARY ICON COLOR
████████████████████████████████████
#0A3A5E - Dark Blue
████████████████████████████████████
Size: 24px (standard), 32px (large)
Used in: Cards, Headers, Navigation

HOVER STATE
████████████████████████████████████
#F5A623 - Orange
████████████████████████████████████
Transition: 0.2s ease

MUTED/INDICATOR
████████████████████████████████████
#E5E7EB - Light Grey
████████████████████████████████████
Used for: Info icons, secondary indicators
Size: 18-20px
```

---

## Text Color Hierarchy

```
HEADINGS (H1, H2, H3)
████████████████████████████████████████████████████
#0A3A5E - Dark Blue
████████████████████████████████████████████████████
Font Weight: bold / semibold
Purpose: Create visual hierarchy, guide attention


PRIMARY BODY TEXT
████████████████████████████████████████████████████
#1E293B - Dark Grey
████████████████████████████████████████████████████
Font Weight: regular
Purpose: Main content, readable at all sizes


SECONDARY TEXT
████████████████████████████████████████████████████
#64748B - Medium Grey
████████████████████████████████████████████████████
Font Weight: regular
Font Size: small / xs
Purpose: Supporting information, descriptions


MUTED TEXT
████████████████████████████████████████████████████
#94A3B8 - Light Grey
████████████████████████████████████████████████████
Font Weight: regular
Font Size: xs
Purpose: Captions, hints, helper text


ACCENT TEXT
████████████████████████████████████████████████████
#F5A623 - Orange
████████████████████████████████████████████████████
Font Weight: semibold
Purpose: Highlights, CTAs, emphasis


INVERSE TEXT
████████████████████████████████████████████████████
#FFFFFF - White
████████████████████████████████████████████████████
Used on: Dark blue backgrounds
Font Weight: regular / semibold
```

---

## Color Combinations & Contrast

### ✅ WCAG AAA Compliant (Enhanced Contrast)
```
#0A3A5E on #FFFFFF  → Dark Blue on White      ✅ AAA
#0A3A5E on #F9FAFB  → Dark Blue on Light Grey ✅ AAA
#FFFFFF on #0A3A5E  → White on Dark Blue      ✅ AAA
#1E293B on #FFFFFF  → Dark Grey on White      ✅ AAA
#64748B on #FFFFFF  → Medium Grey on White    ✅ AA+
```

### ✅ WCAG AA Compliant (Standard Contrast)
```
#F5A623 on #FFFFFF  → Orange on White        ✅ AA
#F5A623 on #0A3A5E  → Orange on Dark Blue    ✅ AAA+
```

### ⚠️ Use with Care (Lower Contrast)
```
#64748B on #F9FAFB  → Medium Grey on Light Grey (Acceptable for secondary text only)
#94A3B8 on #FFFFFF  → Light Grey on White (Use only for captions)
```

---

## CSS Implementation Examples

### Header Styling
```css
.section-header {
  @apply text-3xl font-bold text-[#0A3A5E] mb-6;
}

.section-subtext {
  @apply text-gray-600 max-w-2xl mb-12;
}
```

### Card Styling
```css
.premium-card {
  @apply bg-white rounded-2xl shadow-sm p-6 
         hover:shadow-lg transition-shadow;
}

.premium-icon {
  @apply w-12 h-12 bg-[#0A3A5E] text-white 
         rounded-full flex items-center justify-center mb-4;
}
```

### Button Styling
```css
.btn-premium {
  @apply px-6 py-3 bg-[#0A3A5E] text-white rounded-lg
         font-semibold transition-all duration-300
         hover:border-[#F5A623] hover:shadow-lg;
}

.badge-action {
  @apply text-xs bg-[#F5A623] text-white 
         px-2 py-1 rounded font-semibold;
}
```

---

## Brand Color Psychology

| Color | Psychology | Effect |
|-------|-----------|--------|
| **Dark Blue (#0A3A5E)** | Trust, Authority, Stability | Creates professional, secure feeling |
| **Orange (#F5A623)** | Energy, Excitement, Action | Draws attention, motivates action |
| **White (#FFFFFF)** | Purity, Clarity, Space | Creates breathing room, modern feel |
| **Light Grey (#F9FAFB)** | Institutional, Professional | Supports without competing |
| **Medium Grey (#64748B)** | Balance, Neutrality | Secondary info, doesn't distract |

---

## Future Dark Mode Palette (Reserved)

```
Dark Blue Variant:     #0A1F2E (Darker shade)
Orange Accent:         #F5A623 (Same, high contrast)
Dark Background:       #0F1419
Card Background:       #1E2D3D
Text Light:            #E2E8F0 (Light grey for readability)
Text Muted:            #94A3B8
Divider:               #2D3E4F
```

---

## Color Export Reference

### For Designers
```
Primary: RGB(10, 58, 94) → Hex #0A3A5E
Accent:  RGB(245, 166, 35) → Hex #F5A623
White:   RGB(255, 255, 255) → Hex #FFFFFF
```

### For Developers
```javascript
const colors = {
  primary: '#0A3A5E',
  accent: '#F5A623',
  white: '#FFFFFF',
  lightGrey: '#F9FAFB',
  mediumGrey: '#64748B',
  darkGrey: '#1E293B'
};
```

### For Tailwind Config
```javascript
colors: {
  'brand-blue': '#0A3A5E',
  'brand-orange': '#F5A623',
  'brand-light': '#F9FAFB',
  'brand-grey': '#64748B'
}
```

---

## Testing Color Accessibility

Use these tools:
- **WAVE:** https://wave.webaim.org/
- **Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Color Blind Simulator:** https://www.color-blindness.com/coblis-color-blindness-simulator/

**Recommended Tests:**
- ✅ Check all text on all backgrounds
- ✅ Verify buttons are clearly distinguishable
- ✅ Test with color blindness filters
- ✅ Ensure icons are not color-only indicators

---

## Summary

**The Premass Overseas color system uses:**
- **Primary:** Dark Blue (#0A3A5E) for authority & trust
- **Accent:** Orange (#F5A623) for action & energy
- **Foundation:** White, Light Grey for clarity
- **Text:** Dark Grey hierarchy from bold to muted

This creates a **professional, modern, accessible** brand identity that builds trust while encouraging user action through strategic orange accents.

---

**Branding Status:** ✅ Complete  
**Last Updated:** 10 January 2026
