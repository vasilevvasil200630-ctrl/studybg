---
name: StudyBG
description: Free Bulgarian exam-prep academy for grades 5–12, dressed in the visual world of its sister site Матура Плюс.
colors:
  sapphire: "#0a4b82"
  sapphire-dark: "#083861"
  sapphire-light: "#0e5e9e"
  sapphire-soft: "#eef5fb"
  sapphire-tint: "#d8e8f6"
  sapphire-line: "#b5d5ef"
  sapphire-sky: "#2083c4"
  emerald: "#1ea858"
  emerald-text: "#157a40"
  emerald-wordmark: "#136c3a"
  emerald-soft: "#edf9f2"
  emerald-glow: "#82deaa"
  mysteries-amber: "#b45309"
  mysteries-amber-ink: "#92400e"
  mysteries-amber-soft: "#fffbeb"
  mysteries-amber-line: "#fef3c7"
  error-rose: "#e11d48"
  error-rose-soft: "#fff1f2"
  ink: "#09090b"
  slate-heading: "#0f172a"
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
  label:
    fontFamily: "Geist, 'Geist Fallback', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.33
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
    backgroundColor: "{colors.sapphire-light}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.slate-body}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.slate-wash}"
  button-on-sapphire:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.sapphire}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    height: "48px"
  button-mysteries:
    backgroundColor: "{colors.mysteries-amber}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
    height: "44px"
  chip-quick:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.slate-body}"
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
  card-sapphire-band:
    backgroundColor: "{colors.sapphire}"
    textColor: "{colors.paper}"
    rounded: "{rounded.xl}"
    padding: "24px"
  nav-item-active:
    backgroundColor: "{colors.sapphire-soft}"
    textColor: "{colors.sapphire}"
    rounded: "{rounded.md}"
    padding: "6px 10px"
---

# Design System: StudyBG

## Overview

**Creative North Star: "The Calm Academy"**

StudyBG uses the visual world of its sister site Матура Плюс, a quiet, institutional academy. The surface is a white sheet with a faint sapphire light at the top. It carries two brand voices: sapphire for action and emerald for success. The goal is to look like one family with Матура Плюс while keeping the StudyBG name and wordmark. This world replaced an earlier "tactile EdTech" system that used ten subject colors, 3D buttons and emoji. Leaving those behind is the point of the port.

Density is high, because the site carries a whole national curriculum. The calm comes from discipline, not from empty space. Every container is a white or lightly tinted card with a slate hairline and a soft shadow. Every action is a solid sapphire or white-outlined button. Every icon is a Lucide line icon in slate or a brand color. Hierarchy comes from Geist weight and size, the sapphire highlight inside a headline, and the contrast between the white ground and one deep sapphire band per section.

The world ships light-only (`color-scheme: light`). Motion is limited to color transitions, a 4px arrow nudge on hover, a 0.98 press scale, and a 1.05 logo scale. All of it collapses under `prefers-reduced-motion`.

**Key Characteristics:**
- White ground with a radial sapphire glow at 5% opacity at the top of the page.
- Two brand colors: sapphire for actions, links, highlights and focus, and emerald for success, streaks and the "BG" of the wordmark.
- Amber belongs to the "Мистерии" / "Обща култура" portal. Rose marks errors and wrong answers only.
- Geist variable (100–900, Cyrillic subsets), self-hosted, with a metric-matched Arial fallback.
- Cards with 16px corners, slate-200 borders and soft low shadows. Buttons with 8px corners.
- Lucide line icons only. No emoji, no gradient text, no 3D bottom edges.

## Colors

A two-brand palette on white: deep sapphire leads, emerald confirms, and slate does all the neutral work.

