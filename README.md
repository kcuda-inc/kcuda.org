# KCUDA Website

This repository contains the website for Kings County Ultimate Disc Association (KCUDA), an organization dedicated to promoting and developing Ultimate Frisbee in Brooklyn and throughout New York City.

## Site Structure

The site is a static HTML + Tailwind CSS (via CDN) site with Cloudflare Pages Functions for server-side auth and a couple of small dynamic endpoints:

```
kcuda.org/
├── index.html                    # Home page
├── support.html                  # Brooklyn Tech Support team page
├── coaches.html                  # Coaches page (public)
├── coaches-members.html          # Coaches page (members)
├── learn-to-play.html            # Learn to Play program page
├── board.html                    # Board / leadership page
├── discover-ultimate-day.html    # DISCover Ultimate Day event page
├── tournaments.html              # Tournaments hub
├── tournaments/                  # Individual tournament pages
│   ├── battle-of-the-hudson.html
│   ├── disco-tech-hat.html
│   ├── hucksgiving.html
│   └── mid-winter-hat.html
├── tournaments.ics               # Tournament calendar feed
├── calendar.ics / calendar-delta.ics  # Public calendar feeds
├── members.html                  # Members-only area (protected)
├── members-login.html            # Members login form
├── members-calendar.html         # Members-only calendar view
├── admin.html                    # Admin dashboard (protected)
├── admin-login.html              # Admin login form
├── functions/                    # Cloudflare Pages Functions
│   ├── _middleware.js             # Shared request middleware
│   ├── auth.js                    # Members password auth endpoint
│   ├── admin-auth.js               # Admin password auth endpoint
│   ├── admin-save.js               # Admin content save endpoint
│   ├── auth-utils.js               # Shared auth helpers
│   └── tournament-hub.js           # Tournament data KV endpoint
├── data/                         # JSON data used by pages/scripts
│   ├── calendar-events.json
│   ├── member-updates.json
│   └── tournament-hub.json
├── scripts/                      # Node scripts for calendar management
│   ├── calendar-sync.js
│   ├── calendar-export.js
│   ├── calendar-list.js
│   ├── add-january-events.js
│   ├── add-tournament-events.js
│   └── add-winter-events.js
├── images/                       # Image assets
├── wrangler.toml                 # Cloudflare Pages configuration
├── _redirects                    # Redirect rules
├── SECURITY.md                   # Members/admin auth setup
└── README.md                     # This file
```

## Making Updates

### Text Content

Each page is a standalone HTML file — edit the relevant `.html` file directly. Shared sections across pages (nav, footer) currently need to be updated per-file since there's no shared templating.

### Images

To update images, replace the files in the `images/` directory while keeping the same filenames, or update the image paths in the relevant HTML file.

### Styling

The site uses Tailwind CSS via CDN. Most styling is done with Tailwind utility classes directly in the HTML. Custom styles are defined in the `<style>` section in each file's head.

### Calendar Data

Calendar events live in `data/calendar-events.json` and are managed via the Node scripts in `scripts/`:

```bash
npm run calendar:sync    # scripts/calendar-sync.js
npm run calendar:export  # scripts/calendar-export.js
npm run calendar:list    # scripts/calendar-list.js
```

## Deployment

This site deploys to Cloudflare Pages automatically via GitHub Actions:

- **Live URL**: https://kcuda.org (https://kcuda.pages.dev)
- **Workflow**: `.github/workflows/deploy.yml` runs on every push to `main` and deploys with `wrangler pages deploy`
- **Secrets required**: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` (configured as GitHub repo secrets)
- **Configuration**: `wrangler.toml` contains the Cloudflare Pages project name and KV binding

### Manual Deployment

If needed, you can manually deploy using:

```bash
npx wrangler pages deploy . --project-name=kcuda
```

## Local Development

To work on the site locally:

1. Clone this repository
2. Open any `.html` file directly in your browser to preview static changes
3. For pages that rely on Cloudflare Pages Functions (members/admin auth, tournament hub), run `npx wrangler pages dev .` instead so the functions are served
4. Commit and push to `main` — GitHub Actions handles deployment automatically

## Protected Areas

- **Members area** (`members.html`, `members-calendar.html`): server-side password auth via Cloudflare Pages Functions. See `SECURITY.md` for setup.
- **Admin area** (`admin.html`): separate server-side password auth for site content administration, backed by `functions/admin-auth.js` and `functions/admin-save.js`.

## Contact

For questions about KCUDA or this website, contact:
- Email: webmaster AT kcuda.org
- Instagram: [@tech_ult](https://www.instagram.com/tech_ult/)
