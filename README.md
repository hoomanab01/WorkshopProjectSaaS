# From Figma to Function

Materials for a hands-on workshop on taking a real Figma design to a working interface with Claude Code.

Berlin · three hours · in person · part of the Co-Work &amp; Code series.

---

## What the workshop argues

Most of the quality of an AI-assisted build is decided before anyone types a prompt.

A model reproduces the structure it is handed. Give it a screenshot and it has to guess: it invents names for things that had none, hardcodes every colour it can see, builds one static view because it was shown one static view, and rewrites half the file the moment you ask for a change. Give it a system and the guessing stops. Named components become named code, tokens become variables, and the states you drew get built because they exist.

Same model. Same prompt. Different file.

**Your design system is the prompt.** Everything in this repository follows from that.

Three consequences the workshop works through:

1. **Naming became functional.** A layer name used to be a note to a teammate. It is now an instruction, and an empty one if the layer is called `Frame 427`.
2. **The system is the leverage, not the screen.** Anyone can generate one screen. The test is the fiftieth, and what a change to one token costs you.
3. **Design judgement did not get automated.** Models produce work that looks finished. Holding a spacing scale, keeping hierarchy under real content, building the states nobody drew, leaving a focus ring where a keyboard user needs one: still yours.

## Who it is for

Practising UX, UI, product and design-system designers who are already fluent in Figma.

It is not an introduction to design, not an introduction to Figma, and it does not promise one-click production code.

## Prerequisites

| | |
|---|---|
| Claude account | A paid plan. Claude Code does not run on the free tier |
| Figma account | Free is fine |
| Laptop | With permission to install software. Check this early if it is managed by an employer |
| Node | Version 18 or higher |

## What is here

| Path | What it is |
|---|---|
| `resources/presentation.pdf` | The workshop deck, one slide per page |
| `resources/prompts.md` | The prompts used in the room, to rerun the build after the session |
| `resources/claude-chat-1-figma-variables.md` | Claude chat: turning the exported design tokens into Figma variables |
| `resources/claude-chat-2-building-the-saas-app.md` | Claude chat: building the app, from the button and ShadCN components to the Deals board and the push to GitHub |
| `instructor/` | Facilitation notes and the starter Figma file spec. **Contains spoilers.** See the warning below |
| `Hooman's output/WorkshopProjectSaaS/` | The instructor's own build from the workshop: a working app made from a Figma design system. See [the section below](#hoomans-output-the-finished-build) |

### A warning about `instructor/`

The starter Figma file contains two faults placed there on purpose. Discovering them in your own build is one of the better moments of the evening, and `instructor/` documents exactly what they are and when to reveal them.

If you are attending, do not read that folder. Nothing in it will help you and it will cost you the good part.

## Running it yourself

The material is reusable. `instructor/starter-project-spec.md` is a complete build spec for the starter Figma file, including the token set, the nine components, the frames, the two deliberate faults and the change request that the whole evening turns on. The deck is `resources/presentation.pdf`.

If you do run it, an attribution is appreciated and a note about how it went is more so.

## Hooman's output: the finished build

`Hooman's output/WorkshopProjectSaaS/` is what came out of following the workshop end to end with Claude Code and the Figma connection. Use it to compare with your own build, or as a starting point.

What it shows:

- **Figma variables become code.** The Figma variable exports sit in `design-tokens/` and a small script turns them into CSS variables, including the Mobile, Tablet and Desktop size modes. Change a value in Figma, export it again, and every component follows.
- **A Figma component becomes a code component.** The button from the starter file is built with all 168 versions (7 types, 3 sizes, 4 states, with or without a label), named the same way as in Figma.
- **A full component library, styled by the design system.** All the ShadCN components, pointed at the Figma colours, corners and font. Every button inside them is the Figma button.
- **A real screen from a Figma frame.** A Deals board with a sidebar, search and cards you can drag between columns with the mouse or the keyboard.

### Run it

You need Node 18 or higher.

```bash
cd "Hooman's output/WorkshopProjectSaaS"
npm install
npm run dev
```

Then open:

| Address | What you see |
|---|---|
| http://localhost:3000/design-system | Every component, grouped by category, including all 168 versions of the Figma button |
| http://localhost:3000/deals | The Deals board built from the Figma frame |

The project's own [README](Hooman's%20output/WorkshopProjectSaaS/README.md) explains where everything lives: the tokens, the components and the screens.

## Credits

Created and taught by **Hooman Abbasi**, Design Lead and design strategist.

Co-hosted with **Vidushi Malhan**, who runs the Co-Work &amp; Code workshop series and covers the Claude Code setup and tooling in the room.
