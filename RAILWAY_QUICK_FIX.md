# 🚨 Quick Fix for Railway 500 Error

## The Problem
Your backend on Railway is returning 500 errors because it's trying to run TypeScript code that needs to be compiled, but Railway should use the JavaScript version instead.

## ✅ Immediate Fix (3 Steps)

### Step 1: Update package.json (Already Done)
The `package.json` has been updated to use `src/server.js` directly instead of compiled TypeScript.

### Step 2: Push to GitHub
```bash
cd backend
git add package.json
git commit -m "fix: use JavaScript server for Railway deployment"
git push origin main
```

### Step 3: Verify Railway Environment Variables

Go to Railway dashboard and make sure these are set:

**CRITICAL - Must Have:**
- `MONGO_URI` - Your MongoDB connection string
- `JWT_SECRET` - At least 32 characters (generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

**Optional:**
- `EMAIL_USER` - Gmail address
- `EMAIL_PASS` - Gmail app password
- `NODE_ENV=production`

## 🔍 Check Railway Logs

1. Go to: https://railway.app
2. Select your backend service
3. Click "Logs" tab
4. Look for errors when you try to register

Common errors you might see:
- `MongoDB Error: ...` → Check MONGO_URI
- `JWT_SECRET is not defined` → Add JWT_SECRET
- `Cannot find module` → Code not deployed properly

## 🧪 Test After Fix

Once Railway redeploys, test the registration:

```bash
curl -X POST https://premass-overseas-app-production.up.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "role": "student"
  }'
```

Should return `201` with success message, not `500`.

## 📝 What Changed

- `package.json` now uses `node src/server.js` for start command
- This uses the JavaScript version which has all routes configured
- No TypeScript compilation needed for Railway
