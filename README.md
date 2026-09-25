# QR Trails

**Turn a garden visit into a learning adventure.**

QR Trails adds a digital learning layer to a physical garden. Visitors scan
QR codes placed around the garden and unlock short, visual, interactive
"discoveries" — connected into trails, with a quick quiz on every discovery.

This build is for **Bharatratna Dr. Babasaheb Ambedkar Udyan**, Government
Colony, Bandra East, Mumbai 400051.

The full product spec lives in the markdown documents at the repository root
(Product Requirements, Software Requirements, Content Bible, Animation
Guidelines, Development Plan, Project Rules, Testing Plan).

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Motion (React) for animation
- Lucide icons
- Static TypeScript content in `src/data/` — no backend, no database
- `localStorage` for progress (completed discoveries, scanned/unlocked stops,
  quiz scores)

## Routes

| Route | Purpose |
|---|---|
| `/` | Home — hero, how it works, the trails |
| `/explore` | Pick a trail |
| `/garden` | Garden overview / entry experience |
| `/trail/[id]` | Trail details with animated trail path — public, shows which stops are locked |
| `/learn/[id]?scan=1` | A single discovery (learning page) — **locked until scanned** |
| `/quiz/[id]?scan=1` | Quick quiz for a discovery — **locked until scanned** |
| `/result/[id]` | Quiz result, or trail recap for a trail id |
| `/flora` · `/flora/[id]` | Plant index + plant detail |
| `/guidelines` | Garden do's and don'ts |
| `/about` | About the CEP prototype |
| `/admin` | Staff console — content overview, checks, export/import (passcode-gated) |
| `/admin/trails` | Trails: title, description, stop order, ids |
| `/admin/discoveries` | Discoveries: copy, illustration, placement, quiz |
| `/admin/quizzes` | Every quiz and its questions |
| `/admin/guidelines` | Garden do's and don'ts |
| `/admin/qr` | Printable QR codes for every destination (staff only) |

## How locking works

Trail stops are locked until the visitor physically scans their code:

- Printed codes point at `/learn/<stop>?scan=1`. The `?scan=1` query is the only
  thing that unlocks that stop, and it is recorded in `localStorage`
  (`qr-trails:unlocked-topics`).
- Arriving at `/learn/<stop>` **without** the query — a typed URL, a shared link,
  or a search-engine crawler — renders a "scan the QR code to open this" screen
  instead of the content. What a visitor *sees* is only the scan prompt; (the
  page's script payload still carries the hidden tree so the gate can reveal it
  after hydration — this is a UX lock, not encryption).
- `/trail/[id]` stays public: an unscanned stop is listed but disabled, so people
  can see what the trail holds before they start. `/quiz/[id]` is gated too.
- A stop is also treated as unlocked once it has been completed, so progress
  saved before locking existed keeps working.

This stops casual guessing and crawling; it is **not** security. A determined
visitor can clear their site data or add `?scan=1` by hand. Real QR-token signing
would need a server, which this prototype deliberately avoids.

### Consequence for hosting

`/learn/[id]` and `/quiz/[id]` read `?scan=1` on the server, so they are
**server-rendered on demand** instead of prerendered. Deploy as a normal Next.js
app (Vercel or similar). Every other page is still static HTML, and a pure
static export would need the unlock check moved to client-only code (with a
brief flash of the locked state).

## Two views: visitors and staff

The public site and the staff console are separate:

- **Visitors** get the garden experience. They never see the console, and the
  public header and footer are removed on `/admin/*`.
- **Staff** get `/admin`: a content console with its own chrome, kept out of
  search engines (`noindex`) and behind a passcode.
- The QR sheet lives at `/admin/qr`. It used to be public at `/qr`, which no
  longer exists, and the public footer links only to the sign-in.

### What the admin console edits

Trails · discoveries (hook, explanation lines, fun fact, illustration, accent,
placement, follow-up link, id) · quizzes and their questions · guideline groups
and rules. Plus a **Checks** panel that catches the cross-references the compiler
cannot: a trail listing a stop that does not exist, a discovery with no quiz, a
question with no correct option. Renaming a trail or discovery id rewrites every
reference to it.

### How publishing works (and its limit)

The site is static and backend-free, so the console edits a **draft** held in that
browser's `localStorage` — visitors keep reading `src/data/*` and are unaffected.
To publish, use the console's Export panel:

