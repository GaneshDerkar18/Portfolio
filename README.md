# Ganesh Derkar — React portfolio

A responsive full-stack developer portfolio with dark and light themes, project search and filters, individual project pages, experience, skills, certificates, and a Formspree contact form.

## Update everything in one file

Edit **`src/data/portfolio.json`**. This is the content source for all pages.

| Section | What to update |
| --- | --- |
| `profile` | Name, role, employer, introduction, biography, location, résumé, social links, and focus areas |
| `projects` | Project cards, detail pages, featured work, technology tags, and links |
| `skillGroups` / `featuredStack` | Skills section and homepage technology strip |
| `experience` / `education` | Work history and education |
| `principles` / `achievements` | About-page content and certificates |
| `site` | Site description, contact copy, Formspree form ID, footer text |
| `certificatesUrl` | Link to the full certificate collection |

The current experience entry uses `profile.company` and `profile.role`, so the company and role agree across the homepage, About, and experience section. Freeform introductions and biographies are editable prose in the same file.

### Add a project

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
- `featured: true` includes the project on the homepage.
- Project categories, filters, counts, related work, and `/projects/my-new-project` are generated automatically. No route or component edits needed.
- Leave `githubUrl` and `demoUrl` empty when unavailable. The corresponding buttons stay hidden.
- Accent options: `blue`, `purple`, `green`, `red`, `orange`.
- Useful icons: `code`, `server`, `layers`, `sparkles`, `film`, `utensils`, `check`, `scan`.
- The three additional project ideas are explicitly marked **Concept**. Replace their proposed scope with your actual implementation details and links when ready.
- Update the Endava `period` from `Present` to your real start date when available. No employment dates or project metrics have been invented.

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

- `/`: introduction, featured projects, skills, experience, contact
- `/about`: biography, approach, experience, certificates
- `/projects`: complete project collection with shareable search/filter URLs
- `/projects/:id`: generated project detail page
- `/contact`: contact page
- `/moreabout`: preserved certificate-page URL

Deploy the generated `build/` directory to a static host **with an SPA fallback to `index.html`** so direct visits and refreshes of nested routes work. For a subdirectory deployment, set Create React App’s `PUBLIC_URL` to that base path before building. Navigation and public assets honor this prefix.

The old checked-in `build/` output is not the source of truth. Run a fresh production build before deployment. Local verification can use `BUILD_PATH=.verification-build` to avoid changing that old output.

## Contact and API integrations

The existing Formspree ID is preserved in `site.formspreeId`. Change it to your own connected form ID when needed. An empty ID displays a direct email contact option. The form supports validation, sending, success, retry, and network-error states.

OpenAI and Gemini are presented as portfolio skills and project technologies. This static portfolio does not call either AI provider. **Never put an API key in the content file, React source, or a `REACT_APP_*` variable**: client-side values are public. Any actual AI feature should call your backend, where provider credentials remain server-side.

## Verification

The interaction tests cover shared content, adding a project once, category and technology filtering, empty results, project navigation, concept labeling, missing links, About routing, 404 recovery, theme persistence, mobile menu behavior, and contact success/failure states. Formspree is mocked in tests so no real messages are sent.