### Primary
- **Matura Sapphire** (#0a4b82): The color of every primary action ("Пълен каталог", "Сканирай тетрадка", "Вход с Google" when signed out), active nav items and filter pills, links and inline highlights. It is also the highlighted phrase in the hero headline ("НВО 7, НВО 10 и ДЗИ 12"), the "Study" half of the wordmark, the focus ring, the caret and `theme-color`. Tailwind's blue, indigo, violet, purple, fuchsia, pink and cyan 600 steps all resolve to this value.
- **Sapphire Night** (#083861): The deep end of the sapphire band gradient, the hover color for text links, and the text color of selected text.
- **Sapphire Lift** (#0e5e9e): The hover state of the solid sapphire button. Hover goes one step lighter, never darker.
- **Sapphire Mist** (#eef5fb) / **Sapphire Tint** (#d8e8f6) / **Sapphire Line** (#b5d5ef): The 50, 100 and 200 steps. They fill the hero status badge, the active nav pill, icon tiles and the academy portal card at 40% opacity, and they draw the hover borders on chips and result rows.

### Secondary
- **Matura Emerald** (#1ea858): The signal dot on the demo panel, the emerald 500 step, and graphic marks.
- **Emerald Ink** (#157a40): The text-safe emerald for check icons, success copy and the "Серия" streak chip text family. Tailwind's emerald, green and teal 600 steps resolve to this value.
- **Wordmark Emerald** (#136c3a): The "BG" in the StudyBG wordmark (the 700 step).
- **Emerald Glow** (#82deaa, the 300 step): Icons and arrows on the sapphire band, and "Плюс" in the Матура Плюс name on the bridge banner.
- **Emerald Mist** (#edf9f2): The ground of the compact Матура Плюс bridge strip and the correct-answer card (at the 50 step).

### Tertiary
- **Mysteries Amber** (#b45309, amber-700): The filled button and icon color of the "Обща култура & загадки" portal ("Отвори досиетата").
- **Mysteries Ink** (#92400e, amber-800): Portal labels and tags, and the "Секретни досиета & мистерии" result heading.
- **Mysteries Parchment** (#fffbeb) / **Mysteries Line** (#fef3c7): The portal card fill at 40% opacity and its hairline borders.
- **Error Rose** (#e11d48, rose-600; rose-50 #fff1f2 fill, rose-300 border): Wrong-answer options, the error-bank icon and unsubscribe hover. It is never decorative.

### Neutral
- **Paper** (#ffffff): The body ground and every card surface.
- **Ink** (#09090b): The base body text color set on `body`.
- **Slate Heading** (#0f172a, slate-900): All headings and card titles.
- **Slate Body** (#475569, slate-600) / **Slate Muted** (#64748b, slate-500): Running copy, then captions, placeholders and meta lines.
- **Slate Icon** (#94a3b8, slate-400): Resting icons inside chips and search, and the scrollbar thumb at 40% opacity.
- **Slate Border** (#e2e8f0, slate-200): The universal hairline for cards, buttons, chips and the header bottom rule.
- **Slate Divider** (#f1f5f9, slate-100) / **Slate Wash** (#f8fafc, slate-50): Internal dividers inside cards, secondary-button hover, and the bottom of the white-to-wash panel gradient.

### Named Rules
**The Two Voices Rule.** Sapphire acts and emerald confirms. No third brand hue exists. The token remap sends every legacy blue/indigo/violet/purple/fuchsia/pink/cyan class to sapphire and every emerald/green/teal class to emerald, so an inner screen cannot reintroduce a rainbow through Tailwind classes. Don't add new hue scales.

**The Portal Amber Rule.** Amber surfaces (tinted cards, filled buttons, tags) belong to the "Мистерии" / "Обща култура" portal. Elsewhere amber appears only as small state accents already in the build: the daily-streak flame chip, the "Пауза" state of the focus timer, and the explanation note after a wrong answer.

**The Rose Means Wrong Rule.** Rose marks a wrong choice, an error count or a destructive action. It never decorates.

## Typography

**Display Font:** Geist (with 'Geist Fallback', a metric-adjusted Arial/Helvetica/Roboto, then system-ui)
**Body Font:** Geist
**Label/Mono Font:** Geist (tabular numerals via `tabular-nums`). Monospace appears only for the subscriber e-mail.

**Character:** This is the same single neo-grotesk family as Матура Плюс. Hierarchy comes from weight (400 body, 600 labels, 700 headings and buttons) and slightly tight tracking on large sizes. There is no second display face. The font is preloaded with `font-display: optional`, so it never swaps after first paint.

### Hierarchy
- **Display** (700, 30px → 48px → 60px at sm/lg, line-height 1.12, tracking -0.025em): The single hero h1, balanced and centered, at max 56rem. One phrase inside it is set in sapphire.
- **Headline** (700, 24px → 30–36px at sm, tracking -0.025em): Section h2s ("Всеки предмет от всеки клас…", the labs pillar heading) and the 20–24px headings in the SmartScan, Mysteries, bridge and newsletter cards.
- **Title** (700, 16–18px): Card and portal titles ("Влез в учебната академия", "Тренажор на живо") and trainer question text (600, 16px, snug).
- **Body** (400, 14px, line-height 1.625; lead 16–18px slate-600 at max 42rem): Card descriptions and the hero subtitle, using `text-pretty`.
- **Label** (600, 12px; meta lines at 11px): Buttons, chips, badges, filter pills and meta rows. Nav items use 13px/600. Label text is set in sentence case. Uppercase tracked text appears only in footer column headings and navbar dropdown group labels, never above a heading.
- **Numeral** (700, 36px, tabular): The focus timer readout. Telemetry figures use 18px/700, also tabular.

### Named Rules
**The One Highlight Rule.** A headline may carry one sapphire phrase as solid color. It never uses gradient text.

**The Counted Numbers Rule.** Every count (lessons, dossiers, questions) is set `tabular-nums` and comes from the data.

## Layout

Content sits in centered columns. The hero uses a max width of 64rem (`max-w-5xl`), with headline, subtitle and search narrowing to 56, 42 and 48rem. All other sections use 80rem (`max-w-7xl`) with 16 / 24 / 32px gutters at base, sm and lg. Sections stack with a 64px rhythm. Inside cards, the gaps are 6–8px between chips, 12–20px between blocks and 20–24px of padding (28–40px on feature cards).

On large screens, the trainer and timer use a 12-column split (7 + 5). Portals and search results use two columns from md. Option buttons use two columns from sm. On mobile, everything collapses to one column, button pairs stack full-width, and the "Пълен каталог" button inside the search hides below sm. Below the fold, sections render deferred and use `content-visibility: auto`. Text is centered only in the hero. Everything else is left-aligned.

## Elevation & Depth

Depth is ambient and low. Surfaces separate from the white ground through a slate-200 hairline plus a 1–3px shadow. They never float high. Some shadows are tinted sapphire (10% of #2083c4) to echo the top glow. The only high shadow belongs to overlays: search results and the labs dropdown.

### Shadow Vocabulary
- **Hairline lift** (`box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)`): Badges, icon tiles, the newsletter card, secondary buttons.
- **Resting card** (`box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`): Cards, solid buttons, the sapphire band.
- **Sapphire resting** (`box-shadow: 0 1px 3px 0 rgb(32 131 196 / 0.1), 0 1px 2px -1px rgb(32 131 196 / 0.1)`): The search field and the hero demo panel.
- **Portal hover** (`box-shadow: 0 4px 6px -1px rgb(32 131 196 / 0.1), 0 2px 4px -2px rgb(32 131 196 / 0.1)`): Portal cards on hover. The Mysteries card uses the amber equivalent.
- **Overlay** (`box-shadow: 0 10px 15px -3px rgb(15 23 42 / 0.1), 0 4px 6px -4px rgb(15 23 42 / 0.1)`): Search results panel and nav dropdowns.

### Named Rules
**The Soft Edge Rule.** Depth is a soft blur under a hairline. There are no hard offset shadows and no thick bottom borders as a 3D edge.

**The One Band Rule.** The deep sapphire band (a 135° gradient from #083861 through #0a4b82 to #145a96, white text, emerald-300 icons) marks the single high-emphasis panel of a section: the focus timer, the express flashcards and the Матура Плюс bridge. It is one hue at three depths, never a multi-color gradient.

## Shapes

Corners follow a strict ladder. Containers use 16px corners (cards, portals, panels, feature tiles). Inner blocks use 12px (option buttons, result rows, icon tiles, telemetry tiles, inputs). Buttons and filter pills use 8px. Segmented-control thumbs and nav items use 6px. Search chips, status badges and count pills are fully round. Borders are 1px hairlines everywhere, in slate-200 on white, blue-100/200 on sapphire tints, amber-100/200 on the portal, and white at 15% on the sapphire band. Icon tiles are square-ish grids (36–48px) with the icon centered.

## Components

### Buttons
Solid, quiet and decisive.
- **Shape:** Gently rounded (8px).
- **Primary:** Sapphire fill, white 14px/700 label, 10px 20px padding, at least 44px high, Lucide icon at 16px with an 8px gap, resting card shadow.
- **Hover / Focus / Active:** Hover lifts to Sapphire Lift. Press scales to 0.98. Keyboard focus shows a 2px sapphire outline at a 2px offset (the global `:focus-visible` rule).
- **Secondary:** White fill, slate-200 hairline, slate-700 label, slate-50 on hover.
- **On sapphire band:** White fill, sapphire label, slate-100 on hover, 48px high.
- **Mysteries:** Amber-700 fill and white label, amber-800 on hover. Used only inside the portal.
- **Compact:** 12px/600 with 4px 10px padding, used for in-card actions ("Конспект", "Тест (n)", "Устен").

### Chips
- **Quick-search chips:** Fully round, white, slate-200 hairline, slate-700 12px/500, slate-400 icon. On hover the border turns sapphire-200, the fill turns sapphire-50 and the text turns sapphire.
- **Filter pills:** 8px corners and `aria-pressed`. Inactive pills are white with a hairline. The active pill is solid sapphire with white text.
- **Count pills:** Fully round tint (sapphire-100 or amber-100) at 12px/600 tabular.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** Paper. Portals use sapphire-50 or amber-50 at 40%. The hero demo panel fades from white to slate-50.
- **Shadow Strategy:** Resting card. Hover goes to Portal hover (see Elevation & Depth).
- **Border:** 1px slate-200 (or the portal's tint line).
- **Internal Padding:** 20–24px, or 28–40px for feature cards. Internal dividers are slate-100 hairlines.

### Inputs / Fields
- **Style:** White fill and slate-200 hairline. The hero search uses 12px corners, is 48px high, has a slate-400 leading search icon and a slate-500 placeholder, and embeds a primary button. Newsletter fields use slate-300 borders, 40px height and 12px corners.
- **Focus:** The border turns sapphire and a 2px sapphire ring appears at 15–20% opacity. The caret is sapphire.

### Navigation
- **Style:** A sticky white header at 85% opacity with a 12px backdrop blur and a slate-200 bottom hairline. The wordmark is a sapphire 32px rounded tile with a white graduation-cap icon, followed by "Study" in sapphire and "BG" in emerald (700, 18–20px), plus a hairline "5.–12. кл." tag.
- **Items:** 13px/600 slate-600 with 14px Lucide icons. Hover turns the text sapphire on slate-50. The active item is sapphire text on Sapphire Mist. Dropdowns are 16px panels with the Overlay shadow.
- **Sign-in:** "Вход с Google" is a solid sapphire button with the Google mark in a white circle. Once signed in, it becomes a white outlined profile button.

### Answer Options (signature)
These are 12px-corner option buttons in a 2-up grid with "А) Б) В) Г)" prefixes in slate-500. At rest they are white and hover to sapphire-50. After answering, the correct option becomes emerald-50 with an emerald-300 border and a check icon. A wrong pick becomes rose-50 with a rose-300 border and an X icon. Everything else greys to slate-500. An explanation card follows, in emerald for a correct answer or amber for a wrong one.

### Status Badge (signature)
This is the fully round sapphire-50 badge above the hero headline, with a sapphire-200 border, a shield icon and real counts separated by sapphire-300 bullets ("Програми на МОН 2026/2027 • N урока • 41 секретни досиета"). It is a data line, not a kicker.

## Do's and Don'ts

### Do:
- **Do** route every action through solid sapphire (#0a4b82) with 8px corners, hover to #0e5e9e, and press at 0.98 scale.
- **Do** build containers as white 16px cards with a 1px slate-200 border and the resting soft shadow.
- **Do** use Lucide line icons at 14–20px in slate-400/500, or in the brand color of their context.
- **Do** reserve the sapphire band gradient (#083861 → #0a4b82 → #145a96) for one high-emphasis panel per section.
- **Do** keep amber surfaces inside the "Мистерии" / "Обща култура" portal and rose for wrong or error states.
- **Do** set every count `tabular-nums` and source it from the data.

### Don't:
- **Don't** use emoji as icons or inside UI strings.
- **Don't** use gradient text. Highlight one headline phrase in solid sapphire instead.
- **Don't** add 3D bottom edges (thick `border-b-4` ledges) or hard offset shadows.
- **Don't** put kicker or eyebrow labels above headings.
- **Don't** introduce per-subject colors or new hue scales. The remap to two brands is the system.
- **Don't** set UI text below 11px.

## Open / stage 2

- Inner screens (lessons, tests, labs) inherit the remapped tokens but still carry some 3D bottom edges, colorful gradients and emoji from the previous system. They are not yet ported to this world.
- There is no dark theme. The site is light-only (`color-scheme: light`). A dark theme is planned for stage 2 (PRODUCT.md, Accessibility & Inclusion).
