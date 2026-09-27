# QR Trails

**Turn a garden visit into a learning adventure.**

QR Trails adds a digital learning layer to a physical garden. Visitors scan QR codes placed around the garden and unlock short, visual, interactive **"discoveries"** — connected into trails, with a quick quiz on every discovery.

This build is for **Bharatratna Dr. Babasaheb Ambedkar Udyan**, Government Colony, Bandra East, Mumbai 400051.

The full product specification lives in the Markdown documents at the repository root:

* Product Requirements
* Software Requirements
* Content Bible
* Animation Guidelines
* Development Plan
* Project Rules
* Testing Plan

---

## Stack

* Next.js 16 (App Router) + TypeScript
* Tailwind CSS v4
* Motion (React) for animation
* Lucide icons
* Static TypeScript content in `src/data/`
* No backend
* No database
* `localStorage` for progress, including completed discoveries, scanned/unlocked stops, and quiz scores

---

## Routes

| Route          | Purpose                                |
| -------------- | -------------------------------------- |
| `/`            | Home — hero, how it works, and trails  |
| `/explore`     | Pick a trail                           |
| `/garden`      | Garden overview / entry experience     |
| `/trail/[id]`  | Trail details with animated trail path |
| `/learn/[id]`  | Individual discovery / learning page   |
| `/quiz/[id]`   | Quick quiz for a discovery             |
| `/result/[id]` | Quiz result or trail recap             |
| `/flora`       | Plant index                            |
| `/flora/[id]`  | Plant detail                           |
| `/play`        | Play corner and fitness facilities     |
| `/guidelines`  | Garden do's and don'ts                 |
| `/about`       | About the CEP prototype                |
| `/admin`       | Staff content console                  |
| `/admin/*`     | Staff content-management sections      |

The administrative interface is intended for project/staff use and is not part of the normal visitor experience.

---

## How QR Locking Works

Trail stops are intended to unlock when their corresponding QR code is scanned.

The prototype uses a QR-specific query parameter together with browser-local progress state to control access to discovery and quiz content.

Unlocked stops are stored locally in the visitor's browser.

### Important security limitation

The QR locking mechanism is a **UX/prototype access control mechanism, not a security boundary**.

Because this project intentionally has:

* no backend,
* no authentication service,
* no database,
* no server-side QR-token verification,

a determined user can potentially bypass the client-side locking mechanism.

The system must therefore **not be used to protect confidential, private, or security-sensitive content**.

A production implementation requiring genuine QR security would need server-side validation, signed/expiring QR tokens, or another appropriate authentication mechanism.

---

## Rendering Behaviour

The scan-gated learning and quiz routes use request-time information to determine the initial locked/unlocked state.

These routes therefore render on demand rather than behaving exactly like fully static pages.

The rest of the application remains suitable for the static, backend-free architecture used by this prototype.

A purely static deployment would require the unlock check to be moved entirely to client-side logic, which may introduce a brief locked-state display before hydration.

---

# Visitor and Staff Views

The application has two conceptual experiences.

### Visitors

Visitors receive the garden-learning experience:

* Trails
* Discoveries
* Quizzes
* Flora information
* Play and fitness information
* Garden guidelines
* Progress tracking

Visitor progress remains local to the device.

### Staff

Staff have access to a separate content-management interface for managing the prototype's content.

The staff interface is kept separate from the normal visitor navigation and is intended for project/content-management purposes.

The administrative area should not be treated as a security-sensitive system under the current backend-free architecture.

---

# Administrative Content Management

The console supports management of content such as:

* Trails
* Discoveries
* Discovery descriptions
* Illustrations
* Placement information
* Follow-up links
* Quizzes
* Quiz questions
* Garden guidelines
* Content consistency checks
* Export/import of draft content
* QR destination generation

The Checks functionality helps identify problems such as:

* A trail referencing a missing discovery
* A discovery without a quiz
* A question without a valid correct option
* Broken cross-references

Renaming supported trail or discovery identifiers updates their internal references where applicable.

---

# Publishing Model

QR Trails is intentionally a static/backend-free prototype.

Changes made through the administrative console are stored as a **draft in that browser's local storage**.

These changes do not automatically modify the source files used by the deployed visitor application.

To publish content changes:

1. Export the generated content from the console.
2. Update the corresponding files under `src/data/`.
3. Run the project validation/build process.
4. Deploy the updated application.

