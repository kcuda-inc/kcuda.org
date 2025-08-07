# Security Setup for KCUDA Members Area

## Overview
The members area uses server-side authentication via Cloudflare Pages Functions with secure session cookies. **No passwords or secrets are stored in the repository.**

## Setup Instructions

### 1. Set Environment Variable in Cloudflare Pages

1. Go to Cloudflare Pages Dashboard
2. Select your site (kcuda.org)
3. Go to Settings > Environment Variables
4. Add a new variable:
   - **Name**: `MEMBERS_PASSWORD_HASH`
   - **Value**: SHA-256 hash of your chosen password
   - **Environment**: Production (and Preview if needed)

### 2. Generate Password Hash

Use this command to generate the SHA-256 hash:

```bash
echo -n 'your_secure_password_here' | shasum -a 256
```

**Important**: Replace `your_secure_password_here` with your actual password.

### 3. How It Works

1. User visits `/members.html`
2. Cloudflare Pages Function checks for valid session cookie
3. If no cookie, user is redirected to `/members-login.html`
4. Login form submits to `/auth` endpoint
5. Server validates password against environment variable hash
6. On success, sets secure HttpOnly cookie and redirects to members page
7. Cookie expires after 24 hours

## Security Features

- ✅ **Server-side password validation**
- ✅ **Secure HttpOnly cookies**
- ✅ **Password hash never in source code**
- ✅ **Environment variable configuration**
- ✅ **Automatic session expiration**
- ✅ **Protection against client-side tampering**

## Testing Locally

Cloudflare Pages Functions require deployment to test. For local testing, you can use Wrangler:

```bash
npx wrangler pages dev .
```

Set the environment variable:
```bash
export MEMBERS_PASSWORD_HASH="your_hash_here"
```