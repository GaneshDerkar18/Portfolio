# Ganesh Derkar — React portfolio

A responsive full-stack developer portfolio with dark and light themes, project search and filters, individual project pages, experience, skills, certificates, and a Formspree contact form.

## Update everything in one file

Edit **`src/data/portfolio.json`**. This is the content source for all pages.

| Section | What to update |
| --- | --- |
| `profile` | Name, role, employer, introduction, personal thought, biography, location, social links, and ID-card focus areas |
| `resume` | Professional summary, selected projects, optional phone, PDF filename, and resume options |
| `projects` | Project cards, detail pages, featured work, technology tags, and links |
| `skillGroups` | Skills section, homepage technology strip, and resume skills |
| `experience` / `education` | Work history and education |
| `companyWebsites` | Official company URLs used across the site and PDF resume |
| `achievements` / `certifications` | Awards and professional certifications |
| `site` | Site description, contact copy, Formspree form ID, footer text |
| `certificatesUrl` | Link to the full certificate collection |

`profile.role` is your professional headline. Each `experience` entry keeps its exact job title, employer, and dates; the entry with `current: true` also powers the current job on your ID card. The experience section groups consecutive roles at one employer into a promotion timeline. `profile.thought` supplies the short personal thought below your introduction. A short biography, experience, education, certifications, and awards are visible on the homepage. Keep `profile.bio` personal and concise; dates and technology lists already have their own sections.

Add a company name and its official website to `companyWebsites` (for example, `"Endava": "https://www.endava.com/"`). Shared company text links matching names in the profile, biography, experience, certifications, and resume. The downloadable PDF contains clickable company links while preserving selectable text. Missing or unsafe URLs leave the company name as plain text.

### Add a social or coding platform

Add one entry to `profile.socials`; it appears in the hero, About, contact, footer, and resume automatically:

```json
{ "label": "LeetCode", "icon": "leetcode", "url": "https://leetcode.com/u/YOUR_USERNAME/", "showInResume": true }
```

`label` and a valid full `url` are enough. `icon` is optional and falls back to a globe for any new platform. Built-in choices include `github`, `linkedin`, `leetcode`, and `x-twitter`. To add a custom logo without editing React, set `iconUrl` to a local asset such as `/assects/platform.svg`. Set `showInResume: false` to omit it only from the resume, or `enabled: false` to hide it everywhere. Empty and unsafe URLs are hidden. LeetCode's URL is deliberately empty until the actual username is supplied.

### Add a skill

Each `skillGroups[].skills` item can be a plain string (supporting skill) or an object:

```json
{ "name": ".NET Web API", "mark": ".NET", "detail": "C# & REST services", "featured": true }
```

`detail` gives the skill a primary position in its category row, with a short description beneath its name. Supporting skills follow as smaller labels. Use `icon` for an existing SVG icon, or `mark` for a short text symbol. `featured: true` also puts it in the continuously scrolling technology strip. The resume takes the names from these same entries; there is no second list to maintain. No proficiency percentages are invented.

### Add a project

The first three non-concept projects with `featured: true`, in JSON order, appear in the homepage grid. They share one desktop row above a slim “See more projects” link. Cards use two columns on tablets and one on phones; the same compact card styling applies to the full collection and related projects. The introduction is reserved for your profile. A concise description, the first three technologies, and demo/source links are immediately visible; the full stack and implementation highlights remain on each project's detail page. Keep card descriptions focused on what someone can do with the project; use `overview` and `highlights` to explain your contribution and actual implementation decisions.

Copy an entry in the `projects` array, give it a **unique, lowercase, hyphenated id**, and edit its content:

```json
{
  "id": "my-new-project",
  "title": "My New Project",
  "subtitle": "A short project tagline",
  "category": "Full stack",
  "status": "Personal project",
  "featured": true,
  "accent": "blue",
  "icon": "code",
  "image": "/assects/my-new-project.png",
  "description": "A concise summary for the project card.",
  "overview": "What the project does and why you built it.",
  "technologies": ["Angular", ".NET Web API", "Docker"],
  "highlights": ["A real feature you implemented."],
  "githubUrl": "",
  "demoUrl": ""
}
```

