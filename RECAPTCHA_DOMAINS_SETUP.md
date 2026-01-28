# 🔐 reCAPTCHA Domain Setup for Vercel

## Problem
You're getting an error because reCAPTCHA domains **must not include** `https://` or any protocol.

## Solution: Add Domains Correctly

### Step 1: Remove `https://` from Domain

**❌ Wrong:**
```
https://premass-overseas-nr2mhv5t8-premassoverseas-7587s-projects.vercel.app
```

**✅ Correct:**
```
premass-overseas-nr2mhv5t8-premassoverseas-7587s-projects.vercel.app
```

---

## Step 2: Add All Your Domains

In the reCAPTCHA admin form, add these domains **one by one** (without `https://`):

### For Development:
```
localhost
```

### For Vercel Preview Deployments:
```
*.vercel.app
```

**Note:** The wildcard `*.vercel.app` covers ALL Vercel preview URLs automatically, so you don't need to add each one individually!

### For Your Custom Domain (when ready):
```
premassoverseas.com
www.premassoverseas.com
```

---

## Complete Domain List

Add these domains in reCAPTCHA admin:

1. `localhost` (for local development)
2. `*.vercel.app` (covers all Vercel preview URLs)
3. `premassoverseas.com` (your custom domain - add when ready)
4. `www.premassoverseas.com` (www version - add when ready)

**Total: 4 domains** (or just 2 if you skip localhost and custom domain for now)

---

## Quick Steps

1. **In reCAPTCHA admin**, remove the `https://` from the domain you tried to add
2. **Add `*.vercel.app`** - This covers ALL Vercel preview URLs automatically
3. **Add `localhost`** - For local testing
4. **Click "Submit"**

---

## Why Use Wildcard?

Instead of adding each Vercel URL individually:
- `premass-overseas-nr2mhv5t8-premassoverseas-7587s-projects.vercel.app`
- `premass-overseas-abc123-premassoverseas-7587s-projects.vercel.app`
- etc.

Use **`*.vercel.app`** to cover **all** Vercel preview URLs automatically!

---

## When You Add Custom Domain Later

When you're ready to use `premassoverseas.com`:

1. **Go to reCAPTCHA admin** → Your site → **Settings**
2. **Add domains:**
   - `premassoverseas.com`
   - `www.premassoverseas.com`
3. **Save**

That's it! No need to regenerate keys.

---

## Current Setup

Based on your Vercel dashboard, you have:
- ✅ `www.premassoverseas.com` - Already configured in Vercel
- ✅ Vercel preview URLs - Covered by `*.vercel.app` wildcard

**Just add `*.vercel.app` to reCAPTCHA and you're done!** 🎉
