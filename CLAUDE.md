# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KCUDA (Kings County Ultimate Disc Association) is a static website for an Ultimate Frisbee organization in Brooklyn, NYC. The site is built with vanilla HTML, Tailwind CSS, and uses Cloudflare Pages for hosting with server-side authentication via Cloudflare Pages Functions.

## Architecture

### Core Components
- **Static Site**: Primary site built with HTML + Tailwind CSS via CDN
- **Authentication System**: Server-side password protection using Cloudflare Pages Functions
- **Deployment**: Automated via Cloudflare Pages with Git hooks

### File Structure
```
kcuda.org/
├── index.html              # Main public website
├── members.html             # Protected members area
├── members-login.html       # Login form for members area
├── functions/
│   ├── auth.js             # Password authentication endpoint
│   └── members.js          # Access control for members area
├── images/                 # Static image assets
├── wrangler.toml           # Cloudflare Pages configuration
├── _redirects              # URL redirect rules
└── SECURITY.md             # Authentication setup guide
```

## Development Commands

### Local Development
```bash
# Preview site locally (opens index.html in browser)
open index.html

# Test Cloudflare Functions locally (requires environment setup)
npx wrangler pages dev .
```

### Deployment
```bash
# Manual deployment to Cloudflare Pages
npx wrangler pages deploy . --project-name=kcuda

# Automatic deployment triggers on:
# - Every commit to main branch (via Git hooks)
# - Git push events
```

### Environment Setup for Local Testing
```bash
# Set required environment variable for authentication
export MEMBERS_PASSWORD_HASH="your_hash_here"

# Generate password hash for members area
echo -n 'your_password' | shasum -a 256
```

## Authentication Architecture

The members area uses a secure server-side authentication flow:

1. **Access Control**: `/functions/members.js` checks for valid session cookie
2. **Login Flow**: `/functions/auth.js` handles password verification
3. **Security**: Passwords are SHA-256 hashed, stored as environment variables
4. **Session Management**: HttpOnly cookies with 24-hour expiration

## Styling Approach

- **Framework**: Tailwind CSS v2.2.19 via CDN
- **Custom Styles**: Defined in `<style>` blocks within HTML files
- **Responsive Design**: Mobile-first with Tailwind responsive utilities
- **Font**: Inter font family with system font fallbacks

## Content Areas

### Main Site (`index.html`)
- Navigation with smooth scroll links
- Hero section with background image
- About section with mission statement
- Teams section (Brooklyn Tech Support, Brooklyn Disco Tech)
- Contact information and social links

### Members Area (`members.html`)
- Protected content requiring authentication
- Member-specific navigation with logout functionality
- Access controlled by Cloudflare Pages Functions

## Deployment Details

- **Live URL**: https://kcuda.pages.dev
- **Platform**: Cloudflare Pages
- **Build**: Static files served directly (no build process)
- **Git Hooks**: Automatic deployment on commit/push
- **Environment Variables**: Set in Cloudflare Pages dashboard for authentication

## Security Considerations

- No secrets stored in repository
- Environment variables managed in Cloudflare Pages dashboard
- Server-side password validation prevents client-side bypassing
- Secure cookie configuration with HttpOnly, Secure, and SameSite flags