- Save images in `public/assects/`, then reference them as `/assects/filename.png`. An empty `image` uses a styled title card.
- Screenshots appear in a shared browser frame. Optional `imageCrop: { "top": 12, "bottom": 5 }` clips percentages from the top and bottom in the preview, useful for hiding captured browser bars. The original image stays unchanged.
- `featured: true` makes a non-concept project eligible for the three homepage slots. Reorder entries or unfeature an older project to change the selection; all projects remain in the full collection.
- Project categories, filters, counts, related work, and `/projects/my-new-project` are generated automatically. No route or component edits needed.
- Leave `githubUrl` and `demoUrl` empty when unavailable. The corresponding buttons stay hidden.
- Accent options: `blue`, `purple`, `green`, `red`, `orange`.
- Useful icons: `code`, `server`, `layers`, `sparkles`, `film`, `utensils`, `check`, `scan`.
- Entries with `status: "Concept"` appear in a separate **Project ideas** group in the collection. Search and category filters apply to both groups, with separate project/concept counts. Concepts are excluded from homepage slots, the homepage project count, and the resume. Related projects stay within the same group. Replace proposed scope with actual implementation details, update the status, and add real links when an idea becomes a project.
- Endava start dates follow your supplied timeline: January 2025 internship, August 2025 Associate Developer, August 2026 Developer. Earlier Endava roles show their start dates only because exact end dates were not supplied.

## Run locally

Use a supported Node.js LTS version and npm.

```sh
npm install
npm start
```

On Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

## Build and check

```sh
npm run build
npm test -- --watchAll=false --runInBand
```

Before starting or building, `scripts/sync-content.cjs` validates project IDs, required fields, image paths, and project links. It also generates `public/index.html`, `public/manifest.json`, and the monogram favicon from the shared content. **Edit the content file, not these generated files.**

During development, React updates when you save the content file. Restart the server to refresh generated HTML metadata; a production build always refreshes it. Detail-page titles and descriptions update on navigation.

## Routes and hosting

- `/`: introduction and resume actions, three featured projects, skills, concise biography and experience, awards, contact
- `/about`: introduction, biography and experience, certificates
- `/projects`: complete project collection with shareable search/filter URLs
- `/projects/:id`: generated project detail page
- `/contact`: contact page
- `/moreabout`: preserved certificate-page URL
- `/resume`: JSON-driven resume, PDF download, and print view

Deploy the generated `build/` directory to a static host **with an SPA fallback to `index.html`** so direct visits and refreshes of nested routes work. For a subdirectory deployment, set Create React App’s `PUBLIC_URL` to that base path before building. Navigation and public assets honor this prefix.

The old checked-in `build/` output is not the source of truth. Run a fresh production build before deployment. Local verification can use `BUILD_PATH=.verification-build` to avoid changing that old output.

## Contact and API integrations

The existing Formspree ID is preserved in `site.formspreeId`. Change it to your own connected form ID when needed. An empty ID displays a direct email contact option. The form supports validation, sending, success, retry, and network-error states.

OpenAI and Gemini are presented as portfolio skills and project technologies. This static portfolio does not call either AI provider. **Never put an API key in the content file, React source, or a `REACT_APP_*` variable**: client-side values are public. Any actual AI feature should call your backend, where provider credentials remain server-side.

## Verification

The interaction tests cover shared content, adding a project once, category and technology filtering, empty results, project navigation, concept labeling, missing links, About routing, 404 recovery, theme persistence, mobile menu behavior, and contact success/failure states. Formspree is mocked in tests so no real messages are sent.

## JSON-driven resume

The old Google Drive resume link has been replaced by a live `/resume` page and a direct **Download resume** PDF button.

All edits remain in **`src/data/portfolio.json`**:

- `profile`: name, role, company, location, email, and social links.
- `resume.summary`: the professional summary shown on the resume and in its PDF, without a repeated homepage section.
- `resume.phone`: optional phone number; an empty string is hidden.
- `resume.projectIds`: IDs of existing projects to include, in the order you choose. Concepts are excluded from the resume.
- `profile.socials[].showInResume`: controls resume inclusion on each social entry; new links are included by default.
- `resume.includeAchievements`: whether to include certificates and awards.
- `resume.includeCertifications`: whether to include the `certifications` list.
- `resume.fileName`: downloaded file name, without `.pdf`.
- `experience`, `education`, and `skillGroups`: reused in both the website and resume. Optional `period` fields can hold your actual dates.
- A project may include `resumeDescription` for a shorter resume-specific description; otherwise its normal description is used.

The browser generates the PDF from the same model as the onscreen document. It does not download a stale uploaded file or send resume data to a PDF service. A fresh production build publishes your JSON changes; no separate PDF upload is required. In development, saving the JSON refreshes the content.

The PDF uses a single column, standard section titles, and real selectable text, adding A4 pages as content grows. This supports ATS parsing, but no template can guarantee a particular ATS score or screening outcome. The default PDF font supports the current English/Western Latin content; add an embedded font before using scripts such as Devanagari. The browser print version is available as an alternative.

## Navigation, motion, and performance

The homepage follows introduction → selected work → skills → experience and a short biography → recognition → contact. Resume actions stay in the introduction and navigation; the generic principles and duplicate resume-summary sections have been removed. Main navigation scrolls to the remaining sections. **See more projects** opens the full collection, with explicit back links to the homepage. The existing About URL remains available, but opening it is not necessary to read your profile. The legacy `/#resume` anchor now points to the introduction's resume actions, and the resume page's back link returns to `/#about`.

