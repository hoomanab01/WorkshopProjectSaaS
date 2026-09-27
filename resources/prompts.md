# Prompts for the room

*From Figma to Function · Co-Work & Code*

Every prompt from tonight, in order, with what each one should produce and what usually goes wrong. Copy them, change the names to match your own file, keep the page.

## 00 · The pattern

*Learn this, not the prompts*

Every prompt tonight has the same four parts. The prompts are disposable. The shape is the thing you take to work on Monday.

| Part | What it is | If missing |
|---|---|---|
| **Source** | Which file, frame or component is the truth. Named exactly. | It guesses, and invents what it cannot see. |
| **Target** | The one thing to build or change, at the size of one step. | You get a plausible version of the wrong thing. |
| **Rules** | What it must use, and what it must never introduce. | Hardcoded values and colours nobody chose. |
| **Stop** | Where to halt. What not to touch, tidy or improve. | It helpfully refactors things you had finished. |

> **The one people leave out**  
> **Stop.** Everybody writes a source and a target, most people manage rules, almost nobody writes a stop. It is the line that keeps a small request small, and it is the difference between reviewing three lines and inheriting forty you never read.

## 01 · Connect to Figma

*17:42 · 20 min*

**Goal:** Claude Code can read your file and talk about it in your names, not its own  
**Checkpoint:** It says `Badge/Status/Open`, not "a green pill"

### 1.1 · Prove the connection

```text
Open the Figma file I have connected and list the top-level
frames by name. Nothing else yet.
```

Smallest possible question with a verifiable answer. If the frame names come back wrong or generic, stop here and fix the connection before anything else. **Every later block depends on this one.**

> **Common failure:** it describes the design from the conversation instead of reading the file. If no frame names appear, it is not connected, it is being polite.

### 1.2 · Inventory the system

```text
From the frame Inbox/Desktop, list every component and every
variable you can see. Group them: colour, spacing, type,
components. Use the exact names from the file.

Do not build anything and do not suggest improvements.
```

This is the moment you find out whether your file is legible to something that is not you. A clean inventory means a clean build. **Read this list properly.** Anything you cannot recognise from its name is a problem you are about to inherit.

> **Common failure:** it paraphrases names, so `space/16` comes back as "16px spacing". Reply: "use the exact variable names, verbatim".

### 1.3 · Write the rules file

```text
Create a file called CLAUDE.md in this project. Fill it with:

1. Sources of truth: the Figma file, which frame is the
   reference, where the tokens live.
2. Constraints: every colour, spacing and type value comes
   from a variable. Components are reused by reference,
   never rebuilt.
3. Never: no new colours, no hardcoded values, no one-off
   overrides to make a single screen look right.

Write the file. Build nothing.
```

The highest leverage minute of the evening. This file gets read on every run from now on, so you stop repeating yourself and the model stops drifting. **Take it home and put one in every project.**

> **Common failure:** it writes a beautiful file and then starts building. That is what the last line is for.

## 02 · Tokens and the first component

*18:14 · 26 min*

**Goal:** A real token layer, and one component that points at it  
**Checkpoint:** The button's colour is a token reference, not a hex

### 2.1 · Build the token layer

```text
Read the Figma variables and generate a single token file.

Keep the exact names from Figma, including the slashes.
Do not rename, do not tidy, do not add values that are
not in the file, and do not fill gaps you think exist.

List anything you expected to find and did not.
```

The last line is the useful one. A model asked to build a token set will quietly invent the missing steps of a scale rather than report a hole. **Asking it to name the gaps turns a guess into a finding.**

> **Common failure:** renaming to a convention it prefers, so `color/ink/primary` becomes `colors.text.primary` and nothing matches your file any more.

### 2.2 · Build one component

```text
Build Button/Primary from the Figma component, with all
three variants and all four states that are drawn.

Every value comes from the token file. If a value you need
is not there, stop and tell me rather than inventing it.

Just this component. Do not build anything it sits next to.
```

One component, fully, before anything larger. If the token path is broken you want to find out here, in twenty lines, and not in a whole screen. **Stop and tell me** converts a silent invention into a question.

> **Common failure:** it builds the default variant only and calls it done. Count the variants and the states against the Figma file yourself.

### 2.3 · Audit what it just did

```text
List every colour, spacing and type value in the component
you just built. For each one, say which token it came from,
or write HARDCODED and give the line number.

Do not fix anything. I will decide what gets fixed.
```

The checkpoint made executable. Run it after every build tonight. **Separating finding from fixing is the whole discipline:** the finding can be delegated, the decision cannot.

> **Common failure:** you let it fix while it finds, and inherit changes you never read. Keep the last line every time.

## 03 · The page and its states

*18:58 · 30 min*

**Goal:** The full screen, plus empty, loading and error  
**Checkpoint:** All four views switchable, and long content does not break them

### 3.1 · Assemble the screen

```text
Build the frame Inbox/Desktop.

Use the components that already exist in this project. If a
piece of the screen has no component yet, tell me and leave
a gap. Do not create a lookalike.

Layout and spacing come from the tokens.
```

