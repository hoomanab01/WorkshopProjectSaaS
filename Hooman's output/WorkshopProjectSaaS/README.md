# My SaaS Project

Dealership management for powersports. Built with Next.js, TypeScript, Tailwind and ShadCN.

## Run it

```bash
npm install
npm run dev
```

Then open:

- http://localhost:3000/deals: the Deals board (first screen, from Figma "My design system", node 53:1238)
- http://localhost:3000/design-system: every component, grouped into categories

## How the design system is wired

Figma → `design-tokens/` → `src/styles/tokens.css` → components.

- **`design-tokens/`** holds the Figma variable exports, one folder per collection
  (`Colors`, `Colors_base`, `Sizes`, `Sizes_base`, `Typography_base`, `States`,
  `Opacity`, `Components`). Replace these files when Figma changes.
- **`npm run tokens`** turns them into CSS variables in `src/styles/tokens.css`.
  It runs on its own before `dev` and `build`. Never edit that CSS file by hand.
- Variable names follow the Figma names: `Button/primary/hover/opacity` becomes
  `--button-primary-hover-opacity`, `surface/Blue/default` becomes
  `--surface-blue-default`, and so on.
- The Figma `Sizes` collection has Mobile, Tablet and Desktop modes. They apply
  below 768px, from 768px, and from 1024px.

## Components

| Component | Source | Code |
| --- | --- | --- |
| Button | Figma `button` set, node 3:70 | `src/components/Button` |
| Everything else (60) | ShadCN (Radix, "vega" style) | `src/components/ui` |

Button props match the Figma properties, except Figma's `type` is `variant` in code
(`type` is already the HTML button attribute).

### ShadCN and the Figma design

- ShadCN's colour roles (`--primary`, `--border`, `--muted`…) and corner radii are
  pointed at the Figma variables in `src/app/globals.css`. Light mode only.
- `src/components/ui/button.tsx` keeps ShadCN's button API but draws the Figma
  button, so dialogs, the calendar, pagination and so on all use it:

  | ShadCN variant | Figma type |   | ShadCN size | Figma size |
  | --- | --- | --- | --- | --- |
  | default | primary | | xs, sm, icon-xs, icon-sm | s |
  | secondary | secondary-grey | | default, icon | m |
  | outline | tertiary | | lg, icon-lg | l |
  | destructive | destructive | | | |
  | ghost | link-neutral (Figma has no ghost) | | | |
  | link | link-color | | | |

- Figma variables that share a name with a Tailwind colour (for example
  `red/500`, `blue/500`, `neutral/600`) replace Tailwind's value, so `bg-red-500`
  gives the Figma red.

## Screens

| Screen | Figma | Code |
| --- | --- | --- |
| Deals board | "My design system", node 53:1238 | `src/app/(app)/deals` |

- Screens with the side navigation live in `src/app/(app)/`; the frame is `src/app/(app)/layout.tsx`
  and the navigation is `src/components/app/AppSidebar.tsx`.
- Icons and images exported from Figma are in `public/figma/`.
- Deal cards can be dragged between columns with the mouse, or moved with the keyboard
  (focus a card, Space to pick up, arrow keys to move, Space to drop). This uses dnd-kit.
- The data is sample data in `deals-data.ts` until there is a backend.