The export/import workflow allows drafts to be transferred between development devices.

### Current limitation

There is no live multi-user content-management system.

A production multi-user CMS would require a backend, authentication, authorization, persistent storage, and appropriate server-side validation.

---

# Administrative Access and Configuration

The prototype includes a lightweight administrative access gate.

**Important:** This gate is not intended to provide production-grade authentication.

The project deliberately avoids implementing a backend authentication system because the current prototype has no backend or user-account system.

### Environment configuration

Administrative configuration should be supplied through environment variables during development/deployment.

Example:

```env
NEXT_PUBLIC_ADMIN_EMAIL=your-admin-email@example.com
NEXT_PUBLIC_ADMIN_PASSCODE=your-development-passcode
```

### Security warning

Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser/client bundle.

Therefore:

* Do **not** place real secrets in `NEXT_PUBLIC_*` variables.
* Do **not** use the prototype admin passcode to protect confidential information.
* Do **not** assume the client-side admin gate provides authentication.
* Production authentication should be implemented server-side if the application is ever upgraded to handle private content.

**Never commit real credentials, API keys, tokens, passwords, or private environment files to the repository.**

Use an environment file such as `.env.local` for local development and ensure it is excluded from version control.

---

# Content

The current prototype contains five trails and 19 discoveries, with a three-question quiz associated with each discovery.

| Trail                       | Discoveries                                                              |
| --------------------------- | ------------------------------------------------------------------------ |
| **Ambedkar Heritage Trail** | The memorial · why the garden bears his name · Government Colony         |
| **Tree & Shade Trail**      | The neem beside you · the mango's long story · why shade matters most    |
| **Garden Life Trail**       | The flower beds · the walking track · keep it clean                      |
| **Play Trail**              | The slide · the swing set · the slope · the see-saw · the merry-go-round |
| **Inside a Tree Trail**     | Leaves → Trunk → Roots → Water → Ecosystem                               |

The project also includes:

* 5 flora entries
* Grouped garden guidelines
* Play and fitness facilities information
* Per-trail completion screens
* QR destinations for the supported learning experience

---

# Photos and Licensing

`src/data/images.ts` acts as the central manifest for web-sourced photography.

The project currently distinguishes between two types of images.

### Garden Photos

Garden photographs represent the actual Ambedkar Udyan and were sourced from the garden's Google Maps listing.

These are community-contributed photographs and remain the property of their respective photographers.

The project provides attribution where applicable.

They should **not** be assumed to be freely licensed.

Before any commercial, official, or broader public deployment, replace these images with photographs for which the project has appropriate usage rights.

### Species / Equipment Photos

Species and equipment imagery may use appropriately licensed Wikimedia Commons material, including CC BY / CC BY-SA assets.

Required attribution and licensing information should be retained.

Some images are marked as **sample/stand-in content** until the corresponding real-world subject has been verified.

### Replacing Images

To replace an image:

1. Add the replacement file to `public/images/`.
2. Update its entry in `src/data/images.ts`.
3. Preserve the required attribution/licensing information.
4. Remove any temporary stand-in designation once the replacement is confirmed.

---

# Content Verification Status

The application intentionally avoids presenting unverified information as confirmed fact.

The following items still require real-world verification before an official/public deployment.

### Garden Information

`src/data/garden.ts`

* Opening hours currently require confirmation against the garden's physical gate/signage.
* The entrance information should be confirmed on site.

### Play and Fitness Facilities

`src/data/play-and-fitness.ts`

Facilities are separated according to their evidence status.

Information based on observations/reports should be verified before being presented as confirmed official information.

Facilities marked as requiring confirmation should be checked on site.

### Garden Guidelines

`src/data/guidelines.ts`

The current rules are generic public-garden guidelines.

They should be replaced or validated against the garden's actual posted rules before official deployment.

### Flora

`src/data/flora.ts`

Plant species and associated educational facts should be verified against the plants actually present in the garden.

### Discoveries

`src/data/topics.ts`

The following content requires additional verification:

* Memorial/statue details
* Tree species
* Play Trail equipment
* Other location-specific claims

### QR Placement

Each discovery has placement information used to determine where its QR code should be installed.

Physical QR locations should be confirmed on site before printing and installation.

---

# QR Codes