The reuse test. A model will happily rebuild a badge from scratch inside a row rather than reference the one you made, and the result looks identical until you change something. **Leave a gap** makes the missing pieces visible instead of papered over.

> **Common failure:** silent cloning. Ask it afterwards: "which components did you reference and which did you create?"

### 3.2 · Add the states nobody draws

```text
Add three states to this screen, from the frames
States/Empty, States/Loading and States/Error.

Let me switch between them and the default view without
editing code.

Use the components and tokens already here.
```

Nobody gets states for free, because nobody asks for them. **Switchable without editing code** is what makes them reviewable in the room, and what makes them survive into a real handover.

> **Common failure:** it invents a spinner and an apologetic error message instead of building what you drew. Point it back at the frames.

### 3.3 · Break it with real content

```text
Replace the sample content with the longest realistic values:
a subject line of 120 characters, a sender with a long name,
a count in the thousands, and one row with no avatar.

Do not change any styling. Show me what breaks.
```

The single most useful prompt on this page. Every design looks good at the length the designer typed. **This is where hierarchy either holds or collapses,** and it takes fifteen seconds to find out.

> **Common failure:** it "fixes" the overflow with a truncation you never chose. The stop line matters here more than anywhere.

## 04 · Interactions and motion

*19:36 · 20 min*

**Goal:** Interaction states and transitions, from tokens rather than taste  
**Checkpoint:** Tab through with a keyboard. The focus ring is visible everywhere

### 4.1 · Interaction states

```text
Add hover, focus, active and disabled to every interactive
element on this screen, using the states drawn in Figma.

Focus must be visible on every one and reachable by keyboard
in the order the screen reads. Do not remove any outline.

Colours from tokens only.
```

"Do not remove any outline" is there because suppressing the default focus ring for looking untidy is the most common accessibility regression in generated interfaces. **Say it explicitly every time.**

> **Common failure:** hover gets all the attention and focus gets none, because hover is the one you see while you build.

### 4.2 · Motion, from tokens

```text
Add transitions to the state changes on this screen.

Use only motion/duration/fast, motion/duration/base and
motion/easing/standard. Nothing longer than the base duration.
Animate opacity and transform only, never layout.

Honour prefers-reduced-motion: no transitions when it is set.

No entrance animations. State changes only.
```

Four constraints, and each one prevents a specific bad habit: durations from the system rather than invented, cheap properties so it stays smooth, reduced motion honoured, and no decorative entrances. **Motion is a token layer like any other.**

> **Common failure:** everything eases over 400ms and the interface feels underwater. Name the ceiling.

### 4.3 · The change request

```text
Open the frame Change Request and compare it to what we built.
Two token values differ. Find them.

Change only those two values. Do not touch any component,
and do not adjust anything to compensate.

Then tell me every place in the build that changed.
```

The point of the whole evening. Two values move and the screen follows, or it does not and you have found exactly where your system leaks. **Both outcomes are wins.** The last line is what makes the propagation visible rather than assumed.

> **Common failure:** it edits components to make the result match. That is the leak, and the instruction not to compensate is what exposes it.

## 05 · When it goes sideways

*Keep these close*

Four prompts that save a block. You will need at least one tonight.

### 5.1 · It rebuilt instead of reusing

```text
You created a new element where a component already exists.
Find every place that happened, list them, and replace each
one with a reference to the existing component.

Change nothing else.
```

The most common structural failure, and the one that looks fine on screen. Run it whenever a build feels suspiciously smooth.

### 5.2 · Show me what you did

```text
Show me a diff of everything you changed in the last step.
Do not change anything else while you do it.
```

Use it the moment you lose track. Reviewing is cheap, unpicking is not.

### 5.3 · Put it back

```text
Undo your last change completely. Then explain what you were
trying to do, and wait. Do not try again yet.
```

Better than arguing with it. Getting the intention out loud usually reveals that your prompt was ambiguous rather than the model being wrong.

### 5.4 · Find the hardcoded values

```text
Search the whole project for colour, spacing and type values
that are not token references. List each with its file and
line number.

Do not fix any of them.
```

The sweep. Run it before you call anything finished, and again on your own work on Monday. It is usually humbling.

## 06 · Do not write these

Three prompts that feel natural and waste your time. Each is missing a part of the pattern.

### ✕ "Make it look better"

**No source, no rules, no stop.** You will get a different design, not a better one, and you will have no idea what changed. Say which element, measured against which frame, and what it may use.

### ✕ "Build the inbox app"

**Target far too large.** Everything after the first wrong assumption compounds. One component, then one block, then one screen. Small steps are not slower, they are the only ones you can check.

### ✕ "Fix the spacing issues"

**No stop, and probably the wrong layer.** Spacing usually drifts because the structure is wrong. Ask what fails and against which scale, fix the structure, then look again. Half the spacing complaints resolve themselves.

> **On Monday**  
> Take the pattern, not the prompts. Pick one screen you have already designed, name its layers properly, write the rules file, build one component, then ask for a change request. If the change propagates, your system is real. If it does not, you found the leak in an hour instead of a quarter.

---

*From Figma to Function · Co-Work & Code, Berlin · Hooman Abbasi · Vidushi Malhan*
