# 🔧 Fix Build Error - npm ci Failed

## Problem
Build is failing because `package-lock.json` is out of sync with `package.json` after adding `react-google-recaptcha`.

## Solution: Regenerate package-lock.json

### Step 1: Install Dependencies Locally

Run this in your terminal:

```bash
cd "/Users/bharath/Desktop/Bharath Job Hunt/Projects/premass-overseas-app/frontend"
npm install
```

This will:
- Install `react-google-recaptcha` 
- Update `package-lock.json` to include it
- Sync all dependencies

### Step 2: Commit the Updated package-lock.json

```bash
cd "/Users/bharath/Desktop/Bharath Job Hunt/Projects/premass-overseas-app"
git add frontend/package-lock.json
git commit -m "fix: regenerate package-lock.json with react-google-recaptcha"
git push origin main
```

### Step 3: Vercel Will Auto-Redeploy

Vercel will detect the push and rebuild. The build should now succeed!

---

## Alternative: If npm install Fails

If `npm install` has issues, try:

```bash
cd frontend
rm package-lock.json
npm install
```

Then commit and push the new `package-lock.json`.

---

## Why This Happened

When we added `react-google-recaptcha` to `package.json`, we didn't regenerate `package-lock.json`. Vercel uses `npm ci` which requires an exact match between `package.json` and `package-lock.json`.

---

## Quick Fix Command

```bash
cd "/Users/bharath/Desktop/Bharath Job Hunt/Projects/premass-overseas-app/frontend" && npm install && cd .. && git add frontend/package-lock.json && git commit -m "fix: regenerate package-lock.json" && git push origin main
```

This will:
1. Install dependencies (regenerates package-lock.json)
2. Stage the updated lock file
3. Commit it
4. Push to trigger Vercel rebuild

---

## After Fix

Once you push, Vercel will:
1. Detect the new commit
2. Run `npm ci` (will now succeed)
3. Build successfully
4. Deploy your app with reCAPTCHA!

🎉 **That's it!**