1. Copy (or download) each generated file.
2. Paste it over the matching file in `src/data/`.
3. `pnpm build` and deploy.

A “Copy all as JSON” export plus an Import panel let you move a draft between
devices. Live, multi-user editing would need a real backend — that is a
deliberate non-goal here.

### A note on the passcode

The sign-in gate is **not security**. There is no server to check anything
against, so the passcode ships in the page bundle: it keeps the console out of the
visitor flow and out of search results, nothing more. Set it before deploying:

```
NEXT_PUBLIC_ADMIN_EMAIL=you@example.com
NEXT_PUBLIC_ADMIN_PASSCODE=choose-a-passcode
```

Anything genuinely private must not be put on this site.

## Content

Five trails, 19 discoveries, each with a 3-question quiz:

| Trail | Discoveries |
|---|---|
| **Ambedkar Heritage Trail** | The memorial · why the garden bears his name · Government Colony |
| **Tree & Shade Trail** | The neem beside you · the mango's long story · why shade matters most |
| **Garden Life Trail** | The flower beds · the walking track · keep it clean |
| **Play Trail** | The slide · the swing set · the slope · the see-saw · the merry-go-round |
| **Inside a Tree Trail** | Leaves → Trunk → Roots → Water → Ecosystem |

Plus 5 flora entries, grouped garden guidelines, and per-trail completion
screens. The `/qr` sheet prints one code per destination (currently 36), each
discovery code carrying its `?scan=1` unlock.

## Photos

`src/data/images.ts` is the single manifest for web-sourced photography, and it
holds two clearly separated kinds:

- **Garden photos** — the actual Ambedkar Udyan, taken from the garden's own
  Google Maps listing (community-contributed photos, © their photographers).
  They are used as an educational, non-commercial civic showcase with credit
  lines linking back to the listing; they are **not** freely licensed, so swap
  in the team's own shots before any commercial or official use.
- **Species photos** — freely-licensed Wikimedia Commons stand-ins (CC BY /
  CC BY-SA) for the plants the garden is *expected* to contain, badged
  "sample photo" in the UI.

Everything is downloaded into `public/images/` — no hotlinking, no third-party
requests at runtime. Credits render beside every image.

To replace them with your own photos: drop the files into `public/images/`,
update the entries in `src/data/images.ts`, and delete the `standIn` flags once
nothing is a stand-in any more.

### Placeholder content still to confirm on site

Nothing in the app states an unverified fact as truth. The remaining gaps:

- `src/data/garden.ts` — `hours` and `entryNote` are `null` until read off the
  board at the gate (the garden page hides those rows while they are null).
- `src/data/guidelines.ts` — generic public-garden do's and don'ts; replace with
  the garden's own posted rules (a photo of the signage is enough).
- `src/data/flora.ts` — verify every species and fact against the real garden.
- `src/data/topics.ts` — the `statue` discovery, the two `*-tree` discoveries and
  all five Play Trail stops carry TODOs: confirm the memorial's details, the tree
  species, and which play equipment is actually installed.
- `Topic.placement` — the physical spot for each printed QR code. Used by the
  `/qr` sheet; adjust once the posts are sited.
- `src/data/images.ts` — garden photos come from the garden's Google Maps
  listing (© their photographers, credited; replace before commercial use);
  species photos are CC stand-ins flagged `standIn` in the manifest.

## Scripts

```bash
pnpm dev       # development server
pnpm build     # production build
pnpm start     # serve the production build
pnpm lint      # eslint
```

To try the locking locally: open `/trail/play-trail` (everything locked), then
`/learn/slide?scan=1` (that stop unlocks and stays unlocked on that browser).

To try the console locally: open `/admin`, sign in with the development passcode
(`udyan-2026` unless `NEXT_PUBLIC_ADMIN_PASSCODE` is set), edit anything, then
open the Overview tab to see the generated files.

## Project rules (summary)

- Mobile-first: every page must work at 320–430px before scaling up.
- 80% visual / 20% text. Animation supports meaning — never decoration.
- Reduced-motion friendly; animations use `transform`/`opacity` only.
- No accounts, no backend, no analytics. Progress and unlocks stay on the device.
- Content pages are static; only the two scan-gated routes render on demand.
  Google admin sign-in (upgrade plan §7) is deliberately **not** built — it would
  add accounts and a real backend for no visitor benefit.