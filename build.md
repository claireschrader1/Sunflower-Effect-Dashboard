# Build Specification: Sunflower Effect Command Centre

## Project Overview
The **Sunflower Effect Command Centre** is a high-performance, visually vibrant dashboard designed for **Claire Schrader**, a Dramatherapist. The application serves as a central hub for managing her creative practice, enquiries, and business operations.

## Visual Identity & Palette
The design follows a "Sunflower" theme, emphasizing warmth, growth, and clarity.
- **Hot Orange:** Primary accent and branding color.
- **Sunglow:** Secondary yellow accent.
- **Yellowish:** Soft background and border color.
- **Cream:** Main background color for the application.
- **Typography:** Bold, black-weight headings (Inter/Sans) with italicized serif-style subtext for a human touch.
- **Iconography:** Consistent use of the `Sun` icon for branding and the user profile.

## Core Layout Structure
1. **Sidebar (Left):**
   - Branding: "Sunflower Effect" with a Sun icon gradient.
   - Navigation: Top 5 priority sections.
   - Profile: "Claire Schrader Dramatherapist" with a Sun icon.
2. **Main Content (Right):**
   - Header: Personalized greeting ("Good morning, Claire") and a search bar.
   - Hero Section: "Daily Briefing" with a high-impact sunflower image and a call-to-action for the schedule.
   - Bento Grid: A responsive grid of 14+ management sections.
   - Insights: A "Weekly Growth" chart and a "Recent Enquiries" list.

## Section Priority & Order
The sections must appear in this specific order in the bento grid:
1. **Enquiry Management** (Icon: MessageSquare)
2. **Booking Management** (Icon: Calendar)
3. **Template Updates** (Icon: RefreshCw)
4. **Newsletter Updates** (Icon: Mail)
5. **Google Profile** (Icon: MapPin)
6. **Website Updates** (Icon: Globe)
7. **Impact Study Management** (Icon: BarChart3)
8. **Personal Tab** (Icon: User)
9. **Content Studio** (Icon: PenTool)
10. **Knowledge Base** (Icon: BookOpen)
11. **Invoices & Receipts** (Icon: FileText)
12. **YouTube Editing** (Icon: Youtube)
13. **Book Promotion** (Icon: TrendingUp)
14. **Publicity & PR** (Icon: Megaphone)

## Technical Requirements
- **Framework:** React (Vite).
- **Styling:** Tailwind CSS (Utility-first).
- **Icons:** `lucide-react`.
- **Animations:** `motion/react` (Framer Motion) for smooth transitions and hover effects.
- **Components:** Glassmorphism cards with `backdrop-blur` and large rounded corners (`rounded-[32px]` or `rounded-[40px]`).
- **Images:** High-quality photography from Unsplash or Picsum with `referrerPolicy="no-referrer"`.

## Key Design Details
- **Sunflower Gradient:** `bg-gradient-to-br from-hot-orange to-sunglow`.
- **Glass Cards:** Semi-transparent white backgrounds with subtle borders.
- **Interactive States:** Hover effects on cards (y-axis lift, icon rotation) and buttons.
