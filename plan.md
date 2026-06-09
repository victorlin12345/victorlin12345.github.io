# Project Specification: Luxury Watch Retail Web Prototype (Wristcheck Style)

## 1. Project Overview & Objective
- **Goal**: Create a high-end, premium web prototype for a luxury watch retail store.
- **Core Concept**: Move away from traditional e-commerce (No "Add to Cart" or flash sales). Position the store as a "Luxury Curator".
- **Conversion Goal (O2O)**: Convert online premium traffic into offline private boutique appointments ("Book a Private Viewing").
- **Design Reference**: Inspired by `https://wristcheck.com/` (Modern Dark Luxury, extreme minimalism, wide typography, high-contrast imagery, smooth micro-interactions).

---

## 2. Design System & Aesthetics (The "Wristcheck" DNA)

### 2.1 Color Palette
- **Primary Background**: Rich Pitch Black (`#0B0B0B`)
- **Secondary Background/Cards**: Deep Charcoal (`#161616`) or Soft Matte Black (`#1F1F1F`)
- **Primary Text**: Crisp White (`#FFFFFF`)
- **Secondary Text/Metadata**: Muted Silver/Gray (`#8E8E93`)
- **Accent Color (Use < 5% sparingly)**: Muted Champagne Gold (`#D4AF37`) or Clean Platinum White (`#F5F5F7`)
- **Borders/Dividers**: Ultra-thin dark gray (`#2C2C2E`)

### 2.2 Typography
- **Headings (H1, H2, H3)**: Sans-serif (e.g., `Inter`, `Montserrat`, or `Helvetica Neue`). 
  - *Rule*: Must use uppercase for main section headers with wide letter-spacing (`letter-spacing: 0.15em` or `tracking-widest`).
- **Body Text**: Clean, highly readable sans-serif (e.g., `Inter` or `System-ui`), normal weight, slightly increased line-height (`leading-relaxed`) for breathability.

### 2.3 Layout & Spacing
- **Whitespace**: Generous vertical padding (`py-24` to `py-32` in Tailwind) to create an "art gallery" or "editorial magazine" breathing room.
- **Grid**: Asymmetric or perfectly clean grids with thin dividers instead of heavy shadows.

### 2.4 Motion & Transitions (Crucial for "質感")
- All interactive elements (buttons, links, product cards) must have smooth transitions (`transition-all duration-500 ease-in-out`).
- No abrupt hover states. Use subtle opacity shifts or micro-translations.

---

## 3. Homepage Architecture & Layout

### Section 1: Hero Experience (Immersive Intro)
- **Layout**: Full-screen or 85vh viewport height.
- **Background**: A dark, slow-motion loop video or a high-contrast micro-shot of a watch movement/escapement wheel. Overlay a dark mask (`bg-black/40`) for text readability.
- **Content**: 
  - A tiny, wide-spaced category text: "CURATED TIMEPIECES"
  - A minimalist, elegant tagline (H1): "Curating the Extraordinary for the Discerning Collector."
  - **Single CTA Button**: A clean, transparent button with a thin white border (`border border-white text-white hover:bg-white hover:text-black`). Text: "EXPLORE THE COLLECTION".

### Section 2: Brand Curation (The Logo Wall)
- **Layout**: Clean horizontal layout.
- **Content**: Typography-only or minimalist gray-scaled monochrome logos of top brands (e.g., ROLEX, AUDEMARS PIGUET, PATEK PHILIPPE, OMEGA, RICHARD MILLE).
- **Aesthetic**: Low opacity (`opacity-40`), turning to `opacity-100` smoothly on hover.

### Section 3: Curated Themes (Editorial Collections)
- **Concept**: Do not show a messy list. Display 3-4 highly curated cards.
- **Layout**: 3-column clean grid.
- **Sample Themes**:
  1. *The Dress Watch Edit* (Featuring sleek, gold Patek/Lange)
  2. *Icons of Racing* (Featuring Cosmograph Daytona / Speedmaster)
  3. *Independent Horizon* (Featuring H. Moser & Cie / F.P. Journe)
- **Card Design**: Large vertical imagery, minimal text below (Title, short description in muted gray).

### Section 4: The Showcase (Product Grid with "Wristcheck" Hovers)
- **Layout**: 4-column grid displaying individual watches.
- **Product Card Requirements**:
  - **Background**: Solid `#161616`.
  - **Image**: High-quality watch front-facing shot on a perfectly clean background.
  - **Hover Interaction (Mandatory)**: On hover, the image smoothly transitions/fades into either a **Case-Back (Movement View)** or an **On-Wrist Lifestyle Shot**.
  - **Information (Below Image)**: 
    - Brand (Bold, Uppercase, Small)
    - Model Name & Reference Number
    - Condition / Year (e.g., "Unworn • 2026")
    - Price: Cleanly displayed (e.g., "NT$ 1,280,000" or "Inquire for Price"). **NO "SALE" OR RED TAGS.**

### Section 5: Trust, Craftsmanship & O2O Booking (The Closing Anchor)
- **Layout**: 2-column split. Left: High-end photo of a watchmaker in a clean studio using loupes. Right: Editorial text block.
- **Text Content**: 
  - Title: "AUTHENTICITY & EXPERTISE"
  - Body: "Every timepiece in our collection undergoes a rigorous multi-point inspection by our in-house master watchmakers. We don’t just sell watches; we preserve horological legacy."
- **Core O2O CTA Button**: A solid white button with black text (`bg-white text-black hover:bg-transparent hover:border-white hover:text-white`). Text: "BOOK A PRIVATE VIEWING".

---

## 4. Key Functional Components to Implement

### 4.1 "Request Private Viewing" Concierge Modal
- Clicking the booking CTA must trigger a sleek, minimalist modal overlay (`fixed inset-0 bg-black/80 backdrop-blur-md`).
- **Form Fields**:
  - Name (Input line, not a box, border-b only)
  - Contact Info (Email / Phone)
  - Timepiece of Interest (Dropdown or Pre-filled)
  - Preferred Beverage (Options: Espresso / Hand-drip Coffee / Sparkling Water / Single Malt)
- **Submit Button**: "REQUEST APPOINTMENT" -> Shows a smooth success animation: "Our Horological Advisor will contact you within 2 hours."

### 4.2 Navigation Bar (Sticky & Translucent)
- **Aesthetic**: Transparent background with heavy blur effect (`bg-black/10 backdrop-blur-md border-b border-white/5`).
- **Left**: Minimalist text-based logo (Modern serif or tracked-out sans-serif).
- **Center**: Links (COLLECTIONS, JOURNAL, ABOUT, DISCOVER). Hover effect: subtle bottom border or opacity shift.
- **Right**: "BOOK AN APPOINTMENT" CTA (Small, elegant button).

---

## 5. Technical Stack Suggestions (For AI Execution)
- **Framework**: React / Next.js (App Router) or raw HTML with Tailwind CSS.
- **Styling**: Tailwind CSS (Leverage `backdrop-blur`, `tracking-widest`, `duration-500`).
- **Icons**: Lucide React / Heroicons (Use ultra-thin variants if available).
- **Animations**: Framer Motion (for React) or standard CSS transitions.

## 6. Prompt to trigger the AI Builder:
"Act as a world-class front-end engineer specializing in luxury boutique websites. Based on the specifications provided above, build a responsive, single-page homepage prototype using Next.js/React and Tailwind CSS. Focus heavily on smooth hover states, perfect vertical alignments, generous whitespace, and the exact dark-luxury color scheme specified. Ensure all mock data for watches reads as high-end authentic pieces."