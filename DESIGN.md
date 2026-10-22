---
name: StudyBG
description: Free Bulgarian exam-prep academy for grades 5–12, dressed in the visual world of its sister site Матура Плюс.
colors:
  sapphire: "#1a6fb8"
  sapphire-dark: "#165c9a"
  sapphire-soft: "#f2f8fd"
  sapphire-tint: "#e3effa"
  sapphire-line: "#c6def4"
  sapphire-sky: "#2f88cf"
  brand-ink: "#0a4b82"
  emerald: "#1ea858"
  emerald-text: "#157a40"
  emerald-wordmark: "#136c3a"
  emerald-soft: "#edf9f2"
  emerald-line: "#82deaa"
  mysteries-amber: "#b45309"
  mysteries-amber-ink: "#92400e"
  mysteries-amber-soft: "#fffbeb"
  mysteries-amber-line: "#fef3c7"
  error-rose: "#e11d48"
  error-rose-soft: "#fff1f2"
  body-ink: "#09090b"
  slate-heading: "#0f172a"
  slate-strong: "#334155"
  slate-body: "#475569"
  slate-muted: "#64748b"
  slate-icon: "#94a3b8"
  slate-border: "#e2e8f0"
  slate-divider: "#f1f5f9"
  slate-wash: "#f8fafc"
  paper: "#ffffff"
typography:
  display:
    fontFamily: "Geist, 'Geist Fallback', system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  page-title:
    fontFamily: "Geist, 'Geist Fallback', system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Geist, 'Geist Fallback', system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.33
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Geist, 'Geist Fallback', system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.55
  body:
    fontFamily: "Geist, 'Geist Fallback', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
  body-lead:
    fontFamily: "Geist, 'Geist Fallback', system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  nav-item:
    fontFamily: "Geist, 'Geist Fallback', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.43
  label:
    fontFamily: "Geist, 'Geist Fallback', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.33
  nav-group:
    fontFamily: "Geist, 'Geist Fallback', system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.33
    letterSpacing: "0.05em"
  numeral:
    fontFamily: "Geist, 'Geist Fallback', system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
    fontFeature: "'tnum'"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "6px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  2xl: "24px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.sapphire}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.sapphire-dark}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.slate-strong}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.slate-wash}"
  button-success:
    backgroundColor: "{colors.emerald-wordmark}"
    textColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "10px 16px"
  button-mysteries:
    backgroundColor: "{colors.mysteries-amber}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
    height: "44px"
  chip-quick:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.slate-strong}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  chip-filter-active:
    backgroundColor: "{colors.sapphire}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "4px 10px"
  badge-status:
    backgroundColor: "{colors.sapphire-soft}"
    textColor: "{colors.sapphire}"
    rounded: "{rounded.full}"
    padding: "6px 16px"
  input-search:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.slate-heading}"
    rounded: "{rounded.lg}"
    height: "48px"
  card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.xl}"
    padding: "24px"
  card-light-panel:
    backgroundColor: "{colors.sapphire-soft}"
    textColor: "{colors.slate-heading}"
    rounded: "{rounded.xl}"
    padding: "24px"
  sidebar:
    backgroundColor: "{colors.paper}"
    width: "256px"
  sidebar-item:
    textColor: "{colors.slate-strong}"
    typography: "{typography.nav-item}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  sidebar-item-hover:
    backgroundColor: "{colors.slate-divider}"
    textColor: "{colors.slate-heading}"
  sidebar-item-active:
    backgroundColor: "{colors.sapphire}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  topbar:
    backgroundColor: "{colors.paper}"
    height: "64px"
  nav-item-active:
    backgroundColor: "{colors.sapphire-soft}"
    textColor: "{colors.sapphire}"
    rounded: "{rounded.md}"
    padding: "6px 10px"
---

# Design System: StudyBG

## Overview

**Creative North Star: "The Calm Academy"**