The project includes a QR-generation interface for the supported destinations.

Each discovery QR code is associated with its corresponding learning destination and unlock behaviour.

QR codes should only be printed and installed after:

1. The corresponding content has been verified.
2. The physical placement has been confirmed.
3. The destination has been tested on a real mobile device.
4. The deployed URL has been verified.
5. The QR code has been scanned successfully from the intended physical distance.

---

# Scripts

```bash
pnpm dev       # development server
pnpm build     # production build
pnpm start     # serve the production build
pnpm lint      # ESLint
```

---

# Local Testing

To test the QR-learning flow locally:

1. Start the development server.
2. Open a trail.
3. Verify that unvisited stops appear in their intended locked state.
4. Test a discovery through its QR-style entry URL.
5. Verify that the discovery becomes available.
6. Complete the associated quiz.
7. Reload the page and verify that progress persists locally.

To test the administrative console:

1. Start the development server.
2. Open the administrative area.
3. Configure a **local development passcode through environment variables**.
4. Sign in.
5. Edit content.
6. Verify the generated/exported content.
7. Confirm that visitor content remains unaffected until the changes are published.

**Do not commit development credentials or `.env` files containing secrets.**

---

# Project Rules

* Mobile-first design.
* Every page must work at approximately 320–430px before scaling up.
* Target approximately 80% visual / 20% text presentation.
* Animation must support meaning rather than exist purely as decoration.
* Support reduced-motion preferences.
* Prefer `transform` and `opacity` for animations.
* No visitor accounts.
* No backend.
* No database.
* No analytics.
* Visitor progress remains on the device.
* Content is maintained as static TypeScript data.
* Scan-gated routes use request-time behaviour within the prototype architecture.
* No confidential information should be stored in the application.
* No real credentials, API keys, tokens, or secrets should be committed to source control.
* Administrative access is a prototype convenience mechanism, not production authentication.
* All real-world garden information should be verified before official/public deployment.
* Image licensing and attribution requirements must be preserved.

---

# Security and Privacy Summary

QR Trails is intentionally designed as a **backend-free educational prototype**.

The application does not currently provide:

* User accounts
* Server-side authentication
* Persistent server-side visitor profiles
* Database storage
* Server-side QR-token validation
* Production-grade administrative authorization
* Analytics or behavioural tracking

Visitor progress is stored locally in the browser.

Because the application is primarily client-side/static, it must not contain:

* Password databases
* API secrets
* Private access tokens
* Personal confidential information
* Internal credentials
* Sensitive administrative information
* Any other information that requires server-side access control

If such functionality is required in the future, the architecture should be upgraded to include appropriate backend security controls.

---

# Future Production Considerations

If QR Trails moves beyond the prototype stage, potential upgrades include:

* Server-side authentication for staff
* Role-based authorization
* Secure session management
* Server-side QR-token validation
* Signed or expiring QR tokens
* Persistent CMS/database
* Multi-user content editing
* Audit history for content changes
* Server-side validation of imported content
* Secure secret management
* Content publishing workflow
* Image-management system
* Production monitoring and error reporting
* Formal privacy and security review

These capabilities are **future scope** and are not part of the current implementation.

---

# Current Implementation vs Future Scope

## CURRENT IMPLEMENTATION

* Next.js 16 application
* TypeScript
* Tailwind CSS v4
* Motion-based animations
* Static TypeScript content
* Browser-local progress
* QR-based prototype unlocking
* Client-side administrative content editing
* Local draft storage
* Export/import workflow
* QR destination generation
* No backend
* No database
* No visitor accounts
* Prototype administrative access gate

## FUTURE SCOPE

* Real authentication
* Secure staff authorization
* Backend CMS
* Database-backed content
* Multi-user editing
* Server-side QR verification
* Signed/expiring QR tokens
* Secure production deployment
* Persistent publishing workflow
* Verified official garden content
* Officially licensed/owned photography
* Production security and privacy review

---

# Important Disclaimer

QR Trails is currently an educational/CEP prototype.

The application's QR locking, administrative access gate, and local-storage architecture are **not intended to provide security for confidential information**.

Any information requiring confidentiality or access control must be handled by a future backend-based architecture with appropriate authentication and authorization.

Before official deployment, all garden-specific information, operating hours, facilities, flora, signage, physical QR locations, image rights, and other real-world content should be independently verified.