Shared components live in `src/components/ui/`: `Button`, `BackLink`, `FormField`, `Reveal`, `SkillSymbol`, `SocialLinks`, and cards, tags, headings, and links. Secondary routes, the contact form, and PDF-generation code are split into separate bundles. The PDF library loads only when Download resume is clicked. Individual SVG brand icons replace the full icon font.

The default theme is midnight blue with blue, aqua, and soft violet accents; the alternate theme uses cool white. Space Grotesk display type pairs with Inter body text. An explicit saved theme choice is preserved. The sticky header becomes translucent after scrolling and regains its stronger background on hover, keyboard focus, or an open mobile menu.

`ProfileCard` draws a developer ID badge using the profile, current job, and featured skills from JSON. The top clip stays fixed while `useHangingMotion` makes the card pivot gently with the mouse, then settle upright with a damped spring. The hook measures the unrotated container, limits the swing near viewport edges, writes CSS directly, and stops requesting frames when settled. Touch, reduced motion, scrolling, hidden tabs, blur, and unmount are handled without leaving animation loops running. Its entrance, orbit accents, and headline reveal are CSS/SVG animations. Phones stack the copy and card. `ProjectVisual` and `ProjectHighlights` remain shared components. Project screenshots load lazily. Hero, project, and section styles live in `Hero.css`, `Projects.css`, and `Sections.css`.

`TechnologyMarquee` moves featured technologies from right to left in a seamless CSS loop. A duplicate visual group is hidden from assistive technology. The pause button, hover, and keyboard focus stop the loop; it also pauses offscreen and when the tab is hidden. Reduced-motion preferences show a static, wrapping list. Skills below use one horizontal category row each, with no hidden tabs or proficiency meters.

The large NetflixGPT and Food Delivery PNG screenshots have optimized JPEG previews; their originals are preserved in `public/assects`. Update each project's `image` path when replacing a preview.

`CursorTrail` adds a soft follower ring and two small trailing dots for mouse users, with hover/click feedback and a light that follows the pointer over the ID card. It writes transforms directly, never updates React state during movement, and stops requesting animation frames when settled. Tracking is disabled on touch/coarse pointers and for reduced-motion preferences; it also clears over form fields, on Tab navigation, window blur, scrolling, and hidden tabs. Listeners and frames are cleaned up on unmount. The native pointer remains available, and decorative layers cannot intercept clicks. No pointer data leaves the page.

Intro animations settle within three seconds and respect reduced motion. There is no additional animation dependency. The resume keeps its simple Arial document styling.

`AnimatedText` adds staggered word entrances to the hero, section headings, experience heading, and contact heading. The hero's accent line gets one gentle gradient sweep using the existing theme colors. Heading entrances run once on entering the viewport and share a single observer that disconnects when idle. Plain text, word spacing, and heading semantics are preserved; body copy and the resume stay still. Reduced motion (including a change while viewing), printing, forced colors, and browsers without observer support have readable fallbacks. Motion styles are isolated in `AnimatedText.css`; existing stylesheets, layout, and typography are unchanged.

## Content sources and design references

Your supplied Endava dates take priority over older public profiles. Education and earlier internships were checked against your [GitHub profile](https://github.com/GaneshDerkar18); the AWS Academy credentials appear in your [public LinkedIn profile](https://www.linkedin.com/in/ganesh-derkar). NetflixGPT uses the more specific [project repository](https://github.com/GaneshDerkar18/NetflixGpt) description, which names Gemini. The [Auto Pause Video repository](https://github.com/GaneshDerkar18/Auto-pause-video-extension) supplies the added browser-extension project. No client names, performance metrics, expired certifications, or certificates from other people's liked posts were added.

[Brittany Chiang](https://brittanychiang.com/) and [Lee Robinson](https://leerob.com/) were references for content hierarchy and making work and experience easy to scan. This implementation uses original components and styling, rather than copying either site's code or text.

Motion uses the selected **Animate.css 4.1.1** fade animation (MIT license in the installed distribution), local CSS transitions, a shared reveal observer, a marquee visibility observer, and small pointer animation hooks. Motion is disabled for reduced-motion preferences and printing. Third-party license notices are copied to `public/third-party-notices.txt` during start/build.

Reusable link components reject executable URLs, protocol-relative links, credentials in web URLs, and control characters. External tabs use `noopener noreferrer`. JSON text is rendered as React text, never injected as HTML. API keys still belong on a backend, not in this public content file.

## PDF verification (optional development tooling)

`node scripts/verify-resume.cjs` generates the current PDF and a long pagination fixture under ignored `tmp/pdfs/`. On a machine with PyMuPDF installed, `python scripts/inspect-resume.py` verifies extracted text and page bounds and renders preview PNGs. These tools are not part of the deployed app.