StudyBG uses the visual world of its sister site Матура Плюс, a quiet, institutional academy. The surface is a white sheet with a faint sapphire light at the top. It carries two brand voices: a clear mid sapphire for action and emerald for success. The study screens wear the same app shell as Матура Плюс: a white sidebar, a slim blurred top bar, and one page heading per screen. The goal is to look like one family with Матура Плюс while keeping the StudyBG name and wordmark.

Density is high, because the site carries a whole national curriculum. The calm comes from discipline, not from empty space. Containers are white cards or pale sapphire panels with a slate or blue-100 hairline and a soft shadow. Each screen has one solid sapphire action; everything else is a white outlined button. Icons are Lucide line icons in slate or a brand color. There are no dark bands and no black surfaces. Text is always dark on a light ground, apart from three data canvases drawn for a dark ground.

The world ships light-only (`color-scheme: light`, `theme-color` white). Motion is limited to color transitions, a 4px arrow nudge on hover, a 0.98 press scale, a 1.05 logo scale and the 200ms sidebar drawer slide. All of it collapses under `prefers-reduced-motion`.

**Key Characteristics:**
- White ground with a radial sapphire glow at 6% opacity at the top of the page.
- Two brand colors: sapphire for actions, active states, links, highlights and focus, and emerald for correct answers, success and results.
- Brand Ink, the old deep blue, survives only in the logo and the "Study" half of the wordmark.
- Amber belongs to the "Мистерии" / "Обща култура" portal. Rose marks errors and wrong answers only.
- Geist variable (100–900, Cyrillic subsets), self-hosted, with a metric-matched Arial fallback.
- An app shell on study screens: a white 256px sidebar, a 64px top bar, a page header with an h1 and one sentence, and content directly on the page.
- Cards with 16px corners, slate-200 borders and soft low shadows. Buttons with 8px corners.
- Lucide line icons only. No emoji, no gradient text, no 3D bottom edges, no dark bands.

## Colors

A two-brand palette on white: a clear mid sapphire leads, emerald confirms, and slate does all the neutral work.

### Primary
- **Matura Sapphire** (the 600 step): Every primary action ("Пълен каталог", "Вход с Google" when signed out), the active sidebar item, active filter pills and active tool tabs, links, the highlighted phrase in the hero headline ("НВО 7, НВО 10 и ДЗИ 12"), the focus ring and the caret. Tailwind's blue, indigo, violet, purple, fuchsia, pink, cyan and sky scales all resolve to the same sapphire ramp (50 #f2f8fd through 950 #0a2a47), and component classes now use the `blue-*` names.
- **Sapphire Deep** (the 700 step): The hover state of every solid sapphire button and link. Both `sapphire-dark` and the legacy `sapphire-light` token resolve to it, so hover always goes one step darker. It is also the text color of selected text.
- **Sapphire Mist** / **Sapphire Tint** / **Sapphire Line** (the 50, 100 and 200 steps): Mist fills the light panels (at 60%), the active bottom-nav item, the hero status badge and the active site-nav pill. Tint draws the light-panel hairline and icon-tile borders. Line draws hover borders on chips and result rows.
- **Sapphire Sky** (the 500 step): The light end of the logo's book gradient and the tint of colored shadows (`shadow-blue-500/10`).
- **Brand Ink** (#0a4b82): The former primary, kept only for identity. It sets "Study" in the wordmark, "Матура" in the sidebar's Матура Плюс link, the academic cap of the logo and the dark end of the book gradient. It is never a button, a fill or an active state.

### Secondary
- **Matura Emerald** (the 500 step): Signal dots and graphic marks.
- **Emerald Ink** (#157a40, the 600 step): The text-safe emerald for check icons, success copy and correct-answer text. Tailwind's emerald, green and teal scales resolve to this ramp.
- **Wordmark Emerald** (the 700 step): The "BG" in the wordmark and "Плюс" in the Матура Плюс link. As a solid fill it marks results: "mastered" on flashcards, the answer-key tab, a full score in the simulator, the certificate button.
- **Emerald Line** (#82deaa, the 300 step): The border of a correct answer option.
- **Emerald Mist**: The ground of the compact Матура Плюс bridge strip and the correct-answer card.

### Tertiary
- **Mysteries Amber** (amber-700): The filled button and icon color of the "Обща култура & загадки" portal ("Отвори досиетата"), and the active state inside that portal. Tailwind's orange scale resolves to amber.
- **Mysteries Ink** (amber-800): Portal labels and tags, the "Мистерии" segment text on hover and when active.
- **Mysteries Parchment** / **Mysteries Line**: The portal card fill at 40% opacity and its hairline borders. The culture hero fades from amber at 5% to white.
- **Error Rose** (rose-600; rose-50 fill, rose-300 border): Wrong-answer options, the error-bank icon and its count pill (rose-50 / rose-700), and unsubscribe hover. It is never decorative.

### Neutral
- **Paper**: The body ground, the sidebar, the top bar and every card surface.
- **Body Ink** (#09090b): The base text color set on `body`. It is a text color only, never a surface.
- **Slate Heading** (slate-900): All headings, page titles and card titles.
- **Slate Strong** (slate-700): Idle sidebar items and secondary-button labels.
- **Slate Body** (slate-600) / **Slate Muted** (slate-500): Running copy, then captions, placeholders, breadcrumbs, sidebar group titles and meta lines.
- **Slate Icon** (slate-400): Resting icons inside chips and search, and the scrollbar thumb at 40% opacity.
- **Slate Border** (slate-200): The universal hairline for cards, buttons, chips, the sidebar edge and the top-bar bottom rule.
- **Slate Divider** (slate-100) / **Slate Wash** (slate-50): The sidebar item hover, dividers between sidebar groups, the segmented-control track, the current-lesson card in the sidebar, and secondary-button hover.

### Named Rules
**The Two Voices Rule.** Sapphire acts and emerald confirms. No third brand hue exists. The token remap sends every legacy blue/indigo/violet/purple/fuchsia/pink/cyan/sky class to sapphire, every emerald/green/teal class to emerald and every orange class to amber, so an inner screen cannot reintroduce a rainbow through Tailwind classes. Don't add new hue scales.

**The One Active Color Rule.** A selected item in any tool (sidebar entry, tab, filter pill, toggle) is solid sapphire with white text. Amber is the active color only inside the "Мистерии" portal. Emerald is never an active state; it means correct, success or result.

**The Ink Is Identity Rule.** Brand Ink (#0a4b82) belongs to the logo and wordmark. Interface color uses the sapphire ramp.

**The Portal Amber Rule.** Amber surfaces (tinted cards, filled buttons, tags) belong to the "Мистерии" / "Обща култура" portal. Elsewhere amber appears only as small state accents: the daily-streak flame chip, the "Пауза" state of the focus timer, the explanation note after a wrong answer, and the portal's own compass icon in the sidebar.

**The Rose Means Wrong Rule.** Rose marks a wrong choice, an error count or a destructive action. It never decorates.

**The No Black Rule.** No interface surface is black or near-black. The only dark grounds are the chart and map canvases in MathStemLab, HistoryGeoAtlasLab and CultureMysticMapView (slate-900 / slate-950), because their strokes are drawn for a dark ground. The mobile drawer scrim is slate-900 at 30%.

## Typography

**Display Font:** Geist (with 'Geist Fallback', a metric-adjusted Arial/Helvetica/Roboto, then system-ui)
**Body Font:** Geist
**Label/Mono Font:** Geist with `tabular-nums` for figures. Monospace is reserved for real code or data: DNA sequences, chemistry and math formulas (MathStemLab, the science tabs, MonFormulaSheetsModal).

**Character:** This is the same single neo-grotesk family as Матура Плюс. Hierarchy comes from weight (400 body, 600 labels and nav, 700 headings and buttons) and slightly tight tracking on large sizes. There is no second display face. The font is preloaded with `font-display: optional`, so it never swaps after first paint.

### Hierarchy
- **Display** (700, 30px → 48px → 60px at sm/lg, line-height 1.12, tracking -0.025em): The single hero h1 on the home page, balanced and centered, at max 56rem. One phrase inside it is set in sapphire.
- **Page Title** (700, 24px → 30px at sm, tight tracking, `text-balance`): The h1 of every study screen, followed by one sentence of slate-600 14px description at max 42rem. The title and sentence come from `studyNav`. On lesson screens the sentence is the subject · grade · exam line.
- **Headline** (700, 24px → 30–36px at sm, tracking -0.025em): Section h2s on the home page and the 20–24px headings in the SmartScan, Mysteries, bridge and newsletter cards.
- **Title** (700, 16–18px): Card and portal titles ("Влез в учебната академия", "Тренажор на живо") and trainer question text (600, 16px, snug).
- **Body** (400, 14px, line-height 1.625; lead 16–18px slate-600 at max 42rem): Card descriptions and the hero subtitle, using `text-pretty`.
- **Nav Item** (600, 14px): Sidebar items. The site header uses 13px/600.
- **Label** (600, 12px; meta lines at 11px): Buttons, chips, badges, filter pills and meta rows, in sentence case.
- **Nav Group** (700, 11px, uppercase, tracking 0.05em, slate-500): Sidebar group titles ("Избраният урок", "Изпити", "Лаборатории", "Справочници"). Uppercase tracked text is allowed only for navigation group titles and footer column headings. It never sits above a page or section heading.
- **Numeral** (700, 36px, tabular): The focus timer readout. Telemetry figures use 18px/700, also tabular.

### Named Rules
**The One Heading Block Rule.** A study screen has one heading block: the page header. Tools do not carry their own hero heading or a kicker above it.

**The One Highlight Rule.** A headline may carry one sapphire phrase as solid color. It never uses gradient text.

**The Counted Numbers Rule.** Every count (lessons, dossiers, questions, error-bank items) is set `tabular-nums` and comes from the data.

**The Mono Means Data Rule.** Monospace is set only on code-like content: sequences, formulas, equations. Figures, scores and timers use `tabular-nums` in Geist.

## Layout

There are two shells. Home ("/") and the "Мистерии" portal use the site shell: the site header and centered columns. The hero uses a max width of 64rem, with headline, subtitle and search narrowing to 56, 42 and 48rem. All other home sections use 80rem with 16 / 24 / 32px gutters at base, sm and lg, and stack with a 64px rhythm.

Study screens (any tab except "home") use the app shell, which mirrors Матура Плюс. A white sidebar sits on the left. From lg up it is sticky and 256px wide; below lg it is a 288px drawer opened from the top bar, over a 30% slate scrim, and it closes with Escape. The top bar is 64px high. The workspace has 16 / 24 / 40px side padding at base, sm and lg, 24–32px top padding, and centers its content at a max of 72rem. Below lg, a fixed 4-destination bottom bar ("Урок", "Тест", "Симулатор", "Програма") takes over, and the workspace reserves 112px of bottom padding for it.

The page header is a row: the title block on the left and, on lesson screens below lg only, the lesson actions ("Смени урока", "Сканирай") on the right. On desktop the sidebar owns these actions. Tool content sits directly on the white page with no outer card.

Inside cards, the gaps are 6–8px between chips, 12–20px between blocks and 20–24px of padding (28–40px on feature cards). On large screens the trainer and timer use a 12-column split (7 + 5). Portals and search results use two columns from md, and option buttons use two columns from sm. On mobile everything collapses to one column and button pairs stack full-width. Below the fold, home sections render deferred and use `content-visibility: auto`. Text is centered only in the hero.

## Elevation & Depth

Depth is ambient and low. Surfaces separate from the white ground through a hairline plus a 1–3px shadow. They never float high. Some shadows are tinted with Sapphire Sky at 10% to echo the top glow. The high shadows belong to overlays only: search results, the labs dropdown, and the open mobile sidebar drawer.

### Shadow Vocabulary
- **Hairline** (`box-shadow: 0 1px rgb(0 0 0 / 0.05)`): Icon tiles inside dropdowns and small inline chips.
- **Hairline lift** (`box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)`): The active sidebar item, segmented-control thumbs, badges, icon tiles and secondary buttons. This is the most common shadow in the build.
- **Resting card** (`box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`): Cards, light panels and solid buttons.
- **Sapphire resting** (`box-shadow: 0 1px 3px 0 rgb(47 136 207 / 0.1), 0 1px 2px -1px rgb(47 136 207 / 0.1)`): The hero search field and the hero demo panel.
- **Portal hover** (`box-shadow: 0 4px 6px -1px rgb(47 136 207 / 0.1), 0 2px 4px -2px rgb(47 136 207 / 0.1)`): Portal cards on hover. The Mysteries card uses the amber equivalent.
- **Overlay** (`box-shadow: 0 10px 15px -3px rgb(15 23 42 / 0.1), 0 4px 6px -4px rgb(15 23 42 / 0.1)`): The search results panel and nav dropdowns.
- **Drawer** (`box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`): The sidebar while it is open as a mobile drawer.

### Named Rules
**The Soft Edge Rule.** Depth is a soft blur under a hairline. There are no hard offset shadows and no thick bottom borders as a 3D edge.

**The Light Panel Rule.** The high-emphasis panel of a screen (the planner focus timer, the Матура Плюс bridge, lab intro panels and status panels) is a light panel: Sapphire Mist at 60% with a Sapphire Tint hairline and dark slate text. Emphasis comes from the tint and the content, never from a dark band.

## Shapes

Corners follow a strict ladder. Containers use 16px corners (cards, portals, light panels, feature tiles). Inner blocks use 12px (option buttons, result rows, icon tiles, telemetry tiles, inputs, the sidebar's current-lesson card, bottom-nav items). Buttons, sidebar items and filter pills use 8px. Segmented-control thumbs and count pills in the sidebar use 6px. Search chips, status badges and other count pills are fully round. Borders are 1px hairlines everywhere: slate-200 on white, blue-100/200 on sapphire tints, and amber-100/200 in the portal. Icon tiles are square-ish (32–48px) with the icon centered.

## Components

### Buttons
Solid, quiet and decisive. Each screen has one solid primary action; every other action is a secondary button.
- **Shape:** Gently rounded (8px).
- **Primary:** Sapphire fill, white 14px/700 label, 10px 20px padding, at least 44px high, Lucide icon at 16px with an 8px gap, resting card shadow.
- **Hover / Focus / Active:** Hover deepens to Sapphire Deep. Press scales to 0.98. Keyboard focus shows a 2px sapphire outline at a 2px offset (the global `:focus-visible` rule).
- **Secondary:** White fill, slate-200 hairline, slate-700 label with a slate-500 icon, slate-50 on hover. "Сканирай" in the top bar and "Смени урока" in the page header are secondary buttons.
- **Success:** Emerald-700 fill, white label, emerald-800 on hover. Used only for an outcome: "mastered", the answer key, a full score, the certificate.
- **Mysteries:** Amber-700 fill and white label, amber-800 on hover. Used only inside the portal.
- **Compact:** 12px/600 with 4px 10px padding, used for in-card actions ("Конспект", "Тест (n)", "Устен").

### Chips
- **Quick-search chips:** Fully round, white, slate-200 hairline, slate-700 12px/500, slate-400 icon. On hover the border turns Sapphire Line, the fill turns Sapphire Mist and the text turns sapphire.
- **Filter pills and tool tabs:** 8px corners and `aria-pressed`. Inactive pills are white with a hairline. The active pill is solid sapphire with white text.
- **Count pills:** A tint (Sapphire Tint, slate-100, rose-50 for errors, or amber-100) at 11–12px/600 tabular. On the active sidebar item the pill becomes white at 20% with white text.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** Paper. Light panels use Sapphire Mist at 60%. Portals use Sapphire Mist or Mysteries Parchment at 40%. The hero demo panel fades from white to slate-50.
- **Shadow Strategy:** Resting card. Hover goes to Portal hover (see Elevation & Depth).
- **Border:** 1px slate-200, or Sapphire Tint on light panels, or the portal's tint line.
- **Internal Padding:** 20–24px, or 28–40px for feature cards. Internal dividers are slate-100 hairlines.

### Inputs / Fields
- **Style:** White fill and slate-200 hairline. The hero search uses 12px corners, is 48px high, has a slate-400 leading search icon and a slate-500 placeholder, and embeds a primary button. Newsletter fields use slate-300 borders, 40px height and 12px corners.
- **Focus:** The border turns sapphire and a 2px sapphire ring appears at 15–20% opacity. The caret is sapphire.

### Brand Logo
`BrandLogo` is the one logo used in the sidebar, the site header and the footer. The mark is an open book stroked with a gradient from Brand Ink to Sapphire Sky, a golden compass star (amber-400 to amber-600 with a white center), and an academic cap in Brand Ink, not black. The wordmark is 19px/700 with tight tracking: "Study" in Brand Ink and "BG" in Wordmark Emerald. Under it runs a 2.5px rounded tricolour hairline in white (with a slate-300 edge), green #00966E and red #D62612. The flag colors live only in this hairline.

### App Sidebar (signature)
A white column with a slate-200 right border.
- **Logo row:** 64px high, with a slate-200 bottom rule. Below lg it also holds a 40px close button.
- **Groups:** Separated by a slate-100 rule and 16px of space. Each opens with a Nav Group title. Groups and labels come from `studyNav`, which also feeds the top-bar breadcrumb and the page header, so names always match.
- **Current lesson:** The first group, "Избраният урок", opens with a 12px-corner slate-50 card holding the subject · grade line (11px/600 slate-500), the lesson title (13px/700, two lines max) and a sapphire "Смени урока" text button. The tools listed under it act on that lesson.
- **Items:** 8px corners, 8px 12px padding, 14px/600, an 18px icon and a 12px gap. Idle items are slate-700 with a slate-500 icon and turn slate-100 on hover. The active item is solid sapphire with white text and icon and the hairline-lift shadow, marked `aria-current="page"`.
- **Footer:** A slate-200 rule above a 12px/600 link to Матура Плюс ("7. клас? МатураПлюс").

### Top Bar
In the app shell, the top bar is 64px high, sticky, white at 85% with a 12px backdrop blur and a slate-200 bottom hairline. On the left: a menu button and the logo below lg, or from lg a breadcrumb in 14px slate-500, "Учебна академия / {section}", with the section in slate-900/600. On the right: a search button with a "Ctrl K" key hint (10px, slate-50 key cap), "Сканирай" as a secondary button, the Академия/Мистерии segmented switch, and Google sign-in as the solid sapphire action. Once signed in, sign-in becomes a white outlined profile button. All of these are 12px/600 with 8px corners and 6px 10px padding.

### Segmented Switch
A slate-100 track with a slate-200 hairline, 8px corners and 2px padding. The selected segment is a white 6px-corner thumb with the hairline-lift shadow. "Академия" is set in sapphire when selected; "Мистерии" is set in Mysteries Ink when selected or hovered.

### Site Header
On home and in the "Мистерии" portal, the same blurred header carries the logo, 13px/600 slate-600 nav items with 14px icons (hover sapphire on slate-50; active sapphire on Sapphire Mist), a labs dropdown (a 16px panel with the Overlay shadow), and the same right-side actions.

### Mobile Bottom Nav
Fixed, white at 95% with blur and a slate-200 top hairline, respecting the safe-area inset. It shows four equal 48px-high targets with an 18px icon over a 12px label. The active target is Sapphire Mist with sapphire text and a heavier icon stroke; idle targets are slate-500.

### Answer Options (signature)
These are 12px-corner option buttons in a 2-up grid with "А) Б) В) Г)" prefixes in slate-500. At rest they are white and hover to Sapphire Mist. After answering, the correct option becomes Emerald Mist with an Emerald Line border and a check icon. A wrong pick becomes rose-50 with a rose-300 border and an X icon. Everything else greys to slate-500. An explanation card follows, in emerald for a correct answer or amber for a wrong one.

### Status Badge (signature)
This is the fully round Sapphire Mist badge above the hero headline, with a Sapphire Line border, a shield icon and real counts separated by bullets ("Програми на МОН 2026/2027 • N урока • 41 секретни досиета"). It is a data line, not a kicker.

## Do's and Don'ts

### Do:
- **Do** give each screen one solid sapphire (#1a6fb8) action with 8px corners, hovering to #165c9a and pressing at 0.98 scale. Make every other action white with a slate-200 border.
- **Do** mark the selected item in any tool as solid sapphire with white text. Inside the "Мистерии" portal, use amber.
- **Do** build containers as white 16px cards with a 1px slate-200 border and the resting soft shadow.
- **Do** make a high-emphasis panel a light panel (Sapphire Mist at 60%, Sapphire Tint hairline, dark text).
- **Do** let the page header (an h1 and one sentence, from `studyNav`) be the only heading block on a study screen, and set tool content directly on the page.
- **Do** add new study screens to `studyNav` so the sidebar, breadcrumb and page header stay in step.
- **Do** use Lucide line icons at 14–20px in slate-400/500, or in the brand color of their context.
- **Do** keep amber surfaces inside the "Мистерии" / "Обща култура" portal, emerald for correct, success or result, and rose for wrong or error states.
- **Do** set every count `tabular-nums` and source it from the data.

### Don't:
- **Don't** use black or near-black surfaces or dark gradient bands. Only data canvases drawn for a dark ground may be dark.
- **Don't** use Brand Ink (#0a4b82) for buttons, fills or active states. It belongs to the logo and wordmark.
- **Don't** use emerald as an active or selected state.
- **Don't** use emoji as icons or inside UI strings.
- **Don't** use gradient text. Highlight one headline phrase in solid sapphire instead.
- **Don't** add 3D bottom edges (thick `border-b-4` ledges) or hard offset shadows.
- **Don't** put kicker or eyebrow labels above headings, and don't give a tool its own hero heading under the page header.
- **Don't** set monospace on anything that is not code or data.
- **Don't** introduce per-subject colors or new hue scales. The remap to two brands is the system.
- **Don't** set UI text below 11px.

## Open

These are known gaps in the shipped build. They are not rules.

- The planner ("Моят план") still uses a row of countdown tiles. It is kept because the countdown is the screen's function.
- The summary view's inner panels still nest bordered rows inside bordered panels.
- Many 10–11px literal text sizes remain from the previous system. The site header's lab and tool dropdowns still set 9px tags, below the 11px floor.
- Uppercase tracked micro-headings and tags remain inside some tools and modals (for example CivicsEuLab and AuthProfileModal). They sit inside content rather than above page headings, and they wait for a later pass. AuthProfileModal also keeps a translucent blue-500/20 pill left over from the old dark band.
- There is no dark theme. The site is light-only (`color-scheme: light`). A dark theme is planned (PRODUCT.md, Accessibility & Inclusion).
- The certificate modal keeps its own print typography (Georgia/Roboto) because it renders a printable A4 document, not interface.